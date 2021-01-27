///// <reference path="Microsoft.JSInterop.d.ts"/>
import idb from '../node_modules/idb/lib/idb';
import { DB, UpgradeDB, ObjectStore, Transaction } from '../node_modules/idb/lib/idb';
import { IDatabase, IIndexSearch, IIndex, IObjectStore, IInformation } from './InteropInterfaces';

export class IndexedDbManager {

    private dbInstance: any = undefined;

    constructor() { }

    private checkOpened() {
        if (!this.dbInstance) {
            throw 'Database is closed';
        }
    }

    public openDb = async (database: IDatabase): Promise<string> => {
        var upgradeError = "";

        try {
            if (!this.dbInstance || this.dbInstance.version < database.version) {
                if (this.dbInstance) {
                    this.dbInstance.close();
                    this.dbInstance = undefined;
                }
                this.dbInstance = await idb.open(database.name, database.version, upgradeDB => {
                    try {
                        this.upgradeDatabase(upgradeDB, database);
                    } catch (error) {
                        upgradeError = error.toString();
                        throw(error);
                    }
                });
            }

            return `IndexedDB ${database.name} opened`;
        } catch (error) {
            throw error.toString()+' '+upgradeError;
        }
    }

    public deleteDb = async(dbName: string): Promise<string> => {
        try {
            this.checkOpened();

            this.dbInstance.close();

            await idb.delete(dbName);

            this.dbInstance = undefined;

            return `The database ${dbName} has been deleted`;
        } catch (error) {
            throw `Database ${dbName}, ${error.toString()}`;
        }
    }

    public getDbInfo = async (dbName: string) : Promise<IInformation> => {
        try {
            this.checkOpened();

            const currentDb = <DB>this.dbInstance;

            let getStoreNames = (list: DOMStringList): string[] => {
                let names: string[] = [];
                for (var i = 0; i < list.length; i++) {
                    names.push(list[i]);
                }
                return names;
            }
            const dbInfo: IInformation = {
                version: currentDb.version,
                objectStoreNames: getStoreNames(currentDb.objectStoreNames)
            };

            return dbInfo;
        } catch (error) {
            throw `Database ${dbName}, ${error.toString()}`;
        }
    }

    public get = async (storeName: string, key: any): Promise<any> => {
        try {
            const tx = this.dbInstance.transaction(storeName, 'readonly');

            let result = await tx.objectStore(storeName).get(key);

            await tx.complete;

            return result;
        } catch (error) {
            throw `Store ${storeName}, ${error.toString()}`;
        }
    }

    public getAll = async (storeName: string, key?: any, count?: number): Promise<any> => {
        try {
            const tx = this.dbInstance.transaction(storeName, 'readonly');

            let results = await tx.objectStore(storeName).getAll(key ?? undefined, count ?? undefined);

            await tx.complete;

            return results;
        } catch (error) {
            throw `Store ${storeName}, ${error.toString()}`;
        }
    }

    public getAllByKeyRange = async (storeName: string, lower: any, upper: any, lowerOpen: boolean, upperOpen: boolean, count?: number): Promise<any> => {
        try {
            return await this.getAll(storeName, IDBKeyRange.bound(lower, upper, lowerOpen, upperOpen), count);
        } catch (error) {
            throw `Store ${storeName}, ${error.toString()}`;
        }
    }

    public getAllByArrayKey = async (storeName: string, key: any[]): Promise<any> => {
        try {
            const tx = this.dbInstance.transaction(storeName, 'readonly');
            const sx = tx.objectStore(storeName);

            let results: any[] = [];

            for (let index = 0; index < key.length; index++) {
                const element = key[index];
                results.push(await sx.get(element));
            }

            await tx.complete;

            return results;
        } catch (error) {
            throw `Store ${storeName}, ${error.toString()}`;
        }
    }

    public count = async (storeName: string, key?: any): Promise<number> => {
        try {
            const tx = this.dbInstance.transaction(storeName, 'readonly');

            let result = await tx.objectStore(storeName).count(key ?? undefined);

            await tx.complete;

            return result;
        } catch (error) {
            throw `Store ${storeName}, ${error.toString()}`;
        }
    }

    public countByKeyRange = async (storeName: string, lower: any, upper: any, lowerOpen: boolean, upperOpen: boolean): Promise<number> => {
        try {
            return await this.count(storeName, IDBKeyRange.bound(lower, upper, lowerOpen, upperOpen));
        } catch (error) {
            throw `Store ${storeName}, ${error.toString()}`;
        }
    }

    public query = async (storeName: string, filter: string, count: number = 0, skip: number = 0): Promise<any> => {
        try {
            const tx = this.dbInstance.transaction(storeName, 'readonly');

            try {
                var func = new Function('obj', filter);
            } catch (error) {
                throw `${error.toString()} in filter { ${filter} }`
            }

            var row = 0;
            var errorMessage = "";

            let results: any[] = [];

            tx.objectStore(storeName)
                .iterateCursor(cursor => {
                    if (!cursor) {
                        return;
                    }
                    try {
                        if (func(cursor.value)) {
                            row ++;
                            if (row > skip) {
                                results.push(cursor.value);
                            }
                        }
                    }
                    catch (error) {
                        errorMessage = `obj: ${JSON.stringify(cursor.value)}\nfilter: ${filter}\nerror: ${error.toString()}`;
                        return;
                    }
                    if (count > 0 && results.length >= count) {
                        return;
                    }
                    cursor.continue();
                });

            await tx.complete;

            if (errorMessage) {
                throw errorMessage;
            }

            return results;
        } catch (error) {
            throw `Store ${storeName} ${error.toString()}`;
        }
    }

    public getFromIndex = async (storeName: string, indexName: string, key: any): Promise<any> => {
        try {
            const tx = this.dbInstance.transaction(storeName, 'readonly');

            const results = await tx.objectStore(storeName).index(indexName).get(key);

            await tx.complete;

            return results;
        } catch (error) {
            throw `Store ${storeName}, Index ${indexName}, ${error.toString()}`;
        }
    }

    public getAllFromIndex = async (storeName: string, indexName: string, key?: any, count?: number): Promise<any> => {
        try {
            const tx = this.dbInstance.transaction(storeName, 'readonly');

            const results = await tx.objectStore(storeName).index(indexName).getAll(key ?? undefined, count ?? undefined);

            await tx.complete;

            return results;
        } catch (error) {
            throw `Store ${storeName}, Index ${indexName}, ${error.toString()}`;
        }
    }

    public getAllFromIndexByKeyRange = async (storeName: string, indexName: string, lower: any, upper: any, lowerOpen: boolean, upperOpen: boolean, count?: number): Promise<any> => {
        try {
            return await this.getAllFromIndex(storeName, indexName, IDBKeyRange.bound(lower, upper, lowerOpen, upperOpen), count);
        } catch (error) {
            throw `Store ${storeName}, Index ${indexName}, ${error.toString()}`;
        }
    }

    public getAllFromIndexArrayKey = async (storeName: string, indexName: string, key: any[]): Promise<any> => {
        try {
            const tx = this.dbInstance.transaction(storeName, 'readonly');
            const dx = tx.objectStore(storeName).index(indexName);

            let results: any[] = [];

            for (let index = 0; index < key.length; index++) {
                const element = key[index];
                results.push(await dx.get(element));
            }

            await tx.complete;

            return results;
        } catch (error) {
            throw `Store ${storeName}, Index ${indexName}, ${error.toString()}`;
        }
    }

    public countFromIndex = async (storeName: string, indexName: string, key?: any): Promise<number> => {
        try {
            const tx = this.dbInstance.transaction(storeName, 'readonly');

            let result = await tx.objectStore(storeName).index(indexName).count(key ?? undefined);

            await tx.complete;

            return result;
        } catch (error) {
            throw `Store ${storeName}, Index ${indexName}, ${error.toString()}`;
        }
    }

    public countFromIndexByKeyRange = async (storeName: string, indexName: string, lower: any, upper: any, lowerOpen: boolean, upperOpen: boolean): Promise<number> => {
        try {
            return await this.countFromIndex(storeName, indexName, IDBKeyRange.bound(lower, upper, lowerOpen, upperOpen));
        } catch (error) {
            throw `Store ${storeName}, Index ${indexName}, ${error.toString()}`;
        }
    }

    public queryFromIndex = async (storeName: string, indexName: string, filter: string, count: number = 0, skip: number = 0): Promise<any> => {
        try {
            const tx = this.dbInstance.transaction(storeName, 'readonly');

            try {
                var func = new Function('obj', filter);
            } catch (error) {
                throw `${error.toString()} in filter { ${filter} }`
            }

            var row = 0;
            var errorMessage = "";

            let results: any[] = [];

            tx.objectStore(storeName)
                .index(indexName)
                .iterateCursor(cursor => {
                    if (!cursor) {
                        return;
                    }
                    try {
                        if (func(cursor.value)) {
                            row ++;
                            if (row > skip) {
                                results.push(cursor.value);
                            }
                        }
                    }
                    catch (error) {
                        errorMessage = `obj: ${JSON.stringify(cursor.value)}\nfilter: ${filter}\nerror: ${error.toString()}`;
                        return;
                    }
                    if (count > 0 && results.length >= count) {
                        return;
                    }
                    cursor.continue();
                });

            await tx.complete;

            if (errorMessage) {
                throw errorMessage;
            }

            return results;
        } catch (error) {
            throw `Store ${storeName}, Index ${indexName}, ${error.toString()}`;
        }
    }

    public add = async (storeName: string, data: any, key?: any): Promise<string> => {
        try {
            const tx = this.dbInstance.transaction(storeName, 'readwrite');
            const objectStore = tx.objectStore(storeName);

            data = this.checkForKeyPath(objectStore, data);

            const result = await objectStore.add(data, key ?? undefined);

            await tx.complete;

            return `Added new record with id ${result}`;
        } catch (error) {
            throw `Store ${storeName}, ${error.toString()}`;
        }
    }

    public put = async (storeName: string, data: any, key?: any): Promise<string> => {
        try {
            const tx = this.dbInstance.transaction(storeName, 'readwrite');

            const result = await tx.objectStore(storeName).put(data, key ?? undefined);

            await tx.complete;

            return `updated record with id ${result}`;
        } catch (error) {
            throw `Store ${storeName}, ${error.toString()}`;
        }
    }

    public delete = async (storeName: string, id: any): Promise<string> => {
        try {
            const tx = this.dbInstance.transaction(storeName, 'readwrite');

            await tx.objectStore(storeName).delete(id);

            await tx.complete;

            return `Record with id: ${id} deleted`;
        } catch (error) {
            throw `Store ${storeName}, ${error.toString()}`;
        }
    }

    public batchAdd = async (storeName: string, data: any[]): Promise<string> => {
        try {
            const tx = this.dbInstance.transaction(storeName, 'readwrite');
            const objectStore = tx.objectStore(storeName);

            data.forEach(async element => {
                let item = this.checkForKeyPath(objectStore, element);
                await objectStore.add(item);
            });

            await tx.complete;

            return `Added ${data.length} records`;
        } catch (error) {
            throw `Store ${storeName}, ${error.toString()}`;
        }
    }

    public batchPut = async (storeName: string, data: any[]): Promise<string> => {
        try {
            const tx = this.dbInstance.transaction(storeName, 'readwrite');

            data.forEach(async element => {
                await tx.objectStore(storeName).put(element);
            });

            await tx.complete;

            return `updated ${data.length} records`;
        } catch (error) {
            throw `Store ${storeName}, ${error.toString()}`;
        }
    }

    public batchDelete = async (storeName: string, ids: any[]): Promise<string> => {
        try {
            const tx = this.dbInstance.transaction(storeName, 'readwrite');

            ids.forEach(async element => {
                await tx.objectStore(storeName).delete(element);
            });

            await tx.complete;

            return `Deleted ${ids.length} records`;
        } catch (error) {
            throw `Store ${storeName}, ${error.toString()}`;
        }
    }

    public clearStore = async (storeName: string): Promise<string> => {
        try {
            const tx = this.dbInstance.transaction(storeName, 'readwrite');

            await tx.objectStore(storeName).clear();

            await tx.complete;

            return `Store ${storeName} cleared`;
        } catch (error) {
            throw `Store ${storeName}, ${error.toString()}`;
        }
    }

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

    private upgradeDatabase(upgradeDB: UpgradeDB, dbDatabase: IDatabase) {
        if (upgradeDB.oldVersion < dbDatabase.version) {
            if (dbDatabase.objectStores) {
                for (var store of dbDatabase.objectStores) {
                    if (!upgradeDB.objectStoreNames.contains(store.name)) {
                        this.addNewStore(upgradeDB, store);
                    }
                }
            }
        }
    }

    private getKeyPath(keyPath?: string): string | string[] | undefined {
        if (keyPath) {
            var multiKeyPath = keyPath.split(',');
            return multiKeyPath.length > 1 ? multiKeyPath : keyPath;
        }
        else {
            return undefined;
        }
    }

    private addNewStore(upgradeDB: UpgradeDB, store: IObjectStore) {
        try {
            let primaryKey = store.primaryKey;

            if (!primaryKey) {
                primaryKey = { name: 'id', keyPath: 'id', multiEntry: false, unique: false, autoIncrement: true };
            }

            const newStore = upgradeDB.createObjectStore(store.name,
                {
                    keyPath: this.getKeyPath(primaryKey.keyPath),
                    autoIncrement: primaryKey.autoIncrement
                }
            );

            for (var index of store.indexes) {
                try {

                    newStore.createIndex(index.name,
                        this.getKeyPath(index.keyPath) ?? index.name,
                        {
                            multiEntry: index.multiEntry,
                            unique: index.unique
                        }
                    );
                } catch (error) {
                    throw `index ${index.name}, ${error.toString()}`;
                }
            }
        }
        catch (error) {
            throw `store ${store.name}, ${error.toString()}`;
        }
    }
}