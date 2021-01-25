///// <reference path="Microsoft.JSInterop.d.ts"/>
import idb from '../node_modules/idb/lib/idb';
import { DB, UpgradeDB, ObjectStore, Transaction } from '../node_modules/idb/lib/idb';
import { IDbStore, IIndexSearch, IIndexSpec, IStoreSchema, IDotNetInstanceWrapper, IDbInformation } from './InteropInterfaces';

export class IndexedDbManager {

    private dbInstance: any = undefined;

    constructor() { }

    public openDb = async (data: IDbStore, instanceWrapper: IDotNetInstanceWrapper): Promise<string> => {
        const dbStore = data;

        try {
            if (!this.dbInstance || this.dbInstance.version < dbStore.version) {
                if (this.dbInstance) {
                    this.dbInstance.close();
                }
                this.dbInstance = await idb.open(dbStore.dbName, dbStore.version, upgradeDB => {
                    this.upgradeDatabase(upgradeDB, dbStore);
                });
            }
        } catch (e) {
            this.dbInstance = await idb.open(dbStore.dbName);
        }

        return `IndexedDB ${data.dbName} opened`;
    }

    public getDbInfo = async (dbName: string) : Promise<IDbInformation> => {
        if (!this.dbInstance) {
            this.dbInstance = await idb.open(dbName);
        }

        const currentDb = <DB>this.dbInstance;

        let getStoreNames = (list: DOMStringList): string[] => {
            let names: string[] = [];
            for (var i = 0; i < list.length; i++) {
                names.push(list[i]);
            }
            return names;
        }
        const dbInfo: IDbInformation = {
            version: currentDb.version,
            storeNames: getStoreNames(currentDb.objectStoreNames)
        };

        return dbInfo;
    }

    public deleteDb = async(dbName: string): Promise<string> => {
        this.dbInstance.close();

        await idb.delete(dbName);

        this.dbInstance = undefined;

        return `The database ${dbName} has been deleted`;
    }

    public addRecord = async (storename: string, data: any, key?: any): Promise<string> => {
        const tx = this.getTransaction(this.dbInstance, storename, 'readwrite');
        const objectStore = tx.objectStore(storename);

        data = this.checkForKeyPath(objectStore, data);

        const result = await objectStore.add(data, key);

        await tx.complete;

        return `Added new record with id ${result}`;
    }

    public addRecords = async (storename: string, data: any[]): Promise<string> => {
        const tx = this.getTransaction(this.dbInstance, storename, 'readwrite');
        const objectStore = tx.objectStore(storename);

        data.forEach(async element => {
            let item = this.checkForKeyPath(objectStore, element);
            await objectStore.add(item);
        });

        await tx.complete;

        return `Added ${data.length} records`;
    }

    public updateRecord = async (storename: string, data: any, key?: any): Promise<string> => {
        const tx = this.getTransaction(this.dbInstance, storename, 'readwrite');

        const result = await tx.objectStore(storename).put(data, key);

        await tx.complete;

        return `updated record with id ${result}`;
    }

    public updateRecords = async (storename: string, data: any[]): Promise<string> => {
        const tx = this.getTransaction(this.dbInstance, storename, 'readwrite');

        data.forEach(async element => {
            await tx.objectStore(storename).put(element);
        });

        await tx.complete;

        return `updated ${data.length} records`;
    }

    public getRecords = async (storeName: string): Promise<any> => {
        const tx = this.getTransaction(this.dbInstance, storeName, 'readonly');

        let results = await tx.objectStore(storeName).getAll();

        await tx.complete;

        return results;
    }

    public clearStore = async (storeName: string): Promise<string> => {
        const tx = this.getTransaction(this.dbInstance, storeName, 'readwrite');

        await tx.objectStore(storeName).clear();

        await tx.complete;

        return `Store ${storeName} cleared`;
    }

    public getRecordByIndex = async (searchData: IIndexSearch): Promise<any> => {
        const tx = this.getTransaction(this.dbInstance, searchData.storename, 'readonly');

        const results = await tx.objectStore(searchData.storename)
            .index(searchData.indexName)
            .get(searchData.queryValue);

        await tx.complete;

        return results;
    }

    public getAllRecordsByIndex = async (searchData: IIndexSearch): Promise<any> => {
        const tx = this.getTransaction(this.dbInstance, searchData.storename, 'readonly');

        let results: any[] = [];

        tx.objectStore(searchData.storename)
            .index(searchData.indexName)
            .iterateCursor(cursor => {
                if (!cursor) {
                    return;
                }

                if (cursor.key === searchData.queryValue) {
                    results.push(cursor.value);
                }

                cursor.continue();
            });

        await tx.complete;

        return results;
    }

    public getRecordById = async (storename: string, id: any): Promise<any> => {

        const tx = this.getTransaction(this.dbInstance, storename, 'readonly');

        let result = await tx.objectStore(storename).get(id);

        await tx.complete;

        return result;
    }

    public deleteRecord = async (storename: string, id: any): Promise<string> => {
        const tx = this.getTransaction(this.dbInstance, storename, 'readwrite');

        await tx.objectStore(storename).delete(id);

        await tx.complete;

        return `Record with id: ${id} deleted`;
    }

    public deleteRecords = async (storename: string, ids: any[]): Promise<string> => {
        const tx = this.getTransaction(this.dbInstance, storename, 'readwrite');

        ids.forEach(async element => {
            await tx.objectStore(storename).delete(element);
        });

        await tx.complete;

        return `Deleted ${ids.length} records`;
    }

    private getTransaction(dbInstance: DB, stName: string, mode?: 'readonly' | 'readwrite') {
        const tx = dbInstance.transaction(stName, mode);
        tx.complete.catch(
            err => {
                if (err) {
                    console.error((err as Error).message);
                } else {
                    console.error('Undefined error in getTransaction()');
                }

            });

        return tx;
    }

    // Currently don't support aggregate keys
    private checkForKeyPath(objectStore: ObjectStore<any, any>, data: any) {
        if (!objectStore.autoIncrement || !objectStore.keyPath) {
            return data;
        }

        if (typeof objectStore.keyPath !== 'string') {
            return data;
        }

        const keyPath = objectStore.keyPath as string;

        if (!data[keyPath]) {
            delete data[keyPath];
        }
        return data;
    }

    private upgradeDatabase(upgradeDB: UpgradeDB, dbStore: IDbStore) {
        if (upgradeDB.oldVersion < dbStore.version) {
            if (dbStore.stores) {
                for (var store of dbStore.stores) {
                    if (!upgradeDB.objectStoreNames.contains(store.name)) {
                        this.addNewStore(upgradeDB, store);
                    }
                }
            }
        }
    }

    private addNewStore(upgradeDB: UpgradeDB, store: IStoreSchema) {
        let primaryKey = store.primaryKey;

        if (!primaryKey) {
            primaryKey = { name: 'id', keyPath: 'id', auto: true };
        }

        const newStore = upgradeDB.createObjectStore(store.name, { keyPath: primaryKey.keyPath, autoIncrement: primaryKey.auto });

        for (var index of store.indexes) {
            newStore.createIndex(index.name, index.keyPath, { unique: index.unique });
        }
    }
}