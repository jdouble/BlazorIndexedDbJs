/**Defines the Database to open or create.*/
export interface IDatabase {
    /**the name of the database*/
    name: string;
    /**The version for this instance. This value is used when opening a database to determine if it needs to be updated*/
    version: number;
    /**Defines the stores to be created in the database defined as IStoreSchema*/
    objectStores: IObjectStore[];
}

/**Defines a store to be created in the database. */
export interface IObjectStore {
    name: string;
    keyPath?: string;
    autoIncrement: boolean;
    indexes: IIndex[];
}
/** */

/**Index definition for a store */
export interface IIndex {
    name: string;
    keyPath?: string;
    multiEntry: boolean;
    unique: boolean;
}

export interface IInformation {
    version: number;
    objectStoreNames: string[];
}
