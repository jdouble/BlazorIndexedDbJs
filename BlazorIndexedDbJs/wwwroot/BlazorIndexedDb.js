/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./client/InitialiseIndexDbBlazor.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./client/InitialiseIndexDbBlazor.ts":
/*!*******************************************!*\
  !*** ./client/InitialiseIndexDbBlazor.ts ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const indexedDbBlazor_1 = __webpack_require__(/*! ./indexedDbBlazor */ "./client/indexedDbBlazor.ts");
var IndexDb;
(function (IndexDb) {
    const timeghostExtensions = 'BlazorIndexedDbJs';
    const extensionObject = {
        IDBManager: new indexedDbBlazor_1.IndexedDbManager()
    };
    function initialise() {
        if (typeof window !== 'undefined' && !window[timeghostExtensions]) {
            window[timeghostExtensions] = Object.assign({}, extensionObject);
        }
        else {
            window[timeghostExtensions] = Object.assign(Object.assign({}, window[timeghostExtensions]), extensionObject);
        }
    }
    IndexDb.initialise = initialise;
})(IndexDb || (IndexDb = {}));
IndexDb.initialise();


/***/ }),

/***/ "./client/indexedDbBlazor.ts":
/*!***********************************!*\
  !*** ./client/indexedDbBlazor.ts ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IndexedDbManager = void 0;
const idb_1 = __webpack_require__(/*! idb */ "./node_modules/idb/build/idb.js");
const E_DB_CLOSED = "Database is closed";
class IndexedDbManager {
    constructor() {
        this.dbInstance = undefined;
        this.open = (database) => __awaiter(this, void 0, void 0, function* () {
            var upgradeError = "";
            try {
                if (!this.dbInstance || this.dbInstance.version < database.version) {
                    if (this.dbInstance) {
                        this.dbInstance.close();
                        this.dbInstance = undefined;
                    }
                    this.dbInstance = yield idb_1.openDb(database.name, database.version, upgradeDB => {
                        try {
                            this.upgradeDatabase(upgradeDB, database);
                        }
                        catch (error) {
                            upgradeError = error.toString();
                            throw (error);
                        }
                    });
                }
                return `IndexedDB ${database.name} opened`;
            }
            catch (error) {
                throw error.toString() + ' ' + upgradeError;
            }
        });
        this.deleteDatabase = (dbName) => __awaiter(this, void 0, void 0, function* () {
            try {
                if (!this.dbInstance)
                    throw E_DB_CLOSED;
                this.dbInstance.close();
                yield idb_1.deleteDb(dbName);
                this.dbInstance = undefined;
                return `The database ${dbName} has been deleted`;
            }
            catch (error) {
                throw `Database ${dbName}, ${error.toString()}`;
            }
        });
        this.getDbInfo = (dbName) => __awaiter(this, void 0, void 0, function* () {
            try {
                if (!this.dbInstance)
                    throw E_DB_CLOSED;
                const currentDb = this.dbInstance;
                let getStoreNames = (list) => {
                    let names = [];
                    for (var i = 0; i < list.length; i++) {
                        names.push(list[i]);
                    }
                    return names;
                };
                const dbInfo = {
                    version: currentDb.version,
                    objectStoreNames: getStoreNames(currentDb.objectStoreNames)
                };
                return dbInfo;
            }
            catch (error) {
                throw `Database ${dbName}, ${error.toString()}`;
            }
        });
        this.count = (storeName, key) => __awaiter(this, void 0, void 0, function* () {
            try {
                if (!this.dbInstance)
                    throw E_DB_CLOSED;
                const tx = this.dbInstance.transaction(storeName, 'readonly');
                let result = yield tx.objectStore(storeName).count(key !== null && key !== void 0 ? key : undefined);
                yield tx.complete;
                return result;
            }
            catch (error) {
                throw `Store ${storeName}, ${error.toString()}`;
            }
        });
        this.countByKeyRange = (storeName, lower, upper, lowerOpen, upperOpen) => __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.count(storeName, IDBKeyRange.bound(lower, upper, lowerOpen, upperOpen));
            }
            catch (error) {
                throw `Store ${storeName}, ${error.toString()}`;
            }
        });
        this.get = (storeName, key) => __awaiter(this, void 0, void 0, function* () {
            try {
                if (!this.dbInstance)
                    throw E_DB_CLOSED;
                const tx = this.dbInstance.transaction(storeName, 'readonly');
                let result = yield tx.objectStore(storeName).get(key);
                yield tx.complete;
                return result;
            }
            catch (error) {
                throw `Store ${storeName}, ${error.toString()}`;
            }
        });
        this.getAll = (storeName, key, count) => __awaiter(this, void 0, void 0, function* () {
            try {
                if (!this.dbInstance)
                    throw E_DB_CLOSED;
                const tx = this.dbInstance.transaction(storeName, 'readonly');
                let results = yield tx.objectStore(storeName).getAll(key !== null && key !== void 0 ? key : undefined, count !== null && count !== void 0 ? count : undefined);
                yield tx.complete;
                return results;
            }
            catch (error) {
                throw `Store ${storeName}, ${error.toString()}`;
            }
        });
        this.getAllByKeyRange = (storeName, lower, upper, lowerOpen, upperOpen, count) => __awaiter(this, void 0, void 0, function* () {
            try {
                if (!this.dbInstance)
                    throw E_DB_CLOSED;
                return yield this.getAll(storeName, IDBKeyRange.bound(lower, upper, lowerOpen, upperOpen), count);
            }
            catch (error) {
                throw `Store ${storeName}, ${error.toString()}`;
            }
        });
        this.getAllByArrayKey = (storeName, key) => __awaiter(this, void 0, void 0, function* () {
            try {
                if (!this.dbInstance)
                    throw E_DB_CLOSED;
                const tx = this.dbInstance.transaction(storeName, 'readonly');
                const sx = tx.objectStore(storeName);
                let results = [];
                for (let index = 0; index < key.length; index++) {
                    const element = key[index];
                    results = results.concat(yield sx.getAll(element));
                }
                yield tx.complete;
                return results;
            }
            catch (error) {
                throw `Store ${storeName}, ${error.toString()}`;
            }
        });
        this.getKey = (storeName, key) => __awaiter(this, void 0, void 0, function* () {
            try {
                if (!this.dbInstance)
                    throw E_DB_CLOSED;
                const tx = this.dbInstance.transaction(storeName, 'readonly');
                let result = yield tx.objectStore(storeName).getKey(key);
                yield tx.complete;
                return result;
            }
            catch (error) {
                throw `Store ${storeName}, ${error.toString()}`;
            }
        });
        this.getAllKeys = (storeName, key, count) => __awaiter(this, void 0, void 0, function* () {
            try {
                if (!this.dbInstance)
                    throw E_DB_CLOSED;
                const tx = this.dbInstance.transaction(storeName, 'readonly');
                let results = yield tx.objectStore(storeName).getAllKeys(key !== null && key !== void 0 ? key : undefined, count !== null && count !== void 0 ? count : undefined);
                yield tx.complete;
                return results;
            }
            catch (error) {
                throw `Store ${storeName}, ${error.toString()}`;
            }
        });
        this.getAllKeysByKeyRange = (storeName, lower, upper, lowerOpen, upperOpen, count) => __awaiter(this, void 0, void 0, function* () {
            try {
                if (!this.dbInstance)
                    throw E_DB_CLOSED;
                return yield this.getAllKeys(storeName, IDBKeyRange.bound(lower, upper, lowerOpen, upperOpen), count);
            }
            catch (error) {
                throw `Store ${storeName}, ${error.toString()}`;
            }
        });
        this.getAllKeysByArrayKey = (storeName, key) => __awaiter(this, void 0, void 0, function* () {
            try {
                if (!this.dbInstance)
                    throw E_DB_CLOSED;
                const tx = this.dbInstance.transaction(storeName, 'readonly');
                const sx = tx.objectStore(storeName);
                let results = [];
                for (let index = 0; index < key.length; index++) {
                    const element = key[index];
                    results = results.concat(yield sx.getAllKeys(element));
                }
                yield tx.complete;
                return results;
            }
            catch (error) {
                throw `Store ${storeName}, ${error.toString()}`;
            }
        });
        this.query = (storeName, filter, count = 0, skip = 0) => __awaiter(this, void 0, void 0, function* () {
            try {
                if (!this.dbInstance)
                    throw E_DB_CLOSED;
                const tx = this.dbInstance.transaction(storeName, 'readonly');
                try {
                    var func = new Function('obj', filter);
                }
                catch (error) {
                    throw `${error.toString()} in filter { ${filter} }`;
                }
                var row = 0;
                var errorMessage = "";
                let results = [];
                tx.objectStore(storeName)
                    .iterateCursor(cursor => {
                    if (!cursor) {
                        return;
                    }
                    try {
                        var out = func(cursor.value);
                        if (out) {
                            row++;
                            if (row > skip) {
                                results.push(out);
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
                yield tx.complete;
                if (errorMessage) {
                    throw errorMessage;
                }
                return results;
            }
            catch (error) {
                throw `Store ${storeName} ${error.toString()}`;
            }
        });
        this.countFromIndex = (storeName, indexName, key) => __awaiter(this, void 0, void 0, function* () {
            try {
                if (!this.dbInstance)
                    throw E_DB_CLOSED;
                const tx = this.dbInstance.transaction(storeName, 'readonly');
                let result = yield tx.objectStore(storeName).index(indexName).count(key !== null && key !== void 0 ? key : undefined);
                yield tx.complete;
                return result;
            }
            catch (error) {
                throw `Store ${storeName}, Index ${indexName}, ${error.toString()}`;
            }
        });
        this.countFromIndexByKeyRange = (storeName, indexName, lower, upper, lowerOpen, upperOpen) => __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.countFromIndex(storeName, indexName, IDBKeyRange.bound(lower, upper, lowerOpen, upperOpen));
            }
            catch (error) {
                throw `Store ${storeName}, Index ${indexName}, ${error.toString()}`;
            }
        });
        this.getFromIndex = (storeName, indexName, key) => __awaiter(this, void 0, void 0, function* () {
            try {
                if (!this.dbInstance)
                    throw E_DB_CLOSED;
                const tx = this.dbInstance.transaction(storeName, 'readonly');
                const results = yield tx.objectStore(storeName).index(indexName).get(key);
                yield tx.complete;
                return results;
            }
            catch (error) {
                throw `Store ${storeName}, Index ${indexName}, ${error.toString()}`;
            }
        });
        this.getAllFromIndex = (storeName, indexName, key, count) => __awaiter(this, void 0, void 0, function* () {
            try {
                if (!this.dbInstance)
                    throw E_DB_CLOSED;
                const tx = this.dbInstance.transaction(storeName, 'readonly');
                const results = yield tx.objectStore(storeName).index(indexName).getAll(key !== null && key !== void 0 ? key : undefined, count !== null && count !== void 0 ? count : undefined);
                yield tx.complete;
                return results;
            }
            catch (error) {
                throw `Store ${storeName}, Index ${indexName}, ${error.toString()}`;
            }
        });
        this.getAllFromIndexByKeyRange = (storeName, indexName, lower, upper, lowerOpen, upperOpen, count) => __awaiter(this, void 0, void 0, function* () {
            try {
                if (!this.dbInstance)
                    throw E_DB_CLOSED;
                return yield this.getAllFromIndex(storeName, indexName, IDBKeyRange.bound(lower, upper, lowerOpen, upperOpen), count);
            }
            catch (error) {
                throw `Store ${storeName}, Index ${indexName}, ${error.toString()}`;
            }
        });
        this.getAllFromIndexByArrayKey = (storeName, indexName, key) => __awaiter(this, void 0, void 0, function* () {
            try {
                if (!this.dbInstance)
                    throw E_DB_CLOSED;
                const tx = this.dbInstance.transaction(storeName, 'readonly');
                const dx = tx.objectStore(storeName).index(indexName);
                let results = [];
                for (let index = 0; index < key.length; index++) {
                    const element = key[index];
                    results = results.concat(yield dx.getAll(element));
                }
                yield tx.complete;
                return results;
            }
            catch (error) {
                throw `Store ${storeName}, Index ${indexName}, ${error.toString()}`;
            }
        });
        this.getKeyFromIndex = (storeName, indexName, key) => __awaiter(this, void 0, void 0, function* () {
            try {
                if (!this.dbInstance)
                    throw E_DB_CLOSED;
                const tx = this.dbInstance.transaction(storeName, 'readonly');
                const results = yield tx.objectStore(storeName).index(indexName).getKey(key);
                yield tx.complete;
                return results;
            }
            catch (error) {
                throw `Store ${storeName}, Index ${indexName}, ${error.toString()}`;
            }
        });
        this.getAllKeysFromIndex = (storeName, indexName, key, count) => __awaiter(this, void 0, void 0, function* () {
            try {
                if (!this.dbInstance)
                    throw E_DB_CLOSED;
                const tx = this.dbInstance.transaction(storeName, 'readonly');
                const results = yield tx.objectStore(storeName).index(indexName).getAllKeys(key !== null && key !== void 0 ? key : undefined, count !== null && count !== void 0 ? count : undefined);
                yield tx.complete;
                return results;
            }
            catch (error) {
                throw `Store ${storeName}, Index ${indexName}, ${error.toString()}`;
            }
        });
        this.getAllKeysFromIndexByKeyRange = (storeName, indexName, lower, upper, lowerOpen, upperOpen, count) => __awaiter(this, void 0, void 0, function* () {
            try {
                if (!this.dbInstance)
                    throw E_DB_CLOSED;
                return yield this.getAllKeysFromIndex(storeName, indexName, IDBKeyRange.bound(lower, upper, lowerOpen, upperOpen), count);
            }
            catch (error) {
                throw `Store ${storeName}, Index ${indexName}, ${error.toString()}`;
            }
        });
        this.getAllKeysFromIndexByArrayKey = (storeName, indexName, key) => __awaiter(this, void 0, void 0, function* () {
            try {
                if (!this.dbInstance)
                    throw E_DB_CLOSED;
                const tx = this.dbInstance.transaction(storeName, 'readonly');
                const dx = tx.objectStore(storeName).index(indexName);
                let results = [];
                for (let index = 0; index < key.length; index++) {
                    const element = key[index];
                    results = results.concat(yield dx.getAllKeys(element));
                }
                yield tx.complete;
                return results;
            }
            catch (error) {
                throw `Store ${storeName}, Index ${indexName}, ${error.toString()}`;
            }
        });
        this.queryFromIndex = (storeName, indexName, filter, count = 0, skip = 0) => __awaiter(this, void 0, void 0, function* () {
            try {
                if (!this.dbInstance)
                    throw E_DB_CLOSED;
                const tx = this.dbInstance.transaction(storeName, 'readonly');
                try {
                    var func = new Function('obj', filter);
                }
                catch (error) {
                    throw `${error.toString()} in filter { ${filter} }`;
                }
                var row = 0;
                var errorMessage = "";
                let results = [];
                tx.objectStore(storeName)
                    .index(indexName)
                    .iterateCursor(cursor => {
                    if (!cursor) {
                        return;
                    }
                    try {
                        var out = func(cursor.value);
                        if (out) {
                            row++;
                            if (row > skip) {
                                results.push(out);
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
                yield tx.complete;
                if (errorMessage) {
                    throw errorMessage;
                }
                return results;
            }
            catch (error) {
                throw `Store ${storeName}, Index ${indexName}, ${error.toString()}`;
            }
        });
        this.add = (storeName, data, key) => __awaiter(this, void 0, void 0, function* () {
            try {
                if (!this.dbInstance)
                    throw E_DB_CLOSED;
                const tx = this.dbInstance.transaction(storeName, 'readwrite');
                const objectStore = tx.objectStore(storeName);
                data = this.checkForKeyPath(objectStore, data);
                const result = yield objectStore.add(data, key !== null && key !== void 0 ? key : undefined);
                yield tx.complete;
                return `Added new record with id ${result}`;
            }
            catch (error) {
                throw `Store ${storeName}, ${error.toString()}`;
            }
        });
        this.put = (storeName, data, key) => __awaiter(this, void 0, void 0, function* () {
            try {
                if (!this.dbInstance)
                    throw E_DB_CLOSED;
                const tx = this.dbInstance.transaction(storeName, 'readwrite');
                const result = yield tx.objectStore(storeName).put(data, key !== null && key !== void 0 ? key : undefined);
                yield tx.complete;
                return `updated record with id ${result}`;
            }
            catch (error) {
                throw `Store ${storeName}, ${error.toString()}`;
            }
        });
        this.delete = (storeName, id) => __awaiter(this, void 0, void 0, function* () {
            try {
                if (!this.dbInstance)
                    throw E_DB_CLOSED;
                const tx = this.dbInstance.transaction(storeName, 'readwrite');
                yield tx.objectStore(storeName).delete(id);
                yield tx.complete;
                return `Record with id: ${id} deleted`;
            }
            catch (error) {
                throw `Store ${storeName}, ${error.toString()}`;
            }
        });
        this.batchAdd = (storeName, data) => __awaiter(this, void 0, void 0, function* () {
            try {
                if (!this.dbInstance)
                    throw E_DB_CLOSED;
                const tx = this.dbInstance.transaction(storeName, 'readwrite');
                const objectStore = tx.objectStore(storeName);
                data.forEach((element) => __awaiter(this, void 0, void 0, function* () {
                    let item = this.checkForKeyPath(objectStore, element);
                    yield objectStore.add(item);
                }));
                yield tx.complete;
                return `Added ${data.length} records`;
            }
            catch (error) {
                throw `Store ${storeName}, ${error.toString()}`;
            }
        });
        this.batchPut = (storeName, data) => __awaiter(this, void 0, void 0, function* () {
            try {
                if (!this.dbInstance)
                    throw E_DB_CLOSED;
                const tx = this.dbInstance.transaction(storeName, 'readwrite');
                data.forEach((element) => __awaiter(this, void 0, void 0, function* () {
                    yield tx.objectStore(storeName).put(element);
                }));
                yield tx.complete;
                return `updated ${data.length} records`;
            }
            catch (error) {
                throw `Store ${storeName}, ${error.toString()}`;
            }
        });
        this.batchDelete = (storeName, ids) => __awaiter(this, void 0, void 0, function* () {
            try {
                if (!this.dbInstance)
                    throw E_DB_CLOSED;
                const tx = this.dbInstance.transaction(storeName, 'readwrite');
                ids.forEach((element) => __awaiter(this, void 0, void 0, function* () {
                    yield tx.objectStore(storeName).delete(element);
                }));
                yield tx.complete;
                return `Deleted ${ids.length} records`;
            }
            catch (error) {
                throw `Store ${storeName}, ${error.toString()}`;
            }
        });
        this.clearStore = (storeName) => __awaiter(this, void 0, void 0, function* () {
            try {
                if (!this.dbInstance)
                    throw E_DB_CLOSED;
                const tx = this.dbInstance.transaction(storeName, 'readwrite');
                yield tx.objectStore(storeName).clear();
                yield tx.complete;
                return `Store ${storeName} cleared`;
            }
            catch (error) {
                throw `Store ${storeName}, ${error.toString()}`;
            }
        });
    }
    checkForKeyPath(objectStore, data) {
        if (!objectStore.autoIncrement || !objectStore.keyPath) {
            return data;
        }
        if (typeof objectStore.keyPath !== 'string') {
            return data;
        }
        const keyPath = objectStore.keyPath;
        if (!data[keyPath]) {
            delete data[keyPath];
        }
        return data;
    }
    upgradeDatabase(upgradeDB, dbDatabase) {
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
    getKeyPath(keyPath) {
        if (keyPath) {
            var multiKeyPath = keyPath.split(',');
            return multiKeyPath.length > 1 ? multiKeyPath : keyPath;
        }
        else {
            return undefined;
        }
    }
    addNewStore(upgradeDB, store) {
        var _a;
        try {
            let primaryKey = store.primaryKey;
            if (!primaryKey) {
                primaryKey = { name: 'id', keyPath: 'id', multiEntry: false, unique: false, autoIncrement: true };
            }
            const newStore = upgradeDB.createObjectStore(store.name, {
                keyPath: this.getKeyPath(primaryKey.keyPath),
                autoIncrement: primaryKey.autoIncrement
            });
            for (var index of store.indexes) {
                try {
                    newStore.createIndex(index.name, (_a = this.getKeyPath(index.keyPath)) !== null && _a !== void 0 ? _a : index.name, {
                        multiEntry: index.multiEntry,
                        unique: index.unique
                    });
                }
                catch (error) {
                    throw `index ${index.name}, ${error.toString()}`;
                }
            }
        }
        catch (error) {
            throw `store ${store.name}, ${error.toString()}`;
        }
    }
}
exports.IndexedDbManager = IndexedDbManager;


/***/ }),

/***/ "./node_modules/idb/build/idb.js":
/*!***************************************!*\
  !*** ./node_modules/idb/build/idb.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

(function (global, factory) {
   true ? factory(exports) :
  undefined;
}(this, function (exports) { 'use strict';

  function toArray(arr) {
    return Array.prototype.slice.call(arr);
  }

  function promisifyRequest(request) {
    return new Promise(function(resolve, reject) {
      request.onsuccess = function() {
        resolve(request.result);
      };

      request.onerror = function() {
        reject(request.error);
      };
    });
  }

  function promisifyRequestCall(obj, method, args) {
    var request;
    var p = new Promise(function(resolve, reject) {
      request = obj[method].apply(obj, args);
      promisifyRequest(request).then(resolve, reject);
    });

    p.request = request;
    return p;
  }

  function promisifyCursorRequestCall(obj, method, args) {
    var p = promisifyRequestCall(obj, method, args);
    return p.then(function(value) {
      if (!value) return;
      return new Cursor(value, p.request);
    });
  }

  function proxyProperties(ProxyClass, targetProp, properties) {
    properties.forEach(function(prop) {
      Object.defineProperty(ProxyClass.prototype, prop, {
        get: function() {
          return this[targetProp][prop];
        },
        set: function(val) {
          this[targetProp][prop] = val;
        }
      });
    });
  }

  function proxyRequestMethods(ProxyClass, targetProp, Constructor, properties) {
    properties.forEach(function(prop) {
      if (!(prop in Constructor.prototype)) return;
      ProxyClass.prototype[prop] = function() {
        return promisifyRequestCall(this[targetProp], prop, arguments);
      };
    });
  }

  function proxyMethods(ProxyClass, targetProp, Constructor, properties) {
    properties.forEach(function(prop) {
      if (!(prop in Constructor.prototype)) return;
      ProxyClass.prototype[prop] = function() {
        return this[targetProp][prop].apply(this[targetProp], arguments);
      };
    });
  }

  function proxyCursorRequestMethods(ProxyClass, targetProp, Constructor, properties) {
    properties.forEach(function(prop) {
      if (!(prop in Constructor.prototype)) return;
      ProxyClass.prototype[prop] = function() {
        return promisifyCursorRequestCall(this[targetProp], prop, arguments);
      };
    });
  }

  function Index(index) {
    this._index = index;
  }

  proxyProperties(Index, '_index', [
    'name',
    'keyPath',
    'multiEntry',
    'unique'
  ]);

  proxyRequestMethods(Index, '_index', IDBIndex, [
    'get',
    'getKey',
    'getAll',
    'getAllKeys',
    'count'
  ]);

  proxyCursorRequestMethods(Index, '_index', IDBIndex, [
    'openCursor',
    'openKeyCursor'
  ]);

  function Cursor(cursor, request) {
    this._cursor = cursor;
    this._request = request;
  }

  proxyProperties(Cursor, '_cursor', [
    'direction',
    'key',
    'primaryKey',
    'value'
  ]);

  proxyRequestMethods(Cursor, '_cursor', IDBCursor, [
    'update',
    'delete'
  ]);

  // proxy 'next' methods
  ['advance', 'continue', 'continuePrimaryKey'].forEach(function(methodName) {
    if (!(methodName in IDBCursor.prototype)) return;
    Cursor.prototype[methodName] = function() {
      var cursor = this;
      var args = arguments;
      return Promise.resolve().then(function() {
        cursor._cursor[methodName].apply(cursor._cursor, args);
        return promisifyRequest(cursor._request).then(function(value) {
          if (!value) return;
          return new Cursor(value, cursor._request);
        });
      });
    };
  });

  function ObjectStore(store) {
    this._store = store;
  }

  ObjectStore.prototype.createIndex = function() {
    return new Index(this._store.createIndex.apply(this._store, arguments));
  };

  ObjectStore.prototype.index = function() {
    return new Index(this._store.index.apply(this._store, arguments));
  };

  proxyProperties(ObjectStore, '_store', [
    'name',
    'keyPath',
    'indexNames',
    'autoIncrement'
  ]);

  proxyRequestMethods(ObjectStore, '_store', IDBObjectStore, [
    'put',
    'add',
    'delete',
    'clear',
    'get',
    'getAll',
    'getKey',
    'getAllKeys',
    'count'
  ]);

  proxyCursorRequestMethods(ObjectStore, '_store', IDBObjectStore, [
    'openCursor',
    'openKeyCursor'
  ]);

  proxyMethods(ObjectStore, '_store', IDBObjectStore, [
    'deleteIndex'
  ]);

  function Transaction(idbTransaction) {
    this._tx = idbTransaction;
    this.complete = new Promise(function(resolve, reject) {
      idbTransaction.oncomplete = function() {
        resolve();
      };
      idbTransaction.onerror = function() {
        reject(idbTransaction.error);
      };
      idbTransaction.onabort = function() {
        reject(idbTransaction.error);
      };
    });
  }

  Transaction.prototype.objectStore = function() {
    return new ObjectStore(this._tx.objectStore.apply(this._tx, arguments));
  };

  proxyProperties(Transaction, '_tx', [
    'objectStoreNames',
    'mode'
  ]);

  proxyMethods(Transaction, '_tx', IDBTransaction, [
    'abort'
  ]);

  function UpgradeDB(db, oldVersion, transaction) {
    this._db = db;
    this.oldVersion = oldVersion;
    this.transaction = new Transaction(transaction);
  }

  UpgradeDB.prototype.createObjectStore = function() {
    return new ObjectStore(this._db.createObjectStore.apply(this._db, arguments));
  };

  proxyProperties(UpgradeDB, '_db', [
    'name',
    'version',
    'objectStoreNames'
  ]);

  proxyMethods(UpgradeDB, '_db', IDBDatabase, [
    'deleteObjectStore',
    'close'
  ]);

  function DB(db) {
    this._db = db;
  }

  DB.prototype.transaction = function() {
    return new Transaction(this._db.transaction.apply(this._db, arguments));
  };

  proxyProperties(DB, '_db', [
    'name',
    'version',
    'objectStoreNames'
  ]);

  proxyMethods(DB, '_db', IDBDatabase, [
    'close'
  ]);

  // Add cursor iterators
  // TODO: remove this once browsers do the right thing with promises
  ['openCursor', 'openKeyCursor'].forEach(function(funcName) {
    [ObjectStore, Index].forEach(function(Constructor) {
      // Don't create iterateKeyCursor if openKeyCursor doesn't exist.
      if (!(funcName in Constructor.prototype)) return;

      Constructor.prototype[funcName.replace('open', 'iterate')] = function() {
        var args = toArray(arguments);
        var callback = args[args.length - 1];
        var nativeObject = this._store || this._index;
        var request = nativeObject[funcName].apply(nativeObject, args.slice(0, -1));
        request.onsuccess = function() {
          callback(request.result);
        };
      };
    });
  });

  // polyfill getAll
  [Index, ObjectStore].forEach(function(Constructor) {
    if (Constructor.prototype.getAll) return;
    Constructor.prototype.getAll = function(query, count) {
      var instance = this;
      var items = [];

      return new Promise(function(resolve) {
        instance.iterateCursor(query, function(cursor) {
          if (!cursor) {
            resolve(items);
            return;
          }
          items.push(cursor.value);

          if (count !== undefined && items.length == count) {
            resolve(items);
            return;
          }
          cursor.continue();
        });
      });
    };
  });

  function openDb(name, version, upgradeCallback) {
    var p = promisifyRequestCall(indexedDB, 'open', [name, version]);
    var request = p.request;

    if (request) {
      request.onupgradeneeded = function(event) {
        if (upgradeCallback) {
          upgradeCallback(new UpgradeDB(request.result, event.oldVersion, request.transaction));
        }
      };
    }

    return p.then(function(db) {
      return new DB(db);
    });
  }

  function deleteDb(name) {
    return promisifyRequestCall(indexedDB, 'deleteDatabase', [name]);
  }

  exports.openDb = openDb;
  exports.deleteDb = deleteDb;

  Object.defineProperty(exports, '__esModule', { value: true });

}));


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L0luaXRpYWxpc2VJbmRleERiQmxhem9yLnRzIiwid2VicGFjazovLy8uL2NsaWVudC9pbmRleGVkRGJCbGF6b3IudHMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2lkYi9idWlsZC9pZGIuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtRQUFBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOzs7UUFHQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMENBQTBDLGdDQUFnQztRQUMxRTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLHdEQUF3RCxrQkFBa0I7UUFDMUU7UUFDQSxpREFBaUQsY0FBYztRQUMvRDs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EseUNBQXlDLGlDQUFpQztRQUMxRSxnSEFBZ0gsbUJBQW1CLEVBQUU7UUFDckk7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwyQkFBMkIsMEJBQTBCLEVBQUU7UUFDdkQsaUNBQWlDLGVBQWU7UUFDaEQ7UUFDQTtRQUNBOztRQUVBO1FBQ0Esc0RBQXNELCtEQUErRDs7UUFFckg7UUFDQTs7O1FBR0E7UUFDQTs7Ozs7Ozs7Ozs7Ozs7O0FDbEZBLHNHQUFxRDtBQUVyRCxJQUFVLE9BQU8sQ0FtQmhCO0FBbkJELFdBQVUsT0FBTztJQUNiLE1BQU0sbUJBQW1CLEdBQVcsbUJBQW1CLENBQUM7SUFDeEQsTUFBTSxlQUFlLEdBQUc7UUFDcEIsVUFBVSxFQUFFLElBQUksa0NBQWdCLEVBQUU7S0FDckMsQ0FBQztJQUVGLFNBQWdCLFVBQVU7UUFDdEIsSUFBSSxPQUFPLE1BQU0sS0FBSyxX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MkJBQTJCOztBQUU1QjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1AsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1QsT0FBTztBQUNQO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVCxPQUFPO0FBQ1A7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBLGdEQUFnRCxjQUFjOztBQUU5RCxDQUFDIiwiZmlsZSI6IkJsYXpvckluZGV4ZWREYi5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vY2xpZW50L0luaXRpYWxpc2VJbmRleERiQmxhem9yLnRzXCIpO1xuIiwiaW1wb3J0IHsgSW5kZXhlZERiTWFuYWdlciB9IGZyb20gJy4vaW5kZXhlZERiQmxhem9yJztcblxubmFtZXNwYWNlIEluZGV4RGIge1xuICAgIGNvbnN0IHRpbWVnaG9zdEV4dGVuc2lvbnM6IHN0cmluZyA9ICdCbGF6b3JJbmRleGVkRGJKcyc7XG4gICAgY29uc3QgZXh0ZW5zaW9uT2JqZWN0ID0ge1xuICAgICAgICBJREJNYW5hZ2VyOiBuZXcgSW5kZXhlZERiTWFuYWdlcigpXG4gICAgfTtcblxuICAgIGV4cG9ydCBmdW5jdGlvbiBpbml0aWFsaXNlKCk6IHZvaWQge1xuICAgICAgICBpZiAodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgJiYgIXdpbmRvd1t0aW1lZ2hvc3RFeHRlbnNpb25zXSkge1xuICAgICAgICAgICAgd2luZG93W3RpbWVnaG9zdEV4dGVuc2lvbnNdID0ge1xuICAgICAgICAgICAgICAgIC4uLmV4dGVuc2lvbk9iamVjdFxuICAgICAgICAgICAgfTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHdpbmRvd1t0aW1lZ2hvc3RFeHRlbnNpb25zXSA9IHtcbiAgICAgICAgICAgICAgICAuLi53aW5kb3dbdGltZWdob3N0RXh0ZW5zaW9uc10sXG4gICAgICAgICAgICAgICAgLi4uZXh0ZW5zaW9uT2JqZWN0XG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG5cbiAgICB9XG59XG5cbkluZGV4RGIuaW5pdGlhbGlzZSgpOyIsIi8vLy8vIDxyZWZlcmVuY2UgcGF0aD1cIk1pY3Jvc29mdC5KU0ludGVyb3AuZC50c1wiLz5cbmltcG9ydCB7IG9wZW5EYiwgZGVsZXRlRGIsIERCLCBVcGdyYWRlREIsIE9iamVjdFN0b3JlLCBUcmFuc2FjdGlvbiB9IGZyb20gJ2lkYic7XG5pbXBvcnQgeyBJRGF0YWJhc2UsIElJbmRleFNlYXJjaCwgSUluZGV4LCBJT2JqZWN0U3RvcmUsIElJbmZvcm1hdGlvbiB9IGZyb20gJy4vSW50ZXJvcEludGVyZmFjZXMnO1xuXG5jb25zdCBFX0RCX0NMT1NFRDogc3RyaW5nID0gXCJEYXRhYmFzZSBpcyBjbG9zZWRcIjtcblxuZXhwb3J0IGNsYXNzIEluZGV4ZWREYk1hbmFnZXIge1xuXG4gICAgcHJpdmF0ZSBkYkluc3RhbmNlPzogREIgPSB1bmRlZmluZWQ7XG5cbiAgICBjb25zdHJ1Y3RvcigpIHsgfVxuXG4gICAgcHVibGljIG9wZW4gPSBhc3luYyAoZGF0YWJhc2U6IElEYXRhYmFzZSk6IFByb21pc2U8c3RyaW5nPiA9PiB7XG4gICAgICAgIHZhciB1cGdyYWRlRXJyb3IgPSBcIlwiO1xuXG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBpZiAoIXRoaXMuZGJJbnN0YW5jZSB8fCB0aGlzLmRiSW5zdGFuY2UudmVyc2lvbiA8IGRhdGFiYXNlLnZlcnNpb24pIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5kYkluc3RhbmNlKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZGJJbnN0YW5jZS5jbG9zZSgpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmRiSW5zdGFuY2UgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRoaXMuZGJJbnN0YW5jZSA9IGF3YWl0IG9wZW5EYihkYXRhYmFzZS5uYW1lLCBkYXRhYmFzZS52ZXJzaW9uLCB1cGdyYWRlREIgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy51cGdyYWRlRGF0YWJhc2UodXBncmFkZURCLCBkYXRhYmFzZSk7XG4gICAgICAgICAgICAgICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB1cGdyYWRlRXJyb3IgPSBlcnJvci50b1N0cmluZygpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3coZXJyb3IpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiBgSW5kZXhlZERCICR7ZGF0YWJhc2UubmFtZX0gb3BlbmVkYDtcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgIHRocm93IGVycm9yLnRvU3RyaW5nKCkrJyAnK3VwZ3JhZGVFcnJvcjtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBkZWxldGVEYXRhYmFzZSA9IGFzeW5jKGRiTmFtZTogc3RyaW5nKTogUHJvbWlzZTxzdHJpbmc+ID0+IHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGlmICghdGhpcy5kYkluc3RhbmNlKSB0aHJvdyBFX0RCX0NMT1NFRDtcblxuICAgICAgICAgICAgdGhpcy5kYkluc3RhbmNlLmNsb3NlKCk7XG5cbiAgICAgICAgICAgIGF3YWl0IGRlbGV0ZURiKGRiTmFtZSk7XG5cbiAgICAgICAgICAgIHRoaXMuZGJJbnN0YW5jZSA9IHVuZGVmaW5lZDtcblxuICAgICAgICAgICAgcmV0dXJuIGBUaGUgZGF0YWJhc2UgJHtkYk5hbWV9IGhhcyBiZWVuIGRlbGV0ZWRgO1xuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgdGhyb3cgYERhdGFiYXNlICR7ZGJOYW1lfSwgJHtlcnJvci50b1N0cmluZygpfWA7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0RGJJbmZvID0gYXN5bmMgKGRiTmFtZTogc3RyaW5nKSA6IFByb21pc2U8SUluZm9ybWF0aW9uPiA9PiB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBpZiAoIXRoaXMuZGJJbnN0YW5jZSkgdGhyb3cgRV9EQl9DTE9TRUQ7XG5cbiAgICAgICAgICAgIGNvbnN0IGN1cnJlbnREYiA9IDxEQj50aGlzLmRiSW5zdGFuY2U7XG5cbiAgICAgICAgICAgIGxldCBnZXRTdG9yZU5hbWVzID0gKGxpc3Q6IERPTVN0cmluZ0xpc3QpOiBzdHJpbmdbXSA9PiB7XG4gICAgICAgICAgICAgICAgbGV0IG5hbWVzOiBzdHJpbmdbXSA9IFtdO1xuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGlzdC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICBuYW1lcy5wdXNoKGxpc3RbaV0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gbmFtZXM7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdCBkYkluZm86IElJbmZvcm1hdGlvbiA9IHtcbiAgICAgICAgICAgICAgICB2ZXJzaW9uOiBjdXJyZW50RGIudmVyc2lvbixcbiAgICAgICAgICAgICAgICBvYmplY3RTdG9yZU5hbWVzOiBnZXRTdG9yZU5hbWVzKGN1cnJlbnREYi5vYmplY3RTdG9yZU5hbWVzKVxuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgcmV0dXJuIGRiSW5mbztcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgIHRocm93IGBEYXRhYmFzZSAke2RiTmFtZX0sICR7ZXJyb3IudG9TdHJpbmcoKX1gO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gSURCT2JqZWN0U3RvcmVcbiAgICBwdWJsaWMgY291bnQgPSBhc3luYyAoc3RvcmVOYW1lOiBzdHJpbmcsIGtleT86IGFueSk6IFByb21pc2U8bnVtYmVyPiA9PiB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBpZiAoIXRoaXMuZGJJbnN0YW5jZSkgdGhyb3cgRV9EQl9DTE9TRUQ7XG5cbiAgICAgICAgICAgIGNvbnN0IHR4ID0gdGhpcy5kYkluc3RhbmNlLnRyYW5zYWN0aW9uKHN0b3JlTmFtZSwgJ3JlYWRvbmx5Jyk7XG5cbiAgICAgICAgICAgIGxldCByZXN1bHQgPSBhd2FpdCB0eC5vYmplY3RTdG9yZShzdG9yZU5hbWUpLmNvdW50KGtleSA/PyB1bmRlZmluZWQpO1xuXG4gICAgICAgICAgICBhd2FpdCB0eC5jb21wbGV0ZTtcblxuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgIHRocm93IGBTdG9yZSAke3N0b3JlTmFtZX0sICR7ZXJyb3IudG9TdHJpbmcoKX1gO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIGNvdW50QnlLZXlSYW5nZSA9IGFzeW5jIChzdG9yZU5hbWU6IHN0cmluZywgbG93ZXI6IGFueSwgdXBwZXI6IGFueSwgbG93ZXJPcGVuOiBib29sZWFuLCB1cHBlck9wZW46IGJvb2xlYW4pOiBQcm9taXNlPG51bWJlcj4gPT4ge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgcmV0dXJuIGF3YWl0IHRoaXMuY291bnQoc3RvcmVOYW1lLCBJREJLZXlSYW5nZS5ib3VuZChsb3dlciwgdXBwZXIsIGxvd2VyT3BlbiwgdXBwZXJPcGVuKSk7XG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICB0aHJvdyBgU3RvcmUgJHtzdG9yZU5hbWV9LCAke2Vycm9yLnRvU3RyaW5nKCl9YDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBnZXQgPSBhc3luYyAoc3RvcmVOYW1lOiBzdHJpbmcsIGtleTogYW55KTogUHJvbWlzZTxhbnk+ID0+IHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGlmICghdGhpcy5kYkluc3RhbmNlKSB0aHJvdyBFX0RCX0NMT1NFRDtcblxuICAgICAgICAgICAgY29uc3QgdHggPSB0aGlzLmRiSW5zdGFuY2UudHJhbnNhY3Rpb24oc3RvcmVOYW1lLCAncmVhZG9ubHknKTtcblxuICAgICAgICAgICAgbGV0IHJlc3VsdCA9IGF3YWl0IHR4Lm9iamVjdFN0b3JlKHN0b3JlTmFtZSkuZ2V0KGtleSk7XG5cbiAgICAgICAgICAgIGF3YWl0IHR4LmNvbXBsZXRlO1xuXG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgdGhyb3cgYFN0b3JlICR7c3RvcmVOYW1lfSwgJHtlcnJvci50b1N0cmluZygpfWA7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0QWxsID0gYXN5bmMgKHN0b3JlTmFtZTogc3RyaW5nLCBrZXk/OiBhbnksIGNvdW50PzogbnVtYmVyKTogUHJvbWlzZTxhbnk+ID0+IHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGlmICghdGhpcy5kYkluc3RhbmNlKSB0aHJvdyBFX0RCX0NMT1NFRDtcblxuICAgICAgICAgICAgY29uc3QgdHggPSB0aGlzLmRiSW5zdGFuY2UudHJhbnNhY3Rpb24oc3RvcmVOYW1lLCAncmVhZG9ubHknKTtcblxuICAgICAgICAgICAgbGV0IHJlc3VsdHMgPSBhd2FpdCB0eC5vYmplY3RTdG9yZShzdG9yZU5hbWUpLmdldEFsbChrZXkgPz8gdW5kZWZpbmVkLCBjb3VudCA/PyB1bmRlZmluZWQpO1xuXG4gICAgICAgICAgICBhd2FpdCB0eC5jb21wbGV0ZTtcblxuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdHM7XG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICB0aHJvdyBgU3RvcmUgJHtzdG9yZU5hbWV9LCAke2Vycm9yLnRvU3RyaW5nKCl9YDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBnZXRBbGxCeUtleVJhbmdlID0gYXN5bmMgKHN0b3JlTmFtZTogc3RyaW5nLCBsb3dlcjogYW55LCB1cHBlcjogYW55LCBsb3dlck9wZW46IGJvb2xlYW4sIHVwcGVyT3BlbjogYm9vbGVhbiwgY291bnQ/OiBudW1iZXIpOiBQcm9taXNlPGFueT4gPT4ge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgaWYgKCF0aGlzLmRiSW5zdGFuY2UpIHRocm93IEVfREJfQ0xPU0VEO1xuXG4gICAgICAgICAgICByZXR1cm4gYXdhaXQgdGhpcy5nZXRBbGwoc3RvcmVOYW1lLCBJREJLZXlSYW5nZS5ib3VuZChsb3dlciwgdXBwZXIsIGxvd2VyT3BlbiwgdXBwZXJPcGVuKSwgY291bnQpO1xuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgdGhyb3cgYFN0b3JlICR7c3RvcmVOYW1lfSwgJHtlcnJvci50b1N0cmluZygpfWA7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0QWxsQnlBcnJheUtleSA9IGFzeW5jIChzdG9yZU5hbWU6IHN0cmluZywga2V5OiBhbnlbXSk6IFByb21pc2U8YW55PiA9PiB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBpZiAoIXRoaXMuZGJJbnN0YW5jZSkgdGhyb3cgRV9EQl9DTE9TRUQ7XG5cbiAgICAgICAgICAgIGNvbnN0IHR4ID0gdGhpcy5kYkluc3RhbmNlLnRyYW5zYWN0aW9uKHN0b3JlTmFtZSwgJ3JlYWRvbmx5Jyk7XG4gICAgICAgICAgICBjb25zdCBzeCA9IHR4Lm9iamVjdFN0b3JlKHN0b3JlTmFtZSk7XG5cbiAgICAgICAgICAgIGxldCByZXN1bHRzOiBhbnlbXSA9IFtdO1xuXG4gICAgICAgICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwga2V5Lmxlbmd0aDsgaW5kZXgrKykge1xuICAgICAgICAgICAgICAgIGNvbnN0IGVsZW1lbnQgPSBrZXlbaW5kZXhdO1xuICAgICAgICAgICAgICAgIHJlc3VsdHMgPSByZXN1bHRzLmNvbmNhdChhd2FpdCBzeC5nZXRBbGwoZWxlbWVudCkpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBhd2FpdCB0eC5jb21wbGV0ZTtcblxuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdHM7XG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICB0aHJvdyBgU3RvcmUgJHtzdG9yZU5hbWV9LCAke2Vycm9yLnRvU3RyaW5nKCl9YDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBnZXRLZXkgPSBhc3luYyAoc3RvcmVOYW1lOiBzdHJpbmcsIGtleTogYW55KTogUHJvbWlzZTxhbnk+ID0+IHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGlmICghdGhpcy5kYkluc3RhbmNlKSB0aHJvdyBFX0RCX0NMT1NFRDtcblxuICAgICAgICAgICAgY29uc3QgdHggPSB0aGlzLmRiSW5zdGFuY2UudHJhbnNhY3Rpb24oc3RvcmVOYW1lLCAncmVhZG9ubHknKTtcblxuICAgICAgICAgICAgbGV0IHJlc3VsdCA9IGF3YWl0IHR4Lm9iamVjdFN0b3JlKHN0b3JlTmFtZSkuZ2V0S2V5KGtleSk7XG5cbiAgICAgICAgICAgIGF3YWl0IHR4LmNvbXBsZXRlO1xuXG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgdGhyb3cgYFN0b3JlICR7c3RvcmVOYW1lfSwgJHtlcnJvci50b1N0cmluZygpfWA7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0QWxsS2V5cyA9IGFzeW5jIChzdG9yZU5hbWU6IHN0cmluZywga2V5PzogYW55LCBjb3VudD86IG51bWJlcik6IFByb21pc2U8YW55PiA9PiB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBpZiAoIXRoaXMuZGJJbnN0YW5jZSkgdGhyb3cgRV9EQl9DTE9TRUQ7XG5cbiAgICAgICAgICAgIGNvbnN0IHR4ID0gdGhpcy5kYkluc3RhbmNlLnRyYW5zYWN0aW9uKHN0b3JlTmFtZSwgJ3JlYWRvbmx5Jyk7XG5cbiAgICAgICAgICAgIGxldCByZXN1bHRzID0gYXdhaXQgdHgub2JqZWN0U3RvcmUoc3RvcmVOYW1lKS5nZXRBbGxLZXlzKGtleSA/PyB1bmRlZmluZWQsIGNvdW50ID8/IHVuZGVmaW5lZCk7XG5cbiAgICAgICAgICAgIGF3YWl0IHR4LmNvbXBsZXRlO1xuXG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0cztcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgIHRocm93IGBTdG9yZSAke3N0b3JlTmFtZX0sICR7ZXJyb3IudG9TdHJpbmcoKX1gO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIGdldEFsbEtleXNCeUtleVJhbmdlID0gYXN5bmMgKHN0b3JlTmFtZTogc3RyaW5nLCBsb3dlcjogYW55LCB1cHBlcjogYW55LCBsb3dlck9wZW46IGJvb2xlYW4sIHVwcGVyT3BlbjogYm9vbGVhbiwgY291bnQ/OiBudW1iZXIpOiBQcm9taXNlPGFueT4gPT4ge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgaWYgKCF0aGlzLmRiSW5zdGFuY2UpIHRocm93IEVfREJfQ0xPU0VEO1xuXG4gICAgICAgICAgICByZXR1cm4gYXdhaXQgdGhpcy5nZXRBbGxLZXlzKHN0b3JlTmFtZSwgSURCS2V5UmFuZ2UuYm91bmQobG93ZXIsIHVwcGVyLCBsb3dlck9wZW4sIHVwcGVyT3BlbiksIGNvdW50KTtcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgIHRocm93IGBTdG9yZSAke3N0b3JlTmFtZX0sICR7ZXJyb3IudG9TdHJpbmcoKX1gO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIGdldEFsbEtleXNCeUFycmF5S2V5ID0gYXN5bmMgKHN0b3JlTmFtZTogc3RyaW5nLCBrZXk6IGFueVtdKTogUHJvbWlzZTxhbnk+ID0+IHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGlmICghdGhpcy5kYkluc3RhbmNlKSB0aHJvdyBFX0RCX0NMT1NFRDtcblxuICAgICAgICAgICAgY29uc3QgdHggPSB0aGlzLmRiSW5zdGFuY2UudHJhbnNhY3Rpb24oc3RvcmVOYW1lLCAncmVhZG9ubHknKTtcbiAgICAgICAgICAgIGNvbnN0IHN4ID0gdHgub2JqZWN0U3RvcmUoc3RvcmVOYW1lKTtcblxuICAgICAgICAgICAgbGV0IHJlc3VsdHM6IGFueVtdID0gW107XG5cbiAgICAgICAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBrZXkubGVuZ3RoOyBpbmRleCsrKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgZWxlbWVudCA9IGtleVtpbmRleF07XG4gICAgICAgICAgICAgICAgcmVzdWx0cyA9IHJlc3VsdHMuY29uY2F0KGF3YWl0IHN4LmdldEFsbEtleXMoZWxlbWVudCkpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBhd2FpdCB0eC5jb21wbGV0ZTtcblxuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdHM7XG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICB0aHJvdyBgU3RvcmUgJHtzdG9yZU5hbWV9LCAke2Vycm9yLnRvU3RyaW5nKCl9YDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBxdWVyeSA9IGFzeW5jIChzdG9yZU5hbWU6IHN0cmluZywgZmlsdGVyOiBzdHJpbmcsIGNvdW50OiBudW1iZXIgPSAwLCBza2lwOiBudW1iZXIgPSAwKTogUHJvbWlzZTxhbnk+ID0+IHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGlmICghdGhpcy5kYkluc3RhbmNlKSB0aHJvdyBFX0RCX0NMT1NFRDtcblxuICAgICAgICAgICAgY29uc3QgdHggPSB0aGlzLmRiSW5zdGFuY2UudHJhbnNhY3Rpb24oc3RvcmVOYW1lLCAncmVhZG9ubHknKTtcblxuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICB2YXIgZnVuYyA9IG5ldyBGdW5jdGlvbignb2JqJywgZmlsdGVyKTtcbiAgICAgICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgYCR7ZXJyb3IudG9TdHJpbmcoKX0gaW4gZmlsdGVyIHsgJHtmaWx0ZXJ9IH1gXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHZhciByb3cgPSAwO1xuICAgICAgICAgICAgdmFyIGVycm9yTWVzc2FnZSA9IFwiXCI7XG5cbiAgICAgICAgICAgIGxldCByZXN1bHRzOiBhbnlbXSA9IFtdO1xuXG4gICAgICAgICAgICB0eC5vYmplY3RTdG9yZShzdG9yZU5hbWUpXG4gICAgICAgICAgICAgICAgLml0ZXJhdGVDdXJzb3IoY3Vyc29yID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFjdXJzb3IpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG91dCA9IGZ1bmMoY3Vyc29yLnZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChvdXQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByb3cgKys7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJvdyA+IHNraXApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0cy5wdXNoKG91dCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgZXJyb3JNZXNzYWdlID0gYG9iajogJHtKU09OLnN0cmluZ2lmeShjdXJzb3IudmFsdWUpfVxcbmZpbHRlcjogJHtmaWx0ZXJ9XFxuZXJyb3I6ICR7ZXJyb3IudG9TdHJpbmcoKX1gO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGlmIChjb3VudCA+IDAgJiYgcmVzdWx0cy5sZW5ndGggPj0gY291bnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBjdXJzb3IuY29udGludWUoKTtcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgYXdhaXQgdHguY29tcGxldGU7XG5cbiAgICAgICAgICAgIGlmIChlcnJvck1lc3NhZ2UpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBlcnJvck1lc3NhZ2U7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiByZXN1bHRzO1xuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgdGhyb3cgYFN0b3JlICR7c3RvcmVOYW1lfSAke2Vycm9yLnRvU3RyaW5nKCl9YDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIElEQkluZGV4IGZ1bmN0aW9uc1xuICAgIHB1YmxpYyBjb3VudEZyb21JbmRleCA9IGFzeW5jIChzdG9yZU5hbWU6IHN0cmluZywgaW5kZXhOYW1lOiBzdHJpbmcsIGtleT86IGFueSk6IFByb21pc2U8bnVtYmVyPiA9PiB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBpZiAoIXRoaXMuZGJJbnN0YW5jZSkgdGhyb3cgRV9EQl9DTE9TRUQ7XG5cbiAgICAgICAgICAgIGNvbnN0IHR4ID0gdGhpcy5kYkluc3RhbmNlLnRyYW5zYWN0aW9uKHN0b3JlTmFtZSwgJ3JlYWRvbmx5Jyk7XG5cbiAgICAgICAgICAgIGxldCByZXN1bHQgPSBhd2FpdCB0eC5vYmplY3RTdG9yZShzdG9yZU5hbWUpLmluZGV4KGluZGV4TmFtZSkuY291bnQoa2V5ID8/IHVuZGVmaW5lZCk7XG5cbiAgICAgICAgICAgIGF3YWl0IHR4LmNvbXBsZXRlO1xuXG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgdGhyb3cgYFN0b3JlICR7c3RvcmVOYW1lfSwgSW5kZXggJHtpbmRleE5hbWV9LCAke2Vycm9yLnRvU3RyaW5nKCl9YDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBjb3VudEZyb21JbmRleEJ5S2V5UmFuZ2UgPSBhc3luYyAoc3RvcmVOYW1lOiBzdHJpbmcsIGluZGV4TmFtZTogc3RyaW5nLCBsb3dlcjogYW55LCB1cHBlcjogYW55LCBsb3dlck9wZW46IGJvb2xlYW4sIHVwcGVyT3BlbjogYm9vbGVhbik6IFByb21pc2U8bnVtYmVyPiA9PiB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICByZXR1cm4gYXdhaXQgdGhpcy5jb3VudEZyb21JbmRleChzdG9yZU5hbWUsIGluZGV4TmFtZSwgSURCS2V5UmFuZ2UuYm91bmQobG93ZXIsIHVwcGVyLCBsb3dlck9wZW4sIHVwcGVyT3BlbikpO1xuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgdGhyb3cgYFN0b3JlICR7c3RvcmVOYW1lfSwgSW5kZXggJHtpbmRleE5hbWV9LCAke2Vycm9yLnRvU3RyaW5nKCl9YDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBnZXRGcm9tSW5kZXggPSBhc3luYyAoc3RvcmVOYW1lOiBzdHJpbmcsIGluZGV4TmFtZTogc3RyaW5nLCBrZXk6IGFueSk6IFByb21pc2U8YW55PiA9PiB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBpZiAoIXRoaXMuZGJJbnN0YW5jZSkgdGhyb3cgRV9EQl9DTE9TRUQ7XG5cbiAgICAgICAgICAgIGNvbnN0IHR4ID0gdGhpcy5kYkluc3RhbmNlLnRyYW5zYWN0aW9uKHN0b3JlTmFtZSwgJ3JlYWRvbmx5Jyk7XG5cbiAgICAgICAgICAgIGNvbnN0IHJlc3VsdHMgPSBhd2FpdCB0eC5vYmplY3RTdG9yZShzdG9yZU5hbWUpLmluZGV4KGluZGV4TmFtZSkuZ2V0KGtleSk7XG5cbiAgICAgICAgICAgIGF3YWl0IHR4LmNvbXBsZXRlO1xuXG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0cztcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgIHRocm93IGBTdG9yZSAke3N0b3JlTmFtZX0sIEluZGV4ICR7aW5kZXhOYW1lfSwgJHtlcnJvci50b1N0cmluZygpfWA7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0QWxsRnJvbUluZGV4ID0gYXN5bmMgKHN0b3JlTmFtZTogc3RyaW5nLCBpbmRleE5hbWU6IHN0cmluZywga2V5PzogYW55LCBjb3VudD86IG51bWJlcik6IFByb21pc2U8YW55PiA9PiB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBpZiAoIXRoaXMuZGJJbnN0YW5jZSkgdGhyb3cgRV9EQl9DTE9TRUQ7XG5cbiAgICAgICAgICAgIGNvbnN0IHR4ID0gdGhpcy5kYkluc3RhbmNlLnRyYW5zYWN0aW9uKHN0b3JlTmFtZSwgJ3JlYWRvbmx5Jyk7XG5cbiAgICAgICAgICAgIGNvbnN0IHJlc3VsdHMgPSBhd2FpdCB0eC5vYmplY3RTdG9yZShzdG9yZU5hbWUpLmluZGV4KGluZGV4TmFtZSkuZ2V0QWxsKGtleSA/PyB1bmRlZmluZWQsIGNvdW50ID8/IHVuZGVmaW5lZCk7XG5cbiAgICAgICAgICAgIGF3YWl0IHR4LmNvbXBsZXRlO1xuXG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0cztcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgIHRocm93IGBTdG9yZSAke3N0b3JlTmFtZX0sIEluZGV4ICR7aW5kZXhOYW1lfSwgJHtlcnJvci50b1N0cmluZygpfWA7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0QWxsRnJvbUluZGV4QnlLZXlSYW5nZSA9IGFzeW5jIChzdG9yZU5hbWU6IHN0cmluZywgaW5kZXhOYW1lOiBzdHJpbmcsIGxvd2VyOiBhbnksIHVwcGVyOiBhbnksIGxvd2VyT3BlbjogYm9vbGVhbiwgdXBwZXJPcGVuOiBib29sZWFuLCBjb3VudD86IG51bWJlcik6IFByb21pc2U8YW55PiA9PiB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBpZiAoIXRoaXMuZGJJbnN0YW5jZSkgdGhyb3cgRV9EQl9DTE9TRUQ7XG5cbiAgICAgICAgICAgIHJldHVybiBhd2FpdCB0aGlzLmdldEFsbEZyb21JbmRleChzdG9yZU5hbWUsIGluZGV4TmFtZSwgSURCS2V5UmFuZ2UuYm91bmQobG93ZXIsIHVwcGVyLCBsb3dlck9wZW4sIHVwcGVyT3BlbiksIGNvdW50KTtcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgIHRocm93IGBTdG9yZSAke3N0b3JlTmFtZX0sIEluZGV4ICR7aW5kZXhOYW1lfSwgJHtlcnJvci50b1N0cmluZygpfWA7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0QWxsRnJvbUluZGV4QnlBcnJheUtleSA9IGFzeW5jIChzdG9yZU5hbWU6IHN0cmluZywgaW5kZXhOYW1lOiBzdHJpbmcsIGtleTogYW55W10pOiBQcm9taXNlPGFueT4gPT4ge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgaWYgKCF0aGlzLmRiSW5zdGFuY2UpIHRocm93IEVfREJfQ0xPU0VEO1xuXG4gICAgICAgICAgICBjb25zdCB0eCA9IHRoaXMuZGJJbnN0YW5jZS50cmFuc2FjdGlvbihzdG9yZU5hbWUsICdyZWFkb25seScpO1xuICAgICAgICAgICAgY29uc3QgZHggPSB0eC5vYmplY3RTdG9yZShzdG9yZU5hbWUpLmluZGV4KGluZGV4TmFtZSk7XG5cbiAgICAgICAgICAgIGxldCByZXN1bHRzOiBhbnlbXSA9IFtdO1xuXG4gICAgICAgICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwga2V5Lmxlbmd0aDsgaW5kZXgrKykge1xuICAgICAgICAgICAgICAgIGNvbnN0IGVsZW1lbnQgPSBrZXlbaW5kZXhdO1xuICAgICAgICAgICAgICAgIHJlc3VsdHMgPSByZXN1bHRzLmNvbmNhdChhd2FpdCBkeC5nZXRBbGwoZWxlbWVudCkpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBhd2FpdCB0eC5jb21wbGV0ZTtcblxuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdHM7XG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICB0aHJvdyBgU3RvcmUgJHtzdG9yZU5hbWV9LCBJbmRleCAke2luZGV4TmFtZX0sICR7ZXJyb3IudG9TdHJpbmcoKX1gO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIGdldEtleUZyb21JbmRleCA9IGFzeW5jIChzdG9yZU5hbWU6IHN0cmluZywgaW5kZXhOYW1lOiBzdHJpbmcsIGtleTogYW55KTogUHJvbWlzZTxhbnk+ID0+IHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGlmICghdGhpcy5kYkluc3RhbmNlKSB0aHJvdyBFX0RCX0NMT1NFRDtcblxuICAgICAgICAgICAgY29uc3QgdHggPSB0aGlzLmRiSW5zdGFuY2UudHJhbnNhY3Rpb24oc3RvcmVOYW1lLCAncmVhZG9ubHknKTtcblxuICAgICAgICAgICAgY29uc3QgcmVzdWx0cyA9IGF3YWl0IHR4Lm9iamVjdFN0b3JlKHN0b3JlTmFtZSkuaW5kZXgoaW5kZXhOYW1lKS5nZXRLZXkoa2V5KTtcblxuICAgICAgICAgICAgYXdhaXQgdHguY29tcGxldGU7XG5cbiAgICAgICAgICAgIHJldHVybiByZXN1bHRzO1xuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgdGhyb3cgYFN0b3JlICR7c3RvcmVOYW1lfSwgSW5kZXggJHtpbmRleE5hbWV9LCAke2Vycm9yLnRvU3RyaW5nKCl9YDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBnZXRBbGxLZXlzRnJvbUluZGV4ID0gYXN5bmMgKHN0b3JlTmFtZTogc3RyaW5nLCBpbmRleE5hbWU6IHN0cmluZywga2V5PzogYW55LCBjb3VudD86IG51bWJlcik6IFByb21pc2U8YW55PiA9PiB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBpZiAoIXRoaXMuZGJJbnN0YW5jZSkgdGhyb3cgRV9EQl9DTE9TRUQ7XG5cbiAgICAgICAgICAgIGNvbnN0IHR4ID0gdGhpcy5kYkluc3RhbmNlLnRyYW5zYWN0aW9uKHN0b3JlTmFtZSwgJ3JlYWRvbmx5Jyk7XG5cbiAgICAgICAgICAgIGNvbnN0IHJlc3VsdHMgPSBhd2FpdCB0eC5vYmplY3RTdG9yZShzdG9yZU5hbWUpLmluZGV4KGluZGV4TmFtZSkuZ2V0QWxsS2V5cyhrZXkgPz8gdW5kZWZpbmVkLCBjb3VudCA/PyB1bmRlZmluZWQpO1xuXG4gICAgICAgICAgICBhd2FpdCB0eC5jb21wbGV0ZTtcblxuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdHM7XG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICB0aHJvdyBgU3RvcmUgJHtzdG9yZU5hbWV9LCBJbmRleCAke2luZGV4TmFtZX0sICR7ZXJyb3IudG9TdHJpbmcoKX1gO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIGdldEFsbEtleXNGcm9tSW5kZXhCeUtleVJhbmdlID0gYXN5bmMgKHN0b3JlTmFtZTogc3RyaW5nLCBpbmRleE5hbWU6IHN0cmluZywgbG93ZXI6IGFueSwgdXBwZXI6IGFueSwgbG93ZXJPcGVuOiBib29sZWFuLCB1cHBlck9wZW46IGJvb2xlYW4sIGNvdW50PzogbnVtYmVyKTogUHJvbWlzZTxhbnk+ID0+IHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGlmICghdGhpcy5kYkluc3RhbmNlKSB0aHJvdyBFX0RCX0NMT1NFRDtcblxuICAgICAgICAgICAgcmV0dXJuIGF3YWl0IHRoaXMuZ2V0QWxsS2V5c0Zyb21JbmRleChzdG9yZU5hbWUsIGluZGV4TmFtZSwgSURCS2V5UmFuZ2UuYm91bmQobG93ZXIsIHVwcGVyLCBsb3dlck9wZW4sIHVwcGVyT3BlbiksIGNvdW50KTtcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgIHRocm93IGBTdG9yZSAke3N0b3JlTmFtZX0sIEluZGV4ICR7aW5kZXhOYW1lfSwgJHtlcnJvci50b1N0cmluZygpfWA7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0QWxsS2V5c0Zyb21JbmRleEJ5QXJyYXlLZXkgPSBhc3luYyAoc3RvcmVOYW1lOiBzdHJpbmcsIGluZGV4TmFtZTogc3RyaW5nLCBrZXk6IGFueVtdKTogUHJvbWlzZTxhbnk+ID0+IHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGlmICghdGhpcy5kYkluc3RhbmNlKSB0aHJvdyBFX0RCX0NMT1NFRDtcblxuICAgICAgICAgICAgY29uc3QgdHggPSB0aGlzLmRiSW5zdGFuY2UudHJhbnNhY3Rpb24oc3RvcmVOYW1lLCAncmVhZG9ubHknKTtcbiAgICAgICAgICAgIGNvbnN0IGR4ID0gdHgub2JqZWN0U3RvcmUoc3RvcmVOYW1lKS5pbmRleChpbmRleE5hbWUpO1xuXG4gICAgICAgICAgICBsZXQgcmVzdWx0czogYW55W10gPSBbXTtcblxuICAgICAgICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IGtleS5sZW5ndGg7IGluZGV4KyspIHtcbiAgICAgICAgICAgICAgICBjb25zdCBlbGVtZW50ID0ga2V5W2luZGV4XTtcbiAgICAgICAgICAgICAgICByZXN1bHRzID0gcmVzdWx0cy5jb25jYXQoYXdhaXQgZHguZ2V0QWxsS2V5cyhlbGVtZW50KSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGF3YWl0IHR4LmNvbXBsZXRlO1xuXG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0cztcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgIHRocm93IGBTdG9yZSAke3N0b3JlTmFtZX0sIEluZGV4ICR7aW5kZXhOYW1lfSwgJHtlcnJvci50b1N0cmluZygpfWA7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgcXVlcnlGcm9tSW5kZXggPSBhc3luYyAoc3RvcmVOYW1lOiBzdHJpbmcsIGluZGV4TmFtZTogc3RyaW5nLCBmaWx0ZXI6IHN0cmluZywgY291bnQ6IG51bWJlciA9IDAsIHNraXA6IG51bWJlciA9IDApOiBQcm9taXNlPGFueT4gPT4ge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgaWYgKCF0aGlzLmRiSW5zdGFuY2UpIHRocm93IEVfREJfQ0xPU0VEO1xuXG4gICAgICAgICAgICBjb25zdCB0eCA9IHRoaXMuZGJJbnN0YW5jZS50cmFuc2FjdGlvbihzdG9yZU5hbWUsICdyZWFkb25seScpO1xuXG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIHZhciBmdW5jID0gbmV3IEZ1bmN0aW9uKCdvYmonLCBmaWx0ZXIpO1xuICAgICAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBgJHtlcnJvci50b1N0cmluZygpfSBpbiBmaWx0ZXIgeyAke2ZpbHRlcn0gfWBcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdmFyIHJvdyA9IDA7XG4gICAgICAgICAgICB2YXIgZXJyb3JNZXNzYWdlID0gXCJcIjtcblxuICAgICAgICAgICAgbGV0IHJlc3VsdHM6IGFueVtdID0gW107XG5cbiAgICAgICAgICAgIHR4Lm9iamVjdFN0b3JlKHN0b3JlTmFtZSlcbiAgICAgICAgICAgICAgICAuaW5kZXgoaW5kZXhOYW1lKVxuICAgICAgICAgICAgICAgIC5pdGVyYXRlQ3Vyc29yKGN1cnNvciA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmICghY3Vyc29yKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBvdXQgPSBmdW5jKGN1cnNvci52YWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAob3V0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcm93ICsrO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyb3cgPiBza2lwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdHMucHVzaChvdXQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGVycm9yTWVzc2FnZSA9IGBvYmo6ICR7SlNPTi5zdHJpbmdpZnkoY3Vyc29yLnZhbHVlKX1cXG5maWx0ZXI6ICR7ZmlsdGVyfVxcbmVycm9yOiAke2Vycm9yLnRvU3RyaW5nKCl9YDtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpZiAoY291bnQgPiAwICYmIHJlc3VsdHMubGVuZ3RoID49IGNvdW50KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgY3Vyc29yLmNvbnRpbnVlKCk7XG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGF3YWl0IHR4LmNvbXBsZXRlO1xuXG4gICAgICAgICAgICBpZiAoZXJyb3JNZXNzYWdlKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgZXJyb3JNZXNzYWdlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0cztcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgIHRocm93IGBTdG9yZSAke3N0b3JlTmFtZX0sIEluZGV4ICR7aW5kZXhOYW1lfSwgJHtlcnJvci50b1N0cmluZygpfWA7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgYWRkID0gYXN5bmMgKHN0b3JlTmFtZTogc3RyaW5nLCBkYXRhOiBhbnksIGtleT86IGFueSk6IFByb21pc2U8c3RyaW5nPiA9PiB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBpZiAoIXRoaXMuZGJJbnN0YW5jZSkgdGhyb3cgRV9EQl9DTE9TRUQ7XG5cbiAgICAgICAgICAgIGNvbnN0IHR4ID0gdGhpcy5kYkluc3RhbmNlLnRyYW5zYWN0aW9uKHN0b3JlTmFtZSwgJ3JlYWR3cml0ZScpO1xuICAgICAgICAgICAgY29uc3Qgb2JqZWN0U3RvcmUgPSB0eC5vYmplY3RTdG9yZShzdG9yZU5hbWUpO1xuXG4gICAgICAgICAgICBkYXRhID0gdGhpcy5jaGVja0ZvcktleVBhdGgob2JqZWN0U3RvcmUsIGRhdGEpO1xuXG4gICAgICAgICAgICBjb25zdCByZXN1bHQgPSBhd2FpdCBvYmplY3RTdG9yZS5hZGQoZGF0YSwga2V5ID8/IHVuZGVmaW5lZCk7XG5cbiAgICAgICAgICAgIGF3YWl0IHR4LmNvbXBsZXRlO1xuXG4gICAgICAgICAgICByZXR1cm4gYEFkZGVkIG5ldyByZWNvcmQgd2l0aCBpZCAke3Jlc3VsdH1gO1xuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgdGhyb3cgYFN0b3JlICR7c3RvcmVOYW1lfSwgJHtlcnJvci50b1N0cmluZygpfWA7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgcHV0ID0gYXN5bmMgKHN0b3JlTmFtZTogc3RyaW5nLCBkYXRhOiBhbnksIGtleT86IGFueSk6IFByb21pc2U8c3RyaW5nPiA9PiB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBpZiAoIXRoaXMuZGJJbnN0YW5jZSkgdGhyb3cgRV9EQl9DTE9TRUQ7XG5cbiAgICAgICAgICAgIGNvbnN0IHR4ID0gdGhpcy5kYkluc3RhbmNlLnRyYW5zYWN0aW9uKHN0b3JlTmFtZSwgJ3JlYWR3cml0ZScpO1xuXG4gICAgICAgICAgICBjb25zdCByZXN1bHQgPSBhd2FpdCB0eC5vYmplY3RTdG9yZShzdG9yZU5hbWUpLnB1dChkYXRhLCBrZXkgPz8gdW5kZWZpbmVkKTtcblxuICAgICAgICAgICAgYXdhaXQgdHguY29tcGxldGU7XG5cbiAgICAgICAgICAgIHJldHVybiBgdXBkYXRlZCByZWNvcmQgd2l0aCBpZCAke3Jlc3VsdH1gO1xuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgdGhyb3cgYFN0b3JlICR7c3RvcmVOYW1lfSwgJHtlcnJvci50b1N0cmluZygpfWA7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgZGVsZXRlID0gYXN5bmMgKHN0b3JlTmFtZTogc3RyaW5nLCBpZDogYW55KTogUHJvbWlzZTxzdHJpbmc+ID0+IHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGlmICghdGhpcy5kYkluc3RhbmNlKSB0aHJvdyBFX0RCX0NMT1NFRDtcblxuICAgICAgICAgICAgY29uc3QgdHggPSB0aGlzLmRiSW5zdGFuY2UudHJhbnNhY3Rpb24oc3RvcmVOYW1lLCAncmVhZHdyaXRlJyk7XG5cbiAgICAgICAgICAgIGF3YWl0IHR4Lm9iamVjdFN0b3JlKHN0b3JlTmFtZSkuZGVsZXRlKGlkKTtcblxuICAgICAgICAgICAgYXdhaXQgdHguY29tcGxldGU7XG5cbiAgICAgICAgICAgIHJldHVybiBgUmVjb3JkIHdpdGggaWQ6ICR7aWR9IGRlbGV0ZWRgO1xuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgdGhyb3cgYFN0b3JlICR7c3RvcmVOYW1lfSwgJHtlcnJvci50b1N0cmluZygpfWA7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgYmF0Y2hBZGQgPSBhc3luYyAoc3RvcmVOYW1lOiBzdHJpbmcsIGRhdGE6IGFueVtdKTogUHJvbWlzZTxzdHJpbmc+ID0+IHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGlmICghdGhpcy5kYkluc3RhbmNlKSB0aHJvdyBFX0RCX0NMT1NFRDtcblxuICAgICAgICAgICAgY29uc3QgdHggPSB0aGlzLmRiSW5zdGFuY2UudHJhbnNhY3Rpb24oc3RvcmVOYW1lLCAncmVhZHdyaXRlJyk7XG4gICAgICAgICAgICBjb25zdCBvYmplY3RTdG9yZSA9IHR4Lm9iamVjdFN0b3JlKHN0b3JlTmFtZSk7XG5cbiAgICAgICAgICAgIGRhdGEuZm9yRWFjaChhc3luYyBlbGVtZW50ID0+IHtcbiAgICAgICAgICAgICAgICBsZXQgaXRlbSA9IHRoaXMuY2hlY2tGb3JLZXlQYXRoKG9iamVjdFN0b3JlLCBlbGVtZW50KTtcbiAgICAgICAgICAgICAgICBhd2FpdCBvYmplY3RTdG9yZS5hZGQoaXRlbSk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgYXdhaXQgdHguY29tcGxldGU7XG5cbiAgICAgICAgICAgIHJldHVybiBgQWRkZWQgJHtkYXRhLmxlbmd0aH0gcmVjb3Jkc2A7XG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICB0aHJvdyBgU3RvcmUgJHtzdG9yZU5hbWV9LCAke2Vycm9yLnRvU3RyaW5nKCl9YDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBiYXRjaFB1dCA9IGFzeW5jIChzdG9yZU5hbWU6IHN0cmluZywgZGF0YTogYW55W10pOiBQcm9taXNlPHN0cmluZz4gPT4ge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgaWYgKCF0aGlzLmRiSW5zdGFuY2UpIHRocm93IEVfREJfQ0xPU0VEO1xuXG4gICAgICAgICAgICBjb25zdCB0eCA9IHRoaXMuZGJJbnN0YW5jZS50cmFuc2FjdGlvbihzdG9yZU5hbWUsICdyZWFkd3JpdGUnKTtcblxuICAgICAgICAgICAgZGF0YS5mb3JFYWNoKGFzeW5jIGVsZW1lbnQgPT4ge1xuICAgICAgICAgICAgICAgIGF3YWl0IHR4Lm9iamVjdFN0b3JlKHN0b3JlTmFtZSkucHV0KGVsZW1lbnQpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGF3YWl0IHR4LmNvbXBsZXRlO1xuXG4gICAgICAgICAgICByZXR1cm4gYHVwZGF0ZWQgJHtkYXRhLmxlbmd0aH0gcmVjb3Jkc2A7XG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICB0aHJvdyBgU3RvcmUgJHtzdG9yZU5hbWV9LCAke2Vycm9yLnRvU3RyaW5nKCl9YDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBiYXRjaERlbGV0ZSA9IGFzeW5jIChzdG9yZU5hbWU6IHN0cmluZywgaWRzOiBhbnlbXSk6IFByb21pc2U8c3RyaW5nPiA9PiB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBpZiAoIXRoaXMuZGJJbnN0YW5jZSkgdGhyb3cgRV9EQl9DTE9TRUQ7XG5cbiAgICAgICAgICAgIGNvbnN0IHR4ID0gdGhpcy5kYkluc3RhbmNlLnRyYW5zYWN0aW9uKHN0b3JlTmFtZSwgJ3JlYWR3cml0ZScpO1xuXG4gICAgICAgICAgICBpZHMuZm9yRWFjaChhc3luYyBlbGVtZW50ID0+IHtcbiAgICAgICAgICAgICAgICBhd2FpdCB0eC5vYmplY3RTdG9yZShzdG9yZU5hbWUpLmRlbGV0ZShlbGVtZW50KTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBhd2FpdCB0eC5jb21wbGV0ZTtcblxuICAgICAgICAgICAgcmV0dXJuIGBEZWxldGVkICR7aWRzLmxlbmd0aH0gcmVjb3Jkc2A7XG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICB0aHJvdyBgU3RvcmUgJHtzdG9yZU5hbWV9LCAke2Vycm9yLnRvU3RyaW5nKCl9YDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBjbGVhclN0b3JlID0gYXN5bmMgKHN0b3JlTmFtZTogc3RyaW5nKTogUHJvbWlzZTxzdHJpbmc+ID0+IHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGlmICghdGhpcy5kYkluc3RhbmNlKSB0aHJvdyBFX0RCX0NMT1NFRDtcblxuICAgICAgICAgICAgY29uc3QgdHggPSB0aGlzLmRiSW5zdGFuY2UudHJhbnNhY3Rpb24oc3RvcmVOYW1lLCAncmVhZHdyaXRlJyk7XG5cbiAgICAgICAgICAgIGF3YWl0IHR4Lm9iamVjdFN0b3JlKHN0b3JlTmFtZSkuY2xlYXIoKTtcblxuICAgICAgICAgICAgYXdhaXQgdHguY29tcGxldGU7XG5cbiAgICAgICAgICAgIHJldHVybiBgU3RvcmUgJHtzdG9yZU5hbWV9IGNsZWFyZWRgO1xuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgdGhyb3cgYFN0b3JlICR7c3RvcmVOYW1lfSwgJHtlcnJvci50b1N0cmluZygpfWA7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIGNoZWNrRm9yS2V5UGF0aChvYmplY3RTdG9yZTogT2JqZWN0U3RvcmU8YW55LCBhbnk+LCBkYXRhOiBhbnkpIHtcbiAgICAgICAgaWYgKCFvYmplY3RTdG9yZS5hdXRvSW5jcmVtZW50IHx8ICFvYmplY3RTdG9yZS5rZXlQYXRoKSB7XG4gICAgICAgICAgICByZXR1cm4gZGF0YTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0eXBlb2Ygb2JqZWN0U3RvcmUua2V5UGF0aCAhPT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgIHJldHVybiBkYXRhO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3Qga2V5UGF0aCA9IG9iamVjdFN0b3JlLmtleVBhdGggYXMgc3RyaW5nO1xuXG4gICAgICAgIGlmICghZGF0YVtrZXlQYXRoXSkge1xuICAgICAgICAgICAgZGVsZXRlIGRhdGFba2V5UGF0aF07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGRhdGE7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSB1cGdyYWRlRGF0YWJhc2UodXBncmFkZURCOiBVcGdyYWRlREIsIGRiRGF0YWJhc2U6IElEYXRhYmFzZSkge1xuICAgICAgICBpZiAodXBncmFkZURCLm9sZFZlcnNpb24gPCBkYkRhdGFiYXNlLnZlcnNpb24pIHtcbiAgICAgICAgICAgIGlmIChkYkRhdGFiYXNlLm9iamVjdFN0b3Jlcykge1xuICAgICAgICAgICAgICAgIGZvciAodmFyIHN0b3JlIG9mIGRiRGF0YWJhc2Uub2JqZWN0U3RvcmVzKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICghdXBncmFkZURCLm9iamVjdFN0b3JlTmFtZXMuY29udGFpbnMoc3RvcmUubmFtZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYWRkTmV3U3RvcmUodXBncmFkZURCLCBzdG9yZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIGdldEtleVBhdGgoa2V5UGF0aD86IHN0cmluZyk6IHN0cmluZyB8IHN0cmluZ1tdIHwgdW5kZWZpbmVkIHtcbiAgICAgICAgaWYgKGtleVBhdGgpIHtcbiAgICAgICAgICAgIHZhciBtdWx0aUtleVBhdGggPSBrZXlQYXRoLnNwbGl0KCcsJyk7XG4gICAgICAgICAgICByZXR1cm4gbXVsdGlLZXlQYXRoLmxlbmd0aCA+IDEgPyBtdWx0aUtleVBhdGggOiBrZXlQYXRoO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgYWRkTmV3U3RvcmUodXBncmFkZURCOiBVcGdyYWRlREIsIHN0b3JlOiBJT2JqZWN0U3RvcmUpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGxldCBwcmltYXJ5S2V5ID0gc3RvcmUucHJpbWFyeUtleTtcblxuICAgICAgICAgICAgaWYgKCFwcmltYXJ5S2V5KSB7XG4gICAgICAgICAgICAgICAgcHJpbWFyeUtleSA9IHsgbmFtZTogJ2lkJywga2V5UGF0aDogJ2lkJywgbXVsdGlFbnRyeTogZmFsc2UsIHVuaXF1ZTogZmFsc2UsIGF1dG9JbmNyZW1lbnQ6IHRydWUgfTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY29uc3QgbmV3U3RvcmUgPSB1cGdyYWRlREIuY3JlYXRlT2JqZWN0U3RvcmUoc3RvcmUubmFtZSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGtleVBhdGg6IHRoaXMuZ2V0S2V5UGF0aChwcmltYXJ5S2V5LmtleVBhdGgpLFxuICAgICAgICAgICAgICAgICAgICBhdXRvSW5jcmVtZW50OiBwcmltYXJ5S2V5LmF1dG9JbmNyZW1lbnRcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICApO1xuXG4gICAgICAgICAgICBmb3IgKHZhciBpbmRleCBvZiBzdG9yZS5pbmRleGVzKSB7XG4gICAgICAgICAgICAgICAgdHJ5IHtcblxuICAgICAgICAgICAgICAgICAgICBuZXdTdG9yZS5jcmVhdGVJbmRleChpbmRleC5uYW1lLFxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5nZXRLZXlQYXRoKGluZGV4LmtleVBhdGgpID8/IGluZGV4Lm5hbWUsXG4gICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbXVsdGlFbnRyeTogaW5kZXgubXVsdGlFbnRyeSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB1bmlxdWU6IGluZGV4LnVuaXF1ZVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgICAgIHRocm93IGBpbmRleCAke2luZGV4Lm5hbWV9LCAke2Vycm9yLnRvU3RyaW5nKCl9YDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICB0aHJvdyBgc3RvcmUgJHtzdG9yZS5uYW1lfSwgJHtlcnJvci50b1N0cmluZygpfWA7XG4gICAgICAgIH1cbiAgICB9XG59IiwiKGZ1bmN0aW9uIChnbG9iYWwsIGZhY3RvcnkpIHtcbiAgdHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgIT09ICd1bmRlZmluZWQnID8gZmFjdG9yeShleHBvcnRzKSA6XG4gIHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCA/IGRlZmluZShbJ2V4cG9ydHMnXSwgZmFjdG9yeSkgOlxuICAoZ2xvYmFsID0gZ2xvYmFsIHx8IHNlbGYsIGZhY3RvcnkoZ2xvYmFsLmlkYiA9IHt9KSk7XG59KHRoaXMsIGZ1bmN0aW9uIChleHBvcnRzKSB7ICd1c2Ugc3RyaWN0JztcblxuICBmdW5jdGlvbiB0b0FycmF5KGFycikge1xuICAgIHJldHVybiBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcnIpO1xuICB9XG5cbiAgZnVuY3Rpb24gcHJvbWlzaWZ5UmVxdWVzdChyZXF1ZXN0KSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgcmVxdWVzdC5vbnN1Y2Nlc3MgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgcmVzb2x2ZShyZXF1ZXN0LnJlc3VsdCk7XG4gICAgICB9O1xuXG4gICAgICByZXF1ZXN0Lm9uZXJyb3IgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgcmVqZWN0KHJlcXVlc3QuZXJyb3IpO1xuICAgICAgfTtcbiAgICB9KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHByb21pc2lmeVJlcXVlc3RDYWxsKG9iaiwgbWV0aG9kLCBhcmdzKSB7XG4gICAgdmFyIHJlcXVlc3Q7XG4gICAgdmFyIHAgPSBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgIHJlcXVlc3QgPSBvYmpbbWV0aG9kXS5hcHBseShvYmosIGFyZ3MpO1xuICAgICAgcHJvbWlzaWZ5UmVxdWVzdChyZXF1ZXN0KS50aGVuKHJlc29sdmUsIHJlamVjdCk7XG4gICAgfSk7XG5cbiAgICBwLnJlcXVlc3QgPSByZXF1ZXN0O1xuICAgIHJldHVybiBwO1xuICB9XG5cbiAgZnVuY3Rpb24gcHJvbWlzaWZ5Q3Vyc29yUmVxdWVzdENhbGwob2JqLCBtZXRob2QsIGFyZ3MpIHtcbiAgICB2YXIgcCA9IHByb21pc2lmeVJlcXVlc3RDYWxsKG9iaiwgbWV0aG9kLCBhcmdzKTtcbiAgICByZXR1cm4gcC50aGVuKGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICBpZiAoIXZhbHVlKSByZXR1cm47XG4gICAgICByZXR1cm4gbmV3IEN1cnNvcih2YWx1ZSwgcC5yZXF1ZXN0KTtcbiAgICB9KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHByb3h5UHJvcGVydGllcyhQcm94eUNsYXNzLCB0YXJnZXRQcm9wLCBwcm9wZXJ0aWVzKSB7XG4gICAgcHJvcGVydGllcy5mb3JFYWNoKGZ1bmN0aW9uKHByb3ApIHtcbiAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShQcm94eUNsYXNzLnByb3RvdHlwZSwgcHJvcCwge1xuICAgICAgICBnZXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHJldHVybiB0aGlzW3RhcmdldFByb3BdW3Byb3BdO1xuICAgICAgICB9LFxuICAgICAgICBzZXQ6IGZ1bmN0aW9uKHZhbCkge1xuICAgICAgICAgIHRoaXNbdGFyZ2V0UHJvcF1bcHJvcF0gPSB2YWw7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgZnVuY3Rpb24gcHJveHlSZXF1ZXN0TWV0aG9kcyhQcm94eUNsYXNzLCB0YXJnZXRQcm9wLCBDb25zdHJ1Y3RvciwgcHJvcGVydGllcykge1xuICAgIHByb3BlcnRpZXMuZm9yRWFjaChmdW5jdGlvbihwcm9wKSB7XG4gICAgICBpZiAoIShwcm9wIGluIENvbnN0cnVjdG9yLnByb3RvdHlwZSkpIHJldHVybjtcbiAgICAgIFByb3h5Q2xhc3MucHJvdG90eXBlW3Byb3BdID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiBwcm9taXNpZnlSZXF1ZXN0Q2FsbCh0aGlzW3RhcmdldFByb3BdLCBwcm9wLCBhcmd1bWVudHMpO1xuICAgICAgfTtcbiAgICB9KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHByb3h5TWV0aG9kcyhQcm94eUNsYXNzLCB0YXJnZXRQcm9wLCBDb25zdHJ1Y3RvciwgcHJvcGVydGllcykge1xuICAgIHByb3BlcnRpZXMuZm9yRWFjaChmdW5jdGlvbihwcm9wKSB7XG4gICAgICBpZiAoIShwcm9wIGluIENvbnN0cnVjdG9yLnByb3RvdHlwZSkpIHJldHVybjtcbiAgICAgIFByb3h5Q2xhc3MucHJvdG90eXBlW3Byb3BdID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiB0aGlzW3RhcmdldFByb3BdW3Byb3BdLmFwcGx5KHRoaXNbdGFyZ2V0UHJvcF0sIGFyZ3VtZW50cyk7XG4gICAgICB9O1xuICAgIH0pO1xuICB9XG5cbiAgZnVuY3Rpb24gcHJveHlDdXJzb3JSZXF1ZXN0TWV0aG9kcyhQcm94eUNsYXNzLCB0YXJnZXRQcm9wLCBDb25zdHJ1Y3RvciwgcHJvcGVydGllcykge1xuICAgIHByb3BlcnRpZXMuZm9yRWFjaChmdW5jdGlvbihwcm9wKSB7XG4gICAgICBpZiAoIShwcm9wIGluIENvbnN0cnVjdG9yLnByb3RvdHlwZSkpIHJldHVybjtcbiAgICAgIFByb3h5Q2xhc3MucHJvdG90eXBlW3Byb3BdID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiBwcm9taXNpZnlDdXJzb3JSZXF1ZXN0Q2FsbCh0aGlzW3RhcmdldFByb3BdLCBwcm9wLCBhcmd1bWVudHMpO1xuICAgICAgfTtcbiAgICB9KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIEluZGV4KGluZGV4KSB7XG4gICAgdGhpcy5faW5kZXggPSBpbmRleDtcbiAgfVxuXG4gIHByb3h5UHJvcGVydGllcyhJbmRleCwgJ19pbmRleCcsIFtcbiAgICAnbmFtZScsXG4gICAgJ2tleVBhdGgnLFxuICAgICdtdWx0aUVudHJ5JyxcbiAgICAndW5pcXVlJ1xuICBdKTtcblxuICBwcm94eVJlcXVlc3RNZXRob2RzKEluZGV4LCAnX2luZGV4JywgSURCSW5kZXgsIFtcbiAgICAnZ2V0JyxcbiAgICAnZ2V0S2V5JyxcbiAgICAnZ2V0QWxsJyxcbiAgICAnZ2V0QWxsS2V5cycsXG4gICAgJ2NvdW50J1xuICBdKTtcblxuICBwcm94eUN1cnNvclJlcXVlc3RNZXRob2RzKEluZGV4LCAnX2luZGV4JywgSURCSW5kZXgsIFtcbiAgICAnb3BlbkN1cnNvcicsXG4gICAgJ29wZW5LZXlDdXJzb3InXG4gIF0pO1xuXG4gIGZ1bmN0aW9uIEN1cnNvcihjdXJzb3IsIHJlcXVlc3QpIHtcbiAgICB0aGlzLl9jdXJzb3IgPSBjdXJzb3I7XG4gICAgdGhpcy5fcmVxdWVzdCA9IHJlcXVlc3Q7XG4gIH1cblxuICBwcm94eVByb3BlcnRpZXMoQ3Vyc29yLCAnX2N1cnNvcicsIFtcbiAgICAnZGlyZWN0aW9uJyxcbiAgICAna2V5JyxcbiAgICAncHJpbWFyeUtleScsXG4gICAgJ3ZhbHVlJ1xuICBdKTtcblxuICBwcm94eVJlcXVlc3RNZXRob2RzKEN1cnNvciwgJ19jdXJzb3InLCBJREJDdXJzb3IsIFtcbiAgICAndXBkYXRlJyxcbiAgICAnZGVsZXRlJ1xuICBdKTtcblxuICAvLyBwcm94eSAnbmV4dCcgbWV0aG9kc1xuICBbJ2FkdmFuY2UnLCAnY29udGludWUnLCAnY29udGludWVQcmltYXJ5S2V5J10uZm9yRWFjaChmdW5jdGlvbihtZXRob2ROYW1lKSB7XG4gICAgaWYgKCEobWV0aG9kTmFtZSBpbiBJREJDdXJzb3IucHJvdG90eXBlKSkgcmV0dXJuO1xuICAgIEN1cnNvci5wcm90b3R5cGVbbWV0aG9kTmFtZV0gPSBmdW5jdGlvbigpIHtcbiAgICAgIHZhciBjdXJzb3IgPSB0aGlzO1xuICAgICAgdmFyIGFyZ3MgPSBhcmd1bWVudHM7XG4gICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCkudGhlbihmdW5jdGlvbigpIHtcbiAgICAgICAgY3Vyc29yLl9jdXJzb3JbbWV0aG9kTmFtZV0uYXBwbHkoY3Vyc29yLl9jdXJzb3IsIGFyZ3MpO1xuICAgICAgICByZXR1cm4gcHJvbWlzaWZ5UmVxdWVzdChjdXJzb3IuX3JlcXVlc3QpLnRoZW4oZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgICAgICBpZiAoIXZhbHVlKSByZXR1cm47XG4gICAgICAgICAgcmV0dXJuIG5ldyBDdXJzb3IodmFsdWUsIGN1cnNvci5fcmVxdWVzdCk7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfTtcbiAgfSk7XG5cbiAgZnVuY3Rpb24gT2JqZWN0U3RvcmUoc3RvcmUpIHtcbiAgICB0aGlzLl9zdG9yZSA9IHN0b3JlO1xuICB9XG5cbiAgT2JqZWN0U3RvcmUucHJvdG90eXBlLmNyZWF0ZUluZGV4ID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIG5ldyBJbmRleCh0aGlzLl9zdG9yZS5jcmVhdGVJbmRleC5hcHBseSh0aGlzLl9zdG9yZSwgYXJndW1lbnRzKSk7XG4gIH07XG5cbiAgT2JqZWN0U3RvcmUucHJvdG90eXBlLmluZGV4ID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIG5ldyBJbmRleCh0aGlzLl9zdG9yZS5pbmRleC5hcHBseSh0aGlzLl9zdG9yZSwgYXJndW1lbnRzKSk7XG4gIH07XG5cbiAgcHJveHlQcm9wZXJ0aWVzKE9iamVjdFN0b3JlLCAnX3N0b3JlJywgW1xuICAgICduYW1lJyxcbiAgICAna2V5UGF0aCcsXG4gICAgJ2luZGV4TmFtZXMnLFxuICAgICdhdXRvSW5jcmVtZW50J1xuICBdKTtcblxuICBwcm94eVJlcXVlc3RNZXRob2RzKE9iamVjdFN0b3JlLCAnX3N0b3JlJywgSURCT2JqZWN0U3RvcmUsIFtcbiAgICAncHV0JyxcbiAgICAnYWRkJyxcbiAgICAnZGVsZXRlJyxcbiAgICAnY2xlYXInLFxuICAgICdnZXQnLFxuICAgICdnZXRBbGwnLFxuICAgICdnZXRLZXknLFxuICAgICdnZXRBbGxLZXlzJyxcbiAgICAnY291bnQnXG4gIF0pO1xuXG4gIHByb3h5Q3Vyc29yUmVxdWVzdE1ldGhvZHMoT2JqZWN0U3RvcmUsICdfc3RvcmUnLCBJREJPYmplY3RTdG9yZSwgW1xuICAgICdvcGVuQ3Vyc29yJyxcbiAgICAnb3BlbktleUN1cnNvcidcbiAgXSk7XG5cbiAgcHJveHlNZXRob2RzKE9iamVjdFN0b3JlLCAnX3N0b3JlJywgSURCT2JqZWN0U3RvcmUsIFtcbiAgICAnZGVsZXRlSW5kZXgnXG4gIF0pO1xuXG4gIGZ1bmN0aW9uIFRyYW5zYWN0aW9uKGlkYlRyYW5zYWN0aW9uKSB7XG4gICAgdGhpcy5fdHggPSBpZGJUcmFuc2FjdGlvbjtcbiAgICB0aGlzLmNvbXBsZXRlID0gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICBpZGJUcmFuc2FjdGlvbi5vbmNvbXBsZXRlID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHJlc29sdmUoKTtcbiAgICAgIH07XG4gICAgICBpZGJUcmFuc2FjdGlvbi5vbmVycm9yID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHJlamVjdChpZGJUcmFuc2FjdGlvbi5lcnJvcik7XG4gICAgICB9O1xuICAgICAgaWRiVHJhbnNhY3Rpb24ub25hYm9ydCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICByZWplY3QoaWRiVHJhbnNhY3Rpb24uZXJyb3IpO1xuICAgICAgfTtcbiAgICB9KTtcbiAgfVxuXG4gIFRyYW5zYWN0aW9uLnByb3RvdHlwZS5vYmplY3RTdG9yZSA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiBuZXcgT2JqZWN0U3RvcmUodGhpcy5fdHgub2JqZWN0U3RvcmUuYXBwbHkodGhpcy5fdHgsIGFyZ3VtZW50cykpO1xuICB9O1xuXG4gIHByb3h5UHJvcGVydGllcyhUcmFuc2FjdGlvbiwgJ190eCcsIFtcbiAgICAnb2JqZWN0U3RvcmVOYW1lcycsXG4gICAgJ21vZGUnXG4gIF0pO1xuXG4gIHByb3h5TWV0aG9kcyhUcmFuc2FjdGlvbiwgJ190eCcsIElEQlRyYW5zYWN0aW9uLCBbXG4gICAgJ2Fib3J0J1xuICBdKTtcblxuICBmdW5jdGlvbiBVcGdyYWRlREIoZGIsIG9sZFZlcnNpb24sIHRyYW5zYWN0aW9uKSB7XG4gICAgdGhpcy5fZGIgPSBkYjtcbiAgICB0aGlzLm9sZFZlcnNpb24gPSBvbGRWZXJzaW9uO1xuICAgIHRoaXMudHJhbnNhY3Rpb24gPSBuZXcgVHJhbnNhY3Rpb24odHJhbnNhY3Rpb24pO1xuICB9XG5cbiAgVXBncmFkZURCLnByb3RvdHlwZS5jcmVhdGVPYmplY3RTdG9yZSA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiBuZXcgT2JqZWN0U3RvcmUodGhpcy5fZGIuY3JlYXRlT2JqZWN0U3RvcmUuYXBwbHkodGhpcy5fZGIsIGFyZ3VtZW50cykpO1xuICB9O1xuXG4gIHByb3h5UHJvcGVydGllcyhVcGdyYWRlREIsICdfZGInLCBbXG4gICAgJ25hbWUnLFxuICAgICd2ZXJzaW9uJyxcbiAgICAnb2JqZWN0U3RvcmVOYW1lcydcbiAgXSk7XG5cbiAgcHJveHlNZXRob2RzKFVwZ3JhZGVEQiwgJ19kYicsIElEQkRhdGFiYXNlLCBbXG4gICAgJ2RlbGV0ZU9iamVjdFN0b3JlJyxcbiAgICAnY2xvc2UnXG4gIF0pO1xuXG4gIGZ1bmN0aW9uIERCKGRiKSB7XG4gICAgdGhpcy5fZGIgPSBkYjtcbiAgfVxuXG4gIERCLnByb3RvdHlwZS50cmFuc2FjdGlvbiA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiBuZXcgVHJhbnNhY3Rpb24odGhpcy5fZGIudHJhbnNhY3Rpb24uYXBwbHkodGhpcy5fZGIsIGFyZ3VtZW50cykpO1xuICB9O1xuXG4gIHByb3h5UHJvcGVydGllcyhEQiwgJ19kYicsIFtcbiAgICAnbmFtZScsXG4gICAgJ3ZlcnNpb24nLFxuICAgICdvYmplY3RTdG9yZU5hbWVzJ1xuICBdKTtcblxuICBwcm94eU1ldGhvZHMoREIsICdfZGInLCBJREJEYXRhYmFzZSwgW1xuICAgICdjbG9zZSdcbiAgXSk7XG5cbiAgLy8gQWRkIGN1cnNvciBpdGVyYXRvcnNcbiAgLy8gVE9ETzogcmVtb3ZlIHRoaXMgb25jZSBicm93c2VycyBkbyB0aGUgcmlnaHQgdGhpbmcgd2l0aCBwcm9taXNlc1xuICBbJ29wZW5DdXJzb3InLCAnb3BlbktleUN1cnNvciddLmZvckVhY2goZnVuY3Rpb24oZnVuY05hbWUpIHtcbiAgICBbT2JqZWN0U3RvcmUsIEluZGV4XS5mb3JFYWNoKGZ1bmN0aW9uKENvbnN0cnVjdG9yKSB7XG4gICAgICAvLyBEb24ndCBjcmVhdGUgaXRlcmF0ZUtleUN1cnNvciBpZiBvcGVuS2V5Q3Vyc29yIGRvZXNuJ3QgZXhpc3QuXG4gICAgICBpZiAoIShmdW5jTmFtZSBpbiBDb25zdHJ1Y3Rvci5wcm90b3R5cGUpKSByZXR1cm47XG5cbiAgICAgIENvbnN0cnVjdG9yLnByb3RvdHlwZVtmdW5jTmFtZS5yZXBsYWNlKCdvcGVuJywgJ2l0ZXJhdGUnKV0gPSBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIGFyZ3MgPSB0b0FycmF5KGFyZ3VtZW50cyk7XG4gICAgICAgIHZhciBjYWxsYmFjayA9IGFyZ3NbYXJncy5sZW5ndGggLSAxXTtcbiAgICAgICAgdmFyIG5hdGl2ZU9iamVjdCA9IHRoaXMuX3N0b3JlIHx8IHRoaXMuX2luZGV4O1xuICAgICAgICB2YXIgcmVxdWVzdCA9IG5hdGl2ZU9iamVjdFtmdW5jTmFtZV0uYXBwbHkobmF0aXZlT2JqZWN0LCBhcmdzLnNsaWNlKDAsIC0xKSk7XG4gICAgICAgIHJlcXVlc3Qub25zdWNjZXNzID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgY2FsbGJhY2socmVxdWVzdC5yZXN1bHQpO1xuICAgICAgICB9O1xuICAgICAgfTtcbiAgICB9KTtcbiAgfSk7XG5cbiAgLy8gcG9seWZpbGwgZ2V0QWxsXG4gIFtJbmRleCwgT2JqZWN0U3RvcmVdLmZvckVhY2goZnVuY3Rpb24oQ29uc3RydWN0b3IpIHtcbiAgICBpZiAoQ29uc3RydWN0b3IucHJvdG90eXBlLmdldEFsbCkgcmV0dXJuO1xuICAgIENvbnN0cnVjdG9yLnByb3RvdHlwZS5nZXRBbGwgPSBmdW5jdGlvbihxdWVyeSwgY291bnQpIHtcbiAgICAgIHZhciBpbnN0YW5jZSA9IHRoaXM7XG4gICAgICB2YXIgaXRlbXMgPSBbXTtcblxuICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUpIHtcbiAgICAgICAgaW5zdGFuY2UuaXRlcmF0ZUN1cnNvcihxdWVyeSwgZnVuY3Rpb24oY3Vyc29yKSB7XG4gICAgICAgICAgaWYgKCFjdXJzb3IpIHtcbiAgICAgICAgICAgIHJlc29sdmUoaXRlbXMpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpdGVtcy5wdXNoKGN1cnNvci52YWx1ZSk7XG5cbiAgICAgICAgICBpZiAoY291bnQgIT09IHVuZGVmaW5lZCAmJiBpdGVtcy5sZW5ndGggPT0gY291bnQpIHtcbiAgICAgICAgICAgIHJlc29sdmUoaXRlbXMpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cbiAgICAgICAgICBjdXJzb3IuY29udGludWUoKTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9O1xuICB9KTtcblxuICBmdW5jdGlvbiBvcGVuRGIobmFtZSwgdmVyc2lvbiwgdXBncmFkZUNhbGxiYWNrKSB7XG4gICAgdmFyIHAgPSBwcm9taXNpZnlSZXF1ZXN0Q2FsbChpbmRleGVkREIsICdvcGVuJywgW25hbWUsIHZlcnNpb25dKTtcbiAgICB2YXIgcmVxdWVzdCA9IHAucmVxdWVzdDtcblxuICAgIGlmIChyZXF1ZXN0KSB7XG4gICAgICByZXF1ZXN0Lm9udXBncmFkZW5lZWRlZCA9IGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgIGlmICh1cGdyYWRlQ2FsbGJhY2spIHtcbiAgICAgICAgICB1cGdyYWRlQ2FsbGJhY2sobmV3IFVwZ3JhZGVEQihyZXF1ZXN0LnJlc3VsdCwgZXZlbnQub2xkVmVyc2lvbiwgcmVxdWVzdC50cmFuc2FjdGlvbikpO1xuICAgICAgICB9XG4gICAgICB9O1xuICAgIH1cblxuICAgIHJldHVybiBwLnRoZW4oZnVuY3Rpb24oZGIpIHtcbiAgICAgIHJldHVybiBuZXcgREIoZGIpO1xuICAgIH0pO1xuICB9XG5cbiAgZnVuY3Rpb24gZGVsZXRlRGIobmFtZSkge1xuICAgIHJldHVybiBwcm9taXNpZnlSZXF1ZXN0Q2FsbChpbmRleGVkREIsICdkZWxldGVEYXRhYmFzZScsIFtuYW1lXSk7XG4gIH1cblxuICBleHBvcnRzLm9wZW5EYiA9IG9wZW5EYjtcbiAgZXhwb3J0cy5kZWxldGVEYiA9IGRlbGV0ZURiO1xuXG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG5cbn0pKTtcbiJdLCJzb3VyY2VSb290IjoiIn0=