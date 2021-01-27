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
const idb_1 = __webpack_require__(/*! ../node_modules/idb/lib/idb */ "./node_modules/idb/lib/idb.js");
class IndexedDbManager {
    constructor() {
        this.dbInstance = undefined;
        this.openDb = (database) => __awaiter(this, void 0, void 0, function* () {
            var upgradeError = "";
            try {
                if (!this.dbInstance || this.dbInstance.version < database.version) {
                    if (this.dbInstance) {
                        this.dbInstance.close();
                        this.dbInstance = undefined;
                    }
                    this.dbInstance = yield idb_1.default.open(database.name, database.version, upgradeDB => {
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
        this.deleteDb = (dbName) => __awaiter(this, void 0, void 0, function* () {
            try {
                this.checkOpened();
                this.dbInstance.close();
                yield idb_1.default.delete(dbName);
                this.dbInstance = undefined;
                return `The database ${dbName} has been deleted`;
            }
            catch (error) {
                throw `Database ${dbName}, ${error.toString()}`;
            }
        });
        this.getDbInfo = (dbName) => __awaiter(this, void 0, void 0, function* () {
            try {
                this.checkOpened();
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
        this.get = (storeName, key) => __awaiter(this, void 0, void 0, function* () {
            try {
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
                return yield this.getAll(storeName, IDBKeyRange.bound(lower, upper, lowerOpen, upperOpen), count);
            }
            catch (error) {
                throw `Store ${storeName}, ${error.toString()}`;
            }
        });
        this.getAllByArrayKey = (storeName, key) => __awaiter(this, void 0, void 0, function* () {
            try {
                const tx = this.dbInstance.transaction(storeName, 'readonly');
                const sx = tx.objectStore(storeName);
                let results = [];
                for (let index = 0; index < key.length; index++) {
                    const element = key[index];
                    results.push(yield sx.get(element));
                }
                yield tx.complete;
                return results;
            }
            catch (error) {
                throw `Store ${storeName}, ${error.toString()}`;
            }
        });
        this.count = (storeName, key) => __awaiter(this, void 0, void 0, function* () {
            try {
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
        this.query = (storeName, filter, count = 0, skip = 0) => __awaiter(this, void 0, void 0, function* () {
            try {
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
                        if (func(cursor.value)) {
                            row++;
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
        this.getFromIndex = (storeName, indexName, key) => __awaiter(this, void 0, void 0, function* () {
            try {
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
                return yield this.getAllFromIndex(storeName, indexName, IDBKeyRange.bound(lower, upper, lowerOpen, upperOpen), count);
            }
            catch (error) {
                throw `Store ${storeName}, Index ${indexName}, ${error.toString()}`;
            }
        });
        this.getAllFromIndexArrayKey = (storeName, indexName, key) => __awaiter(this, void 0, void 0, function* () {
            try {
                const tx = this.dbInstance.transaction(storeName, 'readonly');
                const dx = tx.objectStore(storeName).index(indexName);
                let results = [];
                for (let index = 0; index < key.length; index++) {
                    const element = key[index];
                    results.push(yield dx.get(element));
                }
                yield tx.complete;
                return results;
            }
            catch (error) {
                throw `Store ${storeName}, Index ${indexName}, ${error.toString()}`;
            }
        });
        this.countFromIndex = (storeName, indexName, key) => __awaiter(this, void 0, void 0, function* () {
            try {
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
        this.queryFromIndex = (storeName, indexName, filter, count = 0, skip = 0) => __awaiter(this, void 0, void 0, function* () {
            try {
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
                        if (func(cursor.value)) {
                            row++;
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
    checkOpened() {
        if (!this.dbInstance) {
            throw 'Database is closed';
        }
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

/***/ "./node_modules/idb/lib/idb.js":
/*!*************************************!*\
  !*** ./node_modules/idb/lib/idb.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


(function() {
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

  var exp = {
    open: function(name, version, upgradeCallback) {
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
    },
    delete: function(name) {
      return promisifyRequestCall(indexedDB, 'deleteDatabase', [name]);
    }
  };

  if (true) {
    module.exports = exp;
    module.exports.default = module.exports;
  }
  else {}
}());


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L0luaXRpYWxpc2VJbmRleERiQmxhem9yLnRzIiwid2VicGFjazovLy8uL2NsaWVudC9pbmRleGVkRGJCbGF6b3IudHMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2lkYi9saWIvaWRiLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7UUFBQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTs7O1FBR0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDBDQUEwQyxnQ0FBZ0M7UUFDMUU7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSx3REFBd0Qsa0JBQWtCO1FBQzFFO1FBQ0EsaURBQWlELGNBQWM7UUFDL0Q7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLHlDQUF5QyxpQ0FBaUM7UUFDMUUsZ0hBQWdILG1CQUFtQixFQUFFO1FBQ3JJO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMkJBQTJCLDBCQUEwQixFQUFFO1FBQ3ZELGlDQUFpQyxlQUFlO1FBQ2hEO1FBQ0E7UUFDQTs7UUFFQTtRQUNBLHNEQUFzRCwrREFBK0Q7O1FBRXJIO1FBQ0E7OztRQUdBO1FBQ0E7Ozs7Ozs7Ozs7Ozs7OztBQ2xGQSxzR0FBcUQ7QUFFckQsSUFBVSxPQUFPLENBbUJoQjtBQW5CRCxXQUFVLE9BQU87SUFDYixNQUFNLG1CQUFtQixHQUFXLG1CQUFtQixDQUFDO0lBQ3hELE1BQU0sZUFBZSxHQUFHO1FBQ3BCLFVBQVUsRUFBRSxJQUFJLGtDQUFnQixFQUFFO0tBQ3JDLENBQUM7SUFFRixTQUFnQixVQUFVO1FBQ3RCLElBQUksT0FBTyxNQUFNLEtBQUssV0FB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QTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVCxPQUFPO0FBQ1A7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxPQUFPO0FBQ1AsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBOztBQUVBLE1BQU0sSUFBNkI7QUFDbkM7QUFDQTtBQUNBO0FBQ0EsT0FBTyxFQUVKO0FBQ0gsQ0FBQyIsImZpbGUiOiJCbGF6b3JJbmRleGVkRGIuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL2NsaWVudC9Jbml0aWFsaXNlSW5kZXhEYkJsYXpvci50c1wiKTtcbiIsImltcG9ydCB7IEluZGV4ZWREYk1hbmFnZXIgfSBmcm9tICcuL2luZGV4ZWREYkJsYXpvcic7XG5cbm5hbWVzcGFjZSBJbmRleERiIHtcbiAgICBjb25zdCB0aW1lZ2hvc3RFeHRlbnNpb25zOiBzdHJpbmcgPSAnQmxhem9ySW5kZXhlZERiSnMnO1xuICAgIGNvbnN0IGV4dGVuc2lvbk9iamVjdCA9IHtcbiAgICAgICAgSURCTWFuYWdlcjogbmV3IEluZGV4ZWREYk1hbmFnZXIoKVxuICAgIH07XG5cbiAgICBleHBvcnQgZnVuY3Rpb24gaW5pdGlhbGlzZSgpOiB2b2lkIHtcbiAgICAgICAgaWYgKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnICYmICF3aW5kb3dbdGltZWdob3N0RXh0ZW5zaW9uc10pIHtcbiAgICAgICAgICAgIHdpbmRvd1t0aW1lZ2hvc3RFeHRlbnNpb25zXSA9IHtcbiAgICAgICAgICAgICAgICAuLi5leHRlbnNpb25PYmplY3RcbiAgICAgICAgICAgIH07XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB3aW5kb3dbdGltZWdob3N0RXh0ZW5zaW9uc10gPSB7XG4gICAgICAgICAgICAgICAgLi4ud2luZG93W3RpbWVnaG9zdEV4dGVuc2lvbnNdLFxuICAgICAgICAgICAgICAgIC4uLmV4dGVuc2lvbk9iamVjdFxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuXG4gICAgfVxufVxuXG5JbmRleERiLmluaXRpYWxpc2UoKTsiLCIvLy8vLyA8cmVmZXJlbmNlIHBhdGg9XCJNaWNyb3NvZnQuSlNJbnRlcm9wLmQudHNcIi8+XG5pbXBvcnQgaWRiIGZyb20gJy4uL25vZGVfbW9kdWxlcy9pZGIvbGliL2lkYic7XG5pbXBvcnQgeyBEQiwgVXBncmFkZURCLCBPYmplY3RTdG9yZSwgVHJhbnNhY3Rpb24gfSBmcm9tICcuLi9ub2RlX21vZHVsZXMvaWRiL2xpYi9pZGInO1xuaW1wb3J0IHsgSURhdGFiYXNlLCBJSW5kZXhTZWFyY2gsIElJbmRleCwgSU9iamVjdFN0b3JlLCBJSW5mb3JtYXRpb24gfSBmcm9tICcuL0ludGVyb3BJbnRlcmZhY2VzJztcblxuZXhwb3J0IGNsYXNzIEluZGV4ZWREYk1hbmFnZXIge1xuXG4gICAgcHJpdmF0ZSBkYkluc3RhbmNlOiBhbnkgPSB1bmRlZmluZWQ7XG5cbiAgICBjb25zdHJ1Y3RvcigpIHsgfVxuXG4gICAgcHJpdmF0ZSBjaGVja09wZW5lZCgpIHtcbiAgICAgICAgaWYgKCF0aGlzLmRiSW5zdGFuY2UpIHtcbiAgICAgICAgICAgIHRocm93ICdEYXRhYmFzZSBpcyBjbG9zZWQnO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIG9wZW5EYiA9IGFzeW5jIChkYXRhYmFzZTogSURhdGFiYXNlKTogUHJvbWlzZTxzdHJpbmc+ID0+IHtcbiAgICAgICAgdmFyIHVwZ3JhZGVFcnJvciA9IFwiXCI7XG5cbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGlmICghdGhpcy5kYkluc3RhbmNlIHx8IHRoaXMuZGJJbnN0YW5jZS52ZXJzaW9uIDwgZGF0YWJhc2UudmVyc2lvbikge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmRiSW5zdGFuY2UpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kYkluc3RhbmNlLmNsb3NlKCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZGJJbnN0YW5jZSA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhpcy5kYkluc3RhbmNlID0gYXdhaXQgaWRiLm9wZW4oZGF0YWJhc2UubmFtZSwgZGF0YWJhc2UudmVyc2lvbiwgdXBncmFkZURCID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudXBncmFkZURhdGFiYXNlKHVwZ3JhZGVEQiwgZGF0YWJhc2UpO1xuICAgICAgICAgICAgICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgdXBncmFkZUVycm9yID0gZXJyb3IudG9TdHJpbmcoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRocm93KGVycm9yKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gYEluZGV4ZWREQiAke2RhdGFiYXNlLm5hbWV9IG9wZW5lZGA7XG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICB0aHJvdyBlcnJvci50b1N0cmluZygpKycgJyt1cGdyYWRlRXJyb3I7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgZGVsZXRlRGIgPSBhc3luYyhkYk5hbWU6IHN0cmluZyk6IFByb21pc2U8c3RyaW5nPiA9PiB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICB0aGlzLmNoZWNrT3BlbmVkKCk7XG5cbiAgICAgICAgICAgIHRoaXMuZGJJbnN0YW5jZS5jbG9zZSgpO1xuXG4gICAgICAgICAgICBhd2FpdCBpZGIuZGVsZXRlKGRiTmFtZSk7XG5cbiAgICAgICAgICAgIHRoaXMuZGJJbnN0YW5jZSA9IHVuZGVmaW5lZDtcblxuICAgICAgICAgICAgcmV0dXJuIGBUaGUgZGF0YWJhc2UgJHtkYk5hbWV9IGhhcyBiZWVuIGRlbGV0ZWRgO1xuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgdGhyb3cgYERhdGFiYXNlICR7ZGJOYW1lfSwgJHtlcnJvci50b1N0cmluZygpfWA7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0RGJJbmZvID0gYXN5bmMgKGRiTmFtZTogc3RyaW5nKSA6IFByb21pc2U8SUluZm9ybWF0aW9uPiA9PiB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICB0aGlzLmNoZWNrT3BlbmVkKCk7XG5cbiAgICAgICAgICAgIGNvbnN0IGN1cnJlbnREYiA9IDxEQj50aGlzLmRiSW5zdGFuY2U7XG5cbiAgICAgICAgICAgIGxldCBnZXRTdG9yZU5hbWVzID0gKGxpc3Q6IERPTVN0cmluZ0xpc3QpOiBzdHJpbmdbXSA9PiB7XG4gICAgICAgICAgICAgICAgbGV0IG5hbWVzOiBzdHJpbmdbXSA9IFtdO1xuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGlzdC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICBuYW1lcy5wdXNoKGxpc3RbaV0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gbmFtZXM7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdCBkYkluZm86IElJbmZvcm1hdGlvbiA9IHtcbiAgICAgICAgICAgICAgICB2ZXJzaW9uOiBjdXJyZW50RGIudmVyc2lvbixcbiAgICAgICAgICAgICAgICBvYmplY3RTdG9yZU5hbWVzOiBnZXRTdG9yZU5hbWVzKGN1cnJlbnREYi5vYmplY3RTdG9yZU5hbWVzKVxuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgcmV0dXJuIGRiSW5mbztcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgIHRocm93IGBEYXRhYmFzZSAke2RiTmFtZX0sICR7ZXJyb3IudG9TdHJpbmcoKX1gO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIGdldCA9IGFzeW5jIChzdG9yZU5hbWU6IHN0cmluZywga2V5OiBhbnkpOiBQcm9taXNlPGFueT4gPT4ge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgY29uc3QgdHggPSB0aGlzLmRiSW5zdGFuY2UudHJhbnNhY3Rpb24oc3RvcmVOYW1lLCAncmVhZG9ubHknKTtcblxuICAgICAgICAgICAgbGV0IHJlc3VsdCA9IGF3YWl0IHR4Lm9iamVjdFN0b3JlKHN0b3JlTmFtZSkuZ2V0KGtleSk7XG5cbiAgICAgICAgICAgIGF3YWl0IHR4LmNvbXBsZXRlO1xuXG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgdGhyb3cgYFN0b3JlICR7c3RvcmVOYW1lfSwgJHtlcnJvci50b1N0cmluZygpfWA7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0QWxsID0gYXN5bmMgKHN0b3JlTmFtZTogc3RyaW5nLCBrZXk/OiBhbnksIGNvdW50PzogbnVtYmVyKTogUHJvbWlzZTxhbnk+ID0+IHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGNvbnN0IHR4ID0gdGhpcy5kYkluc3RhbmNlLnRyYW5zYWN0aW9uKHN0b3JlTmFtZSwgJ3JlYWRvbmx5Jyk7XG5cbiAgICAgICAgICAgIGxldCByZXN1bHRzID0gYXdhaXQgdHgub2JqZWN0U3RvcmUoc3RvcmVOYW1lKS5nZXRBbGwoa2V5ID8/IHVuZGVmaW5lZCwgY291bnQgPz8gdW5kZWZpbmVkKTtcblxuICAgICAgICAgICAgYXdhaXQgdHguY29tcGxldGU7XG5cbiAgICAgICAgICAgIHJldHVybiByZXN1bHRzO1xuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgdGhyb3cgYFN0b3JlICR7c3RvcmVOYW1lfSwgJHtlcnJvci50b1N0cmluZygpfWA7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0QWxsQnlLZXlSYW5nZSA9IGFzeW5jIChzdG9yZU5hbWU6IHN0cmluZywgbG93ZXI6IGFueSwgdXBwZXI6IGFueSwgbG93ZXJPcGVuOiBib29sZWFuLCB1cHBlck9wZW46IGJvb2xlYW4sIGNvdW50PzogbnVtYmVyKTogUHJvbWlzZTxhbnk+ID0+IHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHJldHVybiBhd2FpdCB0aGlzLmdldEFsbChzdG9yZU5hbWUsIElEQktleVJhbmdlLmJvdW5kKGxvd2VyLCB1cHBlciwgbG93ZXJPcGVuLCB1cHBlck9wZW4pLCBjb3VudCk7XG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICB0aHJvdyBgU3RvcmUgJHtzdG9yZU5hbWV9LCAke2Vycm9yLnRvU3RyaW5nKCl9YDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBnZXRBbGxCeUFycmF5S2V5ID0gYXN5bmMgKHN0b3JlTmFtZTogc3RyaW5nLCBrZXk6IGFueVtdKTogUHJvbWlzZTxhbnk+ID0+IHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGNvbnN0IHR4ID0gdGhpcy5kYkluc3RhbmNlLnRyYW5zYWN0aW9uKHN0b3JlTmFtZSwgJ3JlYWRvbmx5Jyk7XG4gICAgICAgICAgICBjb25zdCBzeCA9IHR4Lm9iamVjdFN0b3JlKHN0b3JlTmFtZSk7XG5cbiAgICAgICAgICAgIGxldCByZXN1bHRzOiBhbnlbXSA9IFtdO1xuXG4gICAgICAgICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwga2V5Lmxlbmd0aDsgaW5kZXgrKykge1xuICAgICAgICAgICAgICAgIGNvbnN0IGVsZW1lbnQgPSBrZXlbaW5kZXhdO1xuICAgICAgICAgICAgICAgIHJlc3VsdHMucHVzaChhd2FpdCBzeC5nZXQoZWxlbWVudCkpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBhd2FpdCB0eC5jb21wbGV0ZTtcblxuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdHM7XG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICB0aHJvdyBgU3RvcmUgJHtzdG9yZU5hbWV9LCAke2Vycm9yLnRvU3RyaW5nKCl9YDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBjb3VudCA9IGFzeW5jIChzdG9yZU5hbWU6IHN0cmluZywga2V5PzogYW55KTogUHJvbWlzZTxudW1iZXI+ID0+IHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGNvbnN0IHR4ID0gdGhpcy5kYkluc3RhbmNlLnRyYW5zYWN0aW9uKHN0b3JlTmFtZSwgJ3JlYWRvbmx5Jyk7XG5cbiAgICAgICAgICAgIGxldCByZXN1bHQgPSBhd2FpdCB0eC5vYmplY3RTdG9yZShzdG9yZU5hbWUpLmNvdW50KGtleSA/PyB1bmRlZmluZWQpO1xuXG4gICAgICAgICAgICBhd2FpdCB0eC5jb21wbGV0ZTtcblxuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgIHRocm93IGBTdG9yZSAke3N0b3JlTmFtZX0sICR7ZXJyb3IudG9TdHJpbmcoKX1gO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIGNvdW50QnlLZXlSYW5nZSA9IGFzeW5jIChzdG9yZU5hbWU6IHN0cmluZywgbG93ZXI6IGFueSwgdXBwZXI6IGFueSwgbG93ZXJPcGVuOiBib29sZWFuLCB1cHBlck9wZW46IGJvb2xlYW4pOiBQcm9taXNlPG51bWJlcj4gPT4ge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgcmV0dXJuIGF3YWl0IHRoaXMuY291bnQoc3RvcmVOYW1lLCBJREJLZXlSYW5nZS5ib3VuZChsb3dlciwgdXBwZXIsIGxvd2VyT3BlbiwgdXBwZXJPcGVuKSk7XG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICB0aHJvdyBgU3RvcmUgJHtzdG9yZU5hbWV9LCAke2Vycm9yLnRvU3RyaW5nKCl9YDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBxdWVyeSA9IGFzeW5jIChzdG9yZU5hbWU6IHN0cmluZywgZmlsdGVyOiBzdHJpbmcsIGNvdW50OiBudW1iZXIgPSAwLCBza2lwOiBudW1iZXIgPSAwKTogUHJvbWlzZTxhbnk+ID0+IHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGNvbnN0IHR4ID0gdGhpcy5kYkluc3RhbmNlLnRyYW5zYWN0aW9uKHN0b3JlTmFtZSwgJ3JlYWRvbmx5Jyk7XG5cbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgdmFyIGZ1bmMgPSBuZXcgRnVuY3Rpb24oJ29iaicsIGZpbHRlcik7XG4gICAgICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgICAgIHRocm93IGAke2Vycm9yLnRvU3RyaW5nKCl9IGluIGZpbHRlciB7ICR7ZmlsdGVyfSB9YFxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB2YXIgcm93ID0gMDtcbiAgICAgICAgICAgIHZhciBlcnJvck1lc3NhZ2UgPSBcIlwiO1xuXG4gICAgICAgICAgICBsZXQgcmVzdWx0czogYW55W10gPSBbXTtcblxuICAgICAgICAgICAgdHgub2JqZWN0U3RvcmUoc3RvcmVOYW1lKVxuICAgICAgICAgICAgICAgIC5pdGVyYXRlQ3Vyc29yKGN1cnNvciA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmICghY3Vyc29yKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChmdW5jKGN1cnNvci52YWx1ZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByb3cgKys7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJvdyA+IHNraXApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0cy5wdXNoKGN1cnNvci52YWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgZXJyb3JNZXNzYWdlID0gYG9iajogJHtKU09OLnN0cmluZ2lmeShjdXJzb3IudmFsdWUpfVxcbmZpbHRlcjogJHtmaWx0ZXJ9XFxuZXJyb3I6ICR7ZXJyb3IudG9TdHJpbmcoKX1gO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGlmIChjb3VudCA+IDAgJiYgcmVzdWx0cy5sZW5ndGggPj0gY291bnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBjdXJzb3IuY29udGludWUoKTtcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgYXdhaXQgdHguY29tcGxldGU7XG5cbiAgICAgICAgICAgIGlmIChlcnJvck1lc3NhZ2UpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBlcnJvck1lc3NhZ2U7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiByZXN1bHRzO1xuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgdGhyb3cgYFN0b3JlICR7c3RvcmVOYW1lfSAke2Vycm9yLnRvU3RyaW5nKCl9YDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBnZXRGcm9tSW5kZXggPSBhc3luYyAoc3RvcmVOYW1lOiBzdHJpbmcsIGluZGV4TmFtZTogc3RyaW5nLCBrZXk6IGFueSk6IFByb21pc2U8YW55PiA9PiB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBjb25zdCB0eCA9IHRoaXMuZGJJbnN0YW5jZS50cmFuc2FjdGlvbihzdG9yZU5hbWUsICdyZWFkb25seScpO1xuXG4gICAgICAgICAgICBjb25zdCByZXN1bHRzID0gYXdhaXQgdHgub2JqZWN0U3RvcmUoc3RvcmVOYW1lKS5pbmRleChpbmRleE5hbWUpLmdldChrZXkpO1xuXG4gICAgICAgICAgICBhd2FpdCB0eC5jb21wbGV0ZTtcblxuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdHM7XG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICB0aHJvdyBgU3RvcmUgJHtzdG9yZU5hbWV9LCBJbmRleCAke2luZGV4TmFtZX0sICR7ZXJyb3IudG9TdHJpbmcoKX1gO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIGdldEFsbEZyb21JbmRleCA9IGFzeW5jIChzdG9yZU5hbWU6IHN0cmluZywgaW5kZXhOYW1lOiBzdHJpbmcsIGtleT86IGFueSwgY291bnQ/OiBudW1iZXIpOiBQcm9taXNlPGFueT4gPT4ge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgY29uc3QgdHggPSB0aGlzLmRiSW5zdGFuY2UudHJhbnNhY3Rpb24oc3RvcmVOYW1lLCAncmVhZG9ubHknKTtcblxuICAgICAgICAgICAgY29uc3QgcmVzdWx0cyA9IGF3YWl0IHR4Lm9iamVjdFN0b3JlKHN0b3JlTmFtZSkuaW5kZXgoaW5kZXhOYW1lKS5nZXRBbGwoa2V5ID8/IHVuZGVmaW5lZCwgY291bnQgPz8gdW5kZWZpbmVkKTtcblxuICAgICAgICAgICAgYXdhaXQgdHguY29tcGxldGU7XG5cbiAgICAgICAgICAgIHJldHVybiByZXN1bHRzO1xuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgdGhyb3cgYFN0b3JlICR7c3RvcmVOYW1lfSwgSW5kZXggJHtpbmRleE5hbWV9LCAke2Vycm9yLnRvU3RyaW5nKCl9YDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBnZXRBbGxGcm9tSW5kZXhCeUtleVJhbmdlID0gYXN5bmMgKHN0b3JlTmFtZTogc3RyaW5nLCBpbmRleE5hbWU6IHN0cmluZywgbG93ZXI6IGFueSwgdXBwZXI6IGFueSwgbG93ZXJPcGVuOiBib29sZWFuLCB1cHBlck9wZW46IGJvb2xlYW4sIGNvdW50PzogbnVtYmVyKTogUHJvbWlzZTxhbnk+ID0+IHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHJldHVybiBhd2FpdCB0aGlzLmdldEFsbEZyb21JbmRleChzdG9yZU5hbWUsIGluZGV4TmFtZSwgSURCS2V5UmFuZ2UuYm91bmQobG93ZXIsIHVwcGVyLCBsb3dlck9wZW4sIHVwcGVyT3BlbiksIGNvdW50KTtcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgIHRocm93IGBTdG9yZSAke3N0b3JlTmFtZX0sIEluZGV4ICR7aW5kZXhOYW1lfSwgJHtlcnJvci50b1N0cmluZygpfWA7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0QWxsRnJvbUluZGV4QXJyYXlLZXkgPSBhc3luYyAoc3RvcmVOYW1lOiBzdHJpbmcsIGluZGV4TmFtZTogc3RyaW5nLCBrZXk6IGFueVtdKTogUHJvbWlzZTxhbnk+ID0+IHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGNvbnN0IHR4ID0gdGhpcy5kYkluc3RhbmNlLnRyYW5zYWN0aW9uKHN0b3JlTmFtZSwgJ3JlYWRvbmx5Jyk7XG4gICAgICAgICAgICBjb25zdCBkeCA9IHR4Lm9iamVjdFN0b3JlKHN0b3JlTmFtZSkuaW5kZXgoaW5kZXhOYW1lKTtcblxuICAgICAgICAgICAgbGV0IHJlc3VsdHM6IGFueVtdID0gW107XG5cbiAgICAgICAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBrZXkubGVuZ3RoOyBpbmRleCsrKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgZWxlbWVudCA9IGtleVtpbmRleF07XG4gICAgICAgICAgICAgICAgcmVzdWx0cy5wdXNoKGF3YWl0IGR4LmdldChlbGVtZW50KSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGF3YWl0IHR4LmNvbXBsZXRlO1xuXG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0cztcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgIHRocm93IGBTdG9yZSAke3N0b3JlTmFtZX0sIEluZGV4ICR7aW5kZXhOYW1lfSwgJHtlcnJvci50b1N0cmluZygpfWA7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgY291bnRGcm9tSW5kZXggPSBhc3luYyAoc3RvcmVOYW1lOiBzdHJpbmcsIGluZGV4TmFtZTogc3RyaW5nLCBrZXk/OiBhbnkpOiBQcm9taXNlPG51bWJlcj4gPT4ge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgY29uc3QgdHggPSB0aGlzLmRiSW5zdGFuY2UudHJhbnNhY3Rpb24oc3RvcmVOYW1lLCAncmVhZG9ubHknKTtcblxuICAgICAgICAgICAgbGV0IHJlc3VsdCA9IGF3YWl0IHR4Lm9iamVjdFN0b3JlKHN0b3JlTmFtZSkuaW5kZXgoaW5kZXhOYW1lKS5jb3VudChrZXkgPz8gdW5kZWZpbmVkKTtcblxuICAgICAgICAgICAgYXdhaXQgdHguY29tcGxldGU7XG5cbiAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICB0aHJvdyBgU3RvcmUgJHtzdG9yZU5hbWV9LCBJbmRleCAke2luZGV4TmFtZX0sICR7ZXJyb3IudG9TdHJpbmcoKX1gO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIGNvdW50RnJvbUluZGV4QnlLZXlSYW5nZSA9IGFzeW5jIChzdG9yZU5hbWU6IHN0cmluZywgaW5kZXhOYW1lOiBzdHJpbmcsIGxvd2VyOiBhbnksIHVwcGVyOiBhbnksIGxvd2VyT3BlbjogYm9vbGVhbiwgdXBwZXJPcGVuOiBib29sZWFuKTogUHJvbWlzZTxudW1iZXI+ID0+IHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHJldHVybiBhd2FpdCB0aGlzLmNvdW50RnJvbUluZGV4KHN0b3JlTmFtZSwgaW5kZXhOYW1lLCBJREJLZXlSYW5nZS5ib3VuZChsb3dlciwgdXBwZXIsIGxvd2VyT3BlbiwgdXBwZXJPcGVuKSk7XG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICB0aHJvdyBgU3RvcmUgJHtzdG9yZU5hbWV9LCBJbmRleCAke2luZGV4TmFtZX0sICR7ZXJyb3IudG9TdHJpbmcoKX1gO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIHF1ZXJ5RnJvbUluZGV4ID0gYXN5bmMgKHN0b3JlTmFtZTogc3RyaW5nLCBpbmRleE5hbWU6IHN0cmluZywgZmlsdGVyOiBzdHJpbmcsIGNvdW50OiBudW1iZXIgPSAwLCBza2lwOiBudW1iZXIgPSAwKTogUHJvbWlzZTxhbnk+ID0+IHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGNvbnN0IHR4ID0gdGhpcy5kYkluc3RhbmNlLnRyYW5zYWN0aW9uKHN0b3JlTmFtZSwgJ3JlYWRvbmx5Jyk7XG5cbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgdmFyIGZ1bmMgPSBuZXcgRnVuY3Rpb24oJ29iaicsIGZpbHRlcik7XG4gICAgICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgICAgIHRocm93IGAke2Vycm9yLnRvU3RyaW5nKCl9IGluIGZpbHRlciB7ICR7ZmlsdGVyfSB9YFxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB2YXIgcm93ID0gMDtcbiAgICAgICAgICAgIHZhciBlcnJvck1lc3NhZ2UgPSBcIlwiO1xuXG4gICAgICAgICAgICBsZXQgcmVzdWx0czogYW55W10gPSBbXTtcblxuICAgICAgICAgICAgdHgub2JqZWN0U3RvcmUoc3RvcmVOYW1lKVxuICAgICAgICAgICAgICAgIC5pbmRleChpbmRleE5hbWUpXG4gICAgICAgICAgICAgICAgLml0ZXJhdGVDdXJzb3IoY3Vyc29yID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFjdXJzb3IpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGZ1bmMoY3Vyc29yLnZhbHVlKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJvdyArKztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocm93ID4gc2tpcCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXN1bHRzLnB1c2goY3Vyc29yLnZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBlcnJvck1lc3NhZ2UgPSBgb2JqOiAke0pTT04uc3RyaW5naWZ5KGN1cnNvci52YWx1ZSl9XFxuZmlsdGVyOiAke2ZpbHRlcn1cXG5lcnJvcjogJHtlcnJvci50b1N0cmluZygpfWA7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKGNvdW50ID4gMCAmJiByZXN1bHRzLmxlbmd0aCA+PSBjb3VudCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGN1cnNvci5jb250aW51ZSgpO1xuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBhd2FpdCB0eC5jb21wbGV0ZTtcblxuICAgICAgICAgICAgaWYgKGVycm9yTWVzc2FnZSkge1xuICAgICAgICAgICAgICAgIHRocm93IGVycm9yTWVzc2FnZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdHM7XG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICB0aHJvdyBgU3RvcmUgJHtzdG9yZU5hbWV9LCBJbmRleCAke2luZGV4TmFtZX0sICR7ZXJyb3IudG9TdHJpbmcoKX1gO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIGFkZCA9IGFzeW5jIChzdG9yZU5hbWU6IHN0cmluZywgZGF0YTogYW55LCBrZXk/OiBhbnkpOiBQcm9taXNlPHN0cmluZz4gPT4ge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgY29uc3QgdHggPSB0aGlzLmRiSW5zdGFuY2UudHJhbnNhY3Rpb24oc3RvcmVOYW1lLCAncmVhZHdyaXRlJyk7XG4gICAgICAgICAgICBjb25zdCBvYmplY3RTdG9yZSA9IHR4Lm9iamVjdFN0b3JlKHN0b3JlTmFtZSk7XG5cbiAgICAgICAgICAgIGRhdGEgPSB0aGlzLmNoZWNrRm9yS2V5UGF0aChvYmplY3RTdG9yZSwgZGF0YSk7XG5cbiAgICAgICAgICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IG9iamVjdFN0b3JlLmFkZChkYXRhLCBrZXkgPz8gdW5kZWZpbmVkKTtcblxuICAgICAgICAgICAgYXdhaXQgdHguY29tcGxldGU7XG5cbiAgICAgICAgICAgIHJldHVybiBgQWRkZWQgbmV3IHJlY29yZCB3aXRoIGlkICR7cmVzdWx0fWA7XG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICB0aHJvdyBgU3RvcmUgJHtzdG9yZU5hbWV9LCAke2Vycm9yLnRvU3RyaW5nKCl9YDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBwdXQgPSBhc3luYyAoc3RvcmVOYW1lOiBzdHJpbmcsIGRhdGE6IGFueSwga2V5PzogYW55KTogUHJvbWlzZTxzdHJpbmc+ID0+IHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGNvbnN0IHR4ID0gdGhpcy5kYkluc3RhbmNlLnRyYW5zYWN0aW9uKHN0b3JlTmFtZSwgJ3JlYWR3cml0ZScpO1xuXG4gICAgICAgICAgICBjb25zdCByZXN1bHQgPSBhd2FpdCB0eC5vYmplY3RTdG9yZShzdG9yZU5hbWUpLnB1dChkYXRhLCBrZXkgPz8gdW5kZWZpbmVkKTtcblxuICAgICAgICAgICAgYXdhaXQgdHguY29tcGxldGU7XG5cbiAgICAgICAgICAgIHJldHVybiBgdXBkYXRlZCByZWNvcmQgd2l0aCBpZCAke3Jlc3VsdH1gO1xuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgdGhyb3cgYFN0b3JlICR7c3RvcmVOYW1lfSwgJHtlcnJvci50b1N0cmluZygpfWA7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgZGVsZXRlID0gYXN5bmMgKHN0b3JlTmFtZTogc3RyaW5nLCBpZDogYW55KTogUHJvbWlzZTxzdHJpbmc+ID0+IHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGNvbnN0IHR4ID0gdGhpcy5kYkluc3RhbmNlLnRyYW5zYWN0aW9uKHN0b3JlTmFtZSwgJ3JlYWR3cml0ZScpO1xuXG4gICAgICAgICAgICBhd2FpdCB0eC5vYmplY3RTdG9yZShzdG9yZU5hbWUpLmRlbGV0ZShpZCk7XG5cbiAgICAgICAgICAgIGF3YWl0IHR4LmNvbXBsZXRlO1xuXG4gICAgICAgICAgICByZXR1cm4gYFJlY29yZCB3aXRoIGlkOiAke2lkfSBkZWxldGVkYDtcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgIHRocm93IGBTdG9yZSAke3N0b3JlTmFtZX0sICR7ZXJyb3IudG9TdHJpbmcoKX1gO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIGJhdGNoQWRkID0gYXN5bmMgKHN0b3JlTmFtZTogc3RyaW5nLCBkYXRhOiBhbnlbXSk6IFByb21pc2U8c3RyaW5nPiA9PiB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBjb25zdCB0eCA9IHRoaXMuZGJJbnN0YW5jZS50cmFuc2FjdGlvbihzdG9yZU5hbWUsICdyZWFkd3JpdGUnKTtcbiAgICAgICAgICAgIGNvbnN0IG9iamVjdFN0b3JlID0gdHgub2JqZWN0U3RvcmUoc3RvcmVOYW1lKTtcblxuICAgICAgICAgICAgZGF0YS5mb3JFYWNoKGFzeW5jIGVsZW1lbnQgPT4ge1xuICAgICAgICAgICAgICAgIGxldCBpdGVtID0gdGhpcy5jaGVja0ZvcktleVBhdGgob2JqZWN0U3RvcmUsIGVsZW1lbnQpO1xuICAgICAgICAgICAgICAgIGF3YWl0IG9iamVjdFN0b3JlLmFkZChpdGVtKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBhd2FpdCB0eC5jb21wbGV0ZTtcblxuICAgICAgICAgICAgcmV0dXJuIGBBZGRlZCAke2RhdGEubGVuZ3RofSByZWNvcmRzYDtcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgIHRocm93IGBTdG9yZSAke3N0b3JlTmFtZX0sICR7ZXJyb3IudG9TdHJpbmcoKX1gO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIGJhdGNoUHV0ID0gYXN5bmMgKHN0b3JlTmFtZTogc3RyaW5nLCBkYXRhOiBhbnlbXSk6IFByb21pc2U8c3RyaW5nPiA9PiB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBjb25zdCB0eCA9IHRoaXMuZGJJbnN0YW5jZS50cmFuc2FjdGlvbihzdG9yZU5hbWUsICdyZWFkd3JpdGUnKTtcblxuICAgICAgICAgICAgZGF0YS5mb3JFYWNoKGFzeW5jIGVsZW1lbnQgPT4ge1xuICAgICAgICAgICAgICAgIGF3YWl0IHR4Lm9iamVjdFN0b3JlKHN0b3JlTmFtZSkucHV0KGVsZW1lbnQpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGF3YWl0IHR4LmNvbXBsZXRlO1xuXG4gICAgICAgICAgICByZXR1cm4gYHVwZGF0ZWQgJHtkYXRhLmxlbmd0aH0gcmVjb3Jkc2A7XG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICB0aHJvdyBgU3RvcmUgJHtzdG9yZU5hbWV9LCAke2Vycm9yLnRvU3RyaW5nKCl9YDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBiYXRjaERlbGV0ZSA9IGFzeW5jIChzdG9yZU5hbWU6IHN0cmluZywgaWRzOiBhbnlbXSk6IFByb21pc2U8c3RyaW5nPiA9PiB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBjb25zdCB0eCA9IHRoaXMuZGJJbnN0YW5jZS50cmFuc2FjdGlvbihzdG9yZU5hbWUsICdyZWFkd3JpdGUnKTtcblxuICAgICAgICAgICAgaWRzLmZvckVhY2goYXN5bmMgZWxlbWVudCA9PiB7XG4gICAgICAgICAgICAgICAgYXdhaXQgdHgub2JqZWN0U3RvcmUoc3RvcmVOYW1lKS5kZWxldGUoZWxlbWVudCk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgYXdhaXQgdHguY29tcGxldGU7XG5cbiAgICAgICAgICAgIHJldHVybiBgRGVsZXRlZCAke2lkcy5sZW5ndGh9IHJlY29yZHNgO1xuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgdGhyb3cgYFN0b3JlICR7c3RvcmVOYW1lfSwgJHtlcnJvci50b1N0cmluZygpfWA7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgY2xlYXJTdG9yZSA9IGFzeW5jIChzdG9yZU5hbWU6IHN0cmluZyk6IFByb21pc2U8c3RyaW5nPiA9PiB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBjb25zdCB0eCA9IHRoaXMuZGJJbnN0YW5jZS50cmFuc2FjdGlvbihzdG9yZU5hbWUsICdyZWFkd3JpdGUnKTtcblxuICAgICAgICAgICAgYXdhaXQgdHgub2JqZWN0U3RvcmUoc3RvcmVOYW1lKS5jbGVhcigpO1xuXG4gICAgICAgICAgICBhd2FpdCB0eC5jb21wbGV0ZTtcblxuICAgICAgICAgICAgcmV0dXJuIGBTdG9yZSAke3N0b3JlTmFtZX0gY2xlYXJlZGA7XG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICB0aHJvdyBgU3RvcmUgJHtzdG9yZU5hbWV9LCAke2Vycm9yLnRvU3RyaW5nKCl9YDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgY2hlY2tGb3JLZXlQYXRoKG9iamVjdFN0b3JlOiBPYmplY3RTdG9yZTxhbnksIGFueT4sIGRhdGE6IGFueSkge1xuICAgICAgICBpZiAoIW9iamVjdFN0b3JlLmF1dG9JbmNyZW1lbnQgfHwgIW9iamVjdFN0b3JlLmtleVBhdGgpIHtcbiAgICAgICAgICAgIHJldHVybiBkYXRhO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHR5cGVvZiBvYmplY3RTdG9yZS5rZXlQYXRoICE9PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgcmV0dXJuIGRhdGE7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBrZXlQYXRoID0gb2JqZWN0U3RvcmUua2V5UGF0aCBhcyBzdHJpbmc7XG5cbiAgICAgICAgaWYgKCFkYXRhW2tleVBhdGhdKSB7XG4gICAgICAgICAgICBkZWxldGUgZGF0YVtrZXlQYXRoXTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZGF0YTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHVwZ3JhZGVEYXRhYmFzZSh1cGdyYWRlREI6IFVwZ3JhZGVEQiwgZGJEYXRhYmFzZTogSURhdGFiYXNlKSB7XG4gICAgICAgIGlmICh1cGdyYWRlREIub2xkVmVyc2lvbiA8IGRiRGF0YWJhc2UudmVyc2lvbikge1xuICAgICAgICAgICAgaWYgKGRiRGF0YWJhc2Uub2JqZWN0U3RvcmVzKSB7XG4gICAgICAgICAgICAgICAgZm9yICh2YXIgc3RvcmUgb2YgZGJEYXRhYmFzZS5vYmplY3RTdG9yZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCF1cGdyYWRlREIub2JqZWN0U3RvcmVOYW1lcy5jb250YWlucyhzdG9yZS5uYW1lKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5hZGROZXdTdG9yZSh1cGdyYWRlREIsIHN0b3JlKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgZ2V0S2V5UGF0aChrZXlQYXRoPzogc3RyaW5nKTogc3RyaW5nIHwgc3RyaW5nW10gfCB1bmRlZmluZWQge1xuICAgICAgICBpZiAoa2V5UGF0aCkge1xuICAgICAgICAgICAgdmFyIG11bHRpS2V5UGF0aCA9IGtleVBhdGguc3BsaXQoJywnKTtcbiAgICAgICAgICAgIHJldHVybiBtdWx0aUtleVBhdGgubGVuZ3RoID4gMSA/IG11bHRpS2V5UGF0aCA6IGtleVBhdGg7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBhZGROZXdTdG9yZSh1cGdyYWRlREI6IFVwZ3JhZGVEQiwgc3RvcmU6IElPYmplY3RTdG9yZSkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgbGV0IHByaW1hcnlLZXkgPSBzdG9yZS5wcmltYXJ5S2V5O1xuXG4gICAgICAgICAgICBpZiAoIXByaW1hcnlLZXkpIHtcbiAgICAgICAgICAgICAgICBwcmltYXJ5S2V5ID0geyBuYW1lOiAnaWQnLCBrZXlQYXRoOiAnaWQnLCBtdWx0aUVudHJ5OiBmYWxzZSwgdW5pcXVlOiBmYWxzZSwgYXV0b0luY3JlbWVudDogdHJ1ZSB9O1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjb25zdCBuZXdTdG9yZSA9IHVwZ3JhZGVEQi5jcmVhdGVPYmplY3RTdG9yZShzdG9yZS5uYW1lLFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAga2V5UGF0aDogdGhpcy5nZXRLZXlQYXRoKHByaW1hcnlLZXkua2V5UGF0aCksXG4gICAgICAgICAgICAgICAgICAgIGF1dG9JbmNyZW1lbnQ6IHByaW1hcnlLZXkuYXV0b0luY3JlbWVudFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICk7XG5cbiAgICAgICAgICAgIGZvciAodmFyIGluZGV4IG9mIHN0b3JlLmluZGV4ZXMpIHtcbiAgICAgICAgICAgICAgICB0cnkge1xuXG4gICAgICAgICAgICAgICAgICAgIG5ld1N0b3JlLmNyZWF0ZUluZGV4KGluZGV4Lm5hbWUsXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmdldEtleVBhdGgoaW5kZXgua2V5UGF0aCkgPz8gaW5kZXgubmFtZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtdWx0aUVudHJ5OiBpbmRleC5tdWx0aUVudHJ5LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVuaXF1ZTogaW5kZXgudW5pcXVlXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgYGluZGV4ICR7aW5kZXgubmFtZX0sICR7ZXJyb3IudG9TdHJpbmcoKX1gO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgIHRocm93IGBzdG9yZSAke3N0b3JlLm5hbWV9LCAke2Vycm9yLnRvU3RyaW5nKCl9YDtcbiAgICAgICAgfVxuICAgIH1cbn0iLCIndXNlIHN0cmljdCc7XG5cbihmdW5jdGlvbigpIHtcbiAgZnVuY3Rpb24gdG9BcnJheShhcnIpIHtcbiAgICByZXR1cm4gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJyKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHByb21pc2lmeVJlcXVlc3QocmVxdWVzdCkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgIHJlcXVlc3Qub25zdWNjZXNzID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHJlc29sdmUocmVxdWVzdC5yZXN1bHQpO1xuICAgICAgfTtcblxuICAgICAgcmVxdWVzdC5vbmVycm9yID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHJlamVjdChyZXF1ZXN0LmVycm9yKTtcbiAgICAgIH07XG4gICAgfSk7XG4gIH1cblxuICBmdW5jdGlvbiBwcm9taXNpZnlSZXF1ZXN0Q2FsbChvYmosIG1ldGhvZCwgYXJncykge1xuICAgIHZhciByZXF1ZXN0O1xuICAgIHZhciBwID0gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICByZXF1ZXN0ID0gb2JqW21ldGhvZF0uYXBwbHkob2JqLCBhcmdzKTtcbiAgICAgIHByb21pc2lmeVJlcXVlc3QocmVxdWVzdCkudGhlbihyZXNvbHZlLCByZWplY3QpO1xuICAgIH0pO1xuXG4gICAgcC5yZXF1ZXN0ID0gcmVxdWVzdDtcbiAgICByZXR1cm4gcDtcbiAgfVxuXG4gIGZ1bmN0aW9uIHByb21pc2lmeUN1cnNvclJlcXVlc3RDYWxsKG9iaiwgbWV0aG9kLCBhcmdzKSB7XG4gICAgdmFyIHAgPSBwcm9taXNpZnlSZXF1ZXN0Q2FsbChvYmosIG1ldGhvZCwgYXJncyk7XG4gICAgcmV0dXJuIHAudGhlbihmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgaWYgKCF2YWx1ZSkgcmV0dXJuO1xuICAgICAgcmV0dXJuIG5ldyBDdXJzb3IodmFsdWUsIHAucmVxdWVzdCk7XG4gICAgfSk7XG4gIH1cblxuICBmdW5jdGlvbiBwcm94eVByb3BlcnRpZXMoUHJveHlDbGFzcywgdGFyZ2V0UHJvcCwgcHJvcGVydGllcykge1xuICAgIHByb3BlcnRpZXMuZm9yRWFjaChmdW5jdGlvbihwcm9wKSB7XG4gICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoUHJveHlDbGFzcy5wcm90b3R5cGUsIHByb3AsIHtcbiAgICAgICAgZ2V0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgICByZXR1cm4gdGhpc1t0YXJnZXRQcm9wXVtwcm9wXTtcbiAgICAgICAgfSxcbiAgICAgICAgc2V0OiBmdW5jdGlvbih2YWwpIHtcbiAgICAgICAgICB0aGlzW3RhcmdldFByb3BdW3Byb3BdID0gdmFsO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHByb3h5UmVxdWVzdE1ldGhvZHMoUHJveHlDbGFzcywgdGFyZ2V0UHJvcCwgQ29uc3RydWN0b3IsIHByb3BlcnRpZXMpIHtcbiAgICBwcm9wZXJ0aWVzLmZvckVhY2goZnVuY3Rpb24ocHJvcCkge1xuICAgICAgaWYgKCEocHJvcCBpbiBDb25zdHJ1Y3Rvci5wcm90b3R5cGUpKSByZXR1cm47XG4gICAgICBQcm94eUNsYXNzLnByb3RvdHlwZVtwcm9wXSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gcHJvbWlzaWZ5UmVxdWVzdENhbGwodGhpc1t0YXJnZXRQcm9wXSwgcHJvcCwgYXJndW1lbnRzKTtcbiAgICAgIH07XG4gICAgfSk7XG4gIH1cblxuICBmdW5jdGlvbiBwcm94eU1ldGhvZHMoUHJveHlDbGFzcywgdGFyZ2V0UHJvcCwgQ29uc3RydWN0b3IsIHByb3BlcnRpZXMpIHtcbiAgICBwcm9wZXJ0aWVzLmZvckVhY2goZnVuY3Rpb24ocHJvcCkge1xuICAgICAgaWYgKCEocHJvcCBpbiBDb25zdHJ1Y3Rvci5wcm90b3R5cGUpKSByZXR1cm47XG4gICAgICBQcm94eUNsYXNzLnByb3RvdHlwZVtwcm9wXSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gdGhpc1t0YXJnZXRQcm9wXVtwcm9wXS5hcHBseSh0aGlzW3RhcmdldFByb3BdLCBhcmd1bWVudHMpO1xuICAgICAgfTtcbiAgICB9KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHByb3h5Q3Vyc29yUmVxdWVzdE1ldGhvZHMoUHJveHlDbGFzcywgdGFyZ2V0UHJvcCwgQ29uc3RydWN0b3IsIHByb3BlcnRpZXMpIHtcbiAgICBwcm9wZXJ0aWVzLmZvckVhY2goZnVuY3Rpb24ocHJvcCkge1xuICAgICAgaWYgKCEocHJvcCBpbiBDb25zdHJ1Y3Rvci5wcm90b3R5cGUpKSByZXR1cm47XG4gICAgICBQcm94eUNsYXNzLnByb3RvdHlwZVtwcm9wXSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gcHJvbWlzaWZ5Q3Vyc29yUmVxdWVzdENhbGwodGhpc1t0YXJnZXRQcm9wXSwgcHJvcCwgYXJndW1lbnRzKTtcbiAgICAgIH07XG4gICAgfSk7XG4gIH1cblxuICBmdW5jdGlvbiBJbmRleChpbmRleCkge1xuICAgIHRoaXMuX2luZGV4ID0gaW5kZXg7XG4gIH1cblxuICBwcm94eVByb3BlcnRpZXMoSW5kZXgsICdfaW5kZXgnLCBbXG4gICAgJ25hbWUnLFxuICAgICdrZXlQYXRoJyxcbiAgICAnbXVsdGlFbnRyeScsXG4gICAgJ3VuaXF1ZSdcbiAgXSk7XG5cbiAgcHJveHlSZXF1ZXN0TWV0aG9kcyhJbmRleCwgJ19pbmRleCcsIElEQkluZGV4LCBbXG4gICAgJ2dldCcsXG4gICAgJ2dldEtleScsXG4gICAgJ2dldEFsbCcsXG4gICAgJ2dldEFsbEtleXMnLFxuICAgICdjb3VudCdcbiAgXSk7XG5cbiAgcHJveHlDdXJzb3JSZXF1ZXN0TWV0aG9kcyhJbmRleCwgJ19pbmRleCcsIElEQkluZGV4LCBbXG4gICAgJ29wZW5DdXJzb3InLFxuICAgICdvcGVuS2V5Q3Vyc29yJ1xuICBdKTtcblxuICBmdW5jdGlvbiBDdXJzb3IoY3Vyc29yLCByZXF1ZXN0KSB7XG4gICAgdGhpcy5fY3Vyc29yID0gY3Vyc29yO1xuICAgIHRoaXMuX3JlcXVlc3QgPSByZXF1ZXN0O1xuICB9XG5cbiAgcHJveHlQcm9wZXJ0aWVzKEN1cnNvciwgJ19jdXJzb3InLCBbXG4gICAgJ2RpcmVjdGlvbicsXG4gICAgJ2tleScsXG4gICAgJ3ByaW1hcnlLZXknLFxuICAgICd2YWx1ZSdcbiAgXSk7XG5cbiAgcHJveHlSZXF1ZXN0TWV0aG9kcyhDdXJzb3IsICdfY3Vyc29yJywgSURCQ3Vyc29yLCBbXG4gICAgJ3VwZGF0ZScsXG4gICAgJ2RlbGV0ZSdcbiAgXSk7XG5cbiAgLy8gcHJveHkgJ25leHQnIG1ldGhvZHNcbiAgWydhZHZhbmNlJywgJ2NvbnRpbnVlJywgJ2NvbnRpbnVlUHJpbWFyeUtleSddLmZvckVhY2goZnVuY3Rpb24obWV0aG9kTmFtZSkge1xuICAgIGlmICghKG1ldGhvZE5hbWUgaW4gSURCQ3Vyc29yLnByb3RvdHlwZSkpIHJldHVybjtcbiAgICBDdXJzb3IucHJvdG90eXBlW21ldGhvZE5hbWVdID0gZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgY3Vyc29yID0gdGhpcztcbiAgICAgIHZhciBhcmdzID0gYXJndW1lbnRzO1xuICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpLnRoZW4oZnVuY3Rpb24oKSB7XG4gICAgICAgIGN1cnNvci5fY3Vyc29yW21ldGhvZE5hbWVdLmFwcGx5KGN1cnNvci5fY3Vyc29yLCBhcmdzKTtcbiAgICAgICAgcmV0dXJuIHByb21pc2lmeVJlcXVlc3QoY3Vyc29yLl9yZXF1ZXN0KS50aGVuKGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICAgICAgaWYgKCF2YWx1ZSkgcmV0dXJuO1xuICAgICAgICAgIHJldHVybiBuZXcgQ3Vyc29yKHZhbHVlLCBjdXJzb3IuX3JlcXVlc3QpO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH07XG4gIH0pO1xuXG4gIGZ1bmN0aW9uIE9iamVjdFN0b3JlKHN0b3JlKSB7XG4gICAgdGhpcy5fc3RvcmUgPSBzdG9yZTtcbiAgfVxuXG4gIE9iamVjdFN0b3JlLnByb3RvdHlwZS5jcmVhdGVJbmRleCA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiBuZXcgSW5kZXgodGhpcy5fc3RvcmUuY3JlYXRlSW5kZXguYXBwbHkodGhpcy5fc3RvcmUsIGFyZ3VtZW50cykpO1xuICB9O1xuXG4gIE9iamVjdFN0b3JlLnByb3RvdHlwZS5pbmRleCA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiBuZXcgSW5kZXgodGhpcy5fc3RvcmUuaW5kZXguYXBwbHkodGhpcy5fc3RvcmUsIGFyZ3VtZW50cykpO1xuICB9O1xuXG4gIHByb3h5UHJvcGVydGllcyhPYmplY3RTdG9yZSwgJ19zdG9yZScsIFtcbiAgICAnbmFtZScsXG4gICAgJ2tleVBhdGgnLFxuICAgICdpbmRleE5hbWVzJyxcbiAgICAnYXV0b0luY3JlbWVudCdcbiAgXSk7XG5cbiAgcHJveHlSZXF1ZXN0TWV0aG9kcyhPYmplY3RTdG9yZSwgJ19zdG9yZScsIElEQk9iamVjdFN0b3JlLCBbXG4gICAgJ3B1dCcsXG4gICAgJ2FkZCcsXG4gICAgJ2RlbGV0ZScsXG4gICAgJ2NsZWFyJyxcbiAgICAnZ2V0JyxcbiAgICAnZ2V0QWxsJyxcbiAgICAnZ2V0S2V5JyxcbiAgICAnZ2V0QWxsS2V5cycsXG4gICAgJ2NvdW50J1xuICBdKTtcblxuICBwcm94eUN1cnNvclJlcXVlc3RNZXRob2RzKE9iamVjdFN0b3JlLCAnX3N0b3JlJywgSURCT2JqZWN0U3RvcmUsIFtcbiAgICAnb3BlbkN1cnNvcicsXG4gICAgJ29wZW5LZXlDdXJzb3InXG4gIF0pO1xuXG4gIHByb3h5TWV0aG9kcyhPYmplY3RTdG9yZSwgJ19zdG9yZScsIElEQk9iamVjdFN0b3JlLCBbXG4gICAgJ2RlbGV0ZUluZGV4J1xuICBdKTtcblxuICBmdW5jdGlvbiBUcmFuc2FjdGlvbihpZGJUcmFuc2FjdGlvbikge1xuICAgIHRoaXMuX3R4ID0gaWRiVHJhbnNhY3Rpb247XG4gICAgdGhpcy5jb21wbGV0ZSA9IG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgaWRiVHJhbnNhY3Rpb24ub25jb21wbGV0ZSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXNvbHZlKCk7XG4gICAgICB9O1xuICAgICAgaWRiVHJhbnNhY3Rpb24ub25lcnJvciA9IGZ1bmN0aW9uKCkge1xuICAgICAgICByZWplY3QoaWRiVHJhbnNhY3Rpb24uZXJyb3IpO1xuICAgICAgfTtcbiAgICAgIGlkYlRyYW5zYWN0aW9uLm9uYWJvcnQgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgcmVqZWN0KGlkYlRyYW5zYWN0aW9uLmVycm9yKTtcbiAgICAgIH07XG4gICAgfSk7XG4gIH1cblxuICBUcmFuc2FjdGlvbi5wcm90b3R5cGUub2JqZWN0U3RvcmUgPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gbmV3IE9iamVjdFN0b3JlKHRoaXMuX3R4Lm9iamVjdFN0b3JlLmFwcGx5KHRoaXMuX3R4LCBhcmd1bWVudHMpKTtcbiAgfTtcblxuICBwcm94eVByb3BlcnRpZXMoVHJhbnNhY3Rpb24sICdfdHgnLCBbXG4gICAgJ29iamVjdFN0b3JlTmFtZXMnLFxuICAgICdtb2RlJ1xuICBdKTtcblxuICBwcm94eU1ldGhvZHMoVHJhbnNhY3Rpb24sICdfdHgnLCBJREJUcmFuc2FjdGlvbiwgW1xuICAgICdhYm9ydCdcbiAgXSk7XG5cbiAgZnVuY3Rpb24gVXBncmFkZURCKGRiLCBvbGRWZXJzaW9uLCB0cmFuc2FjdGlvbikge1xuICAgIHRoaXMuX2RiID0gZGI7XG4gICAgdGhpcy5vbGRWZXJzaW9uID0gb2xkVmVyc2lvbjtcbiAgICB0aGlzLnRyYW5zYWN0aW9uID0gbmV3IFRyYW5zYWN0aW9uKHRyYW5zYWN0aW9uKTtcbiAgfVxuXG4gIFVwZ3JhZGVEQi5wcm90b3R5cGUuY3JlYXRlT2JqZWN0U3RvcmUgPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gbmV3IE9iamVjdFN0b3JlKHRoaXMuX2RiLmNyZWF0ZU9iamVjdFN0b3JlLmFwcGx5KHRoaXMuX2RiLCBhcmd1bWVudHMpKTtcbiAgfTtcblxuICBwcm94eVByb3BlcnRpZXMoVXBncmFkZURCLCAnX2RiJywgW1xuICAgICduYW1lJyxcbiAgICAndmVyc2lvbicsXG4gICAgJ29iamVjdFN0b3JlTmFtZXMnXG4gIF0pO1xuXG4gIHByb3h5TWV0aG9kcyhVcGdyYWRlREIsICdfZGInLCBJREJEYXRhYmFzZSwgW1xuICAgICdkZWxldGVPYmplY3RTdG9yZScsXG4gICAgJ2Nsb3NlJ1xuICBdKTtcblxuICBmdW5jdGlvbiBEQihkYikge1xuICAgIHRoaXMuX2RiID0gZGI7XG4gIH1cblxuICBEQi5wcm90b3R5cGUudHJhbnNhY3Rpb24gPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gbmV3IFRyYW5zYWN0aW9uKHRoaXMuX2RiLnRyYW5zYWN0aW9uLmFwcGx5KHRoaXMuX2RiLCBhcmd1bWVudHMpKTtcbiAgfTtcblxuICBwcm94eVByb3BlcnRpZXMoREIsICdfZGInLCBbXG4gICAgJ25hbWUnLFxuICAgICd2ZXJzaW9uJyxcbiAgICAnb2JqZWN0U3RvcmVOYW1lcydcbiAgXSk7XG5cbiAgcHJveHlNZXRob2RzKERCLCAnX2RiJywgSURCRGF0YWJhc2UsIFtcbiAgICAnY2xvc2UnXG4gIF0pO1xuXG4gIC8vIEFkZCBjdXJzb3IgaXRlcmF0b3JzXG4gIC8vIFRPRE86IHJlbW92ZSB0aGlzIG9uY2UgYnJvd3NlcnMgZG8gdGhlIHJpZ2h0IHRoaW5nIHdpdGggcHJvbWlzZXNcbiAgWydvcGVuQ3Vyc29yJywgJ29wZW5LZXlDdXJzb3InXS5mb3JFYWNoKGZ1bmN0aW9uKGZ1bmNOYW1lKSB7XG4gICAgW09iamVjdFN0b3JlLCBJbmRleF0uZm9yRWFjaChmdW5jdGlvbihDb25zdHJ1Y3Rvcikge1xuICAgICAgLy8gRG9uJ3QgY3JlYXRlIGl0ZXJhdGVLZXlDdXJzb3IgaWYgb3BlbktleUN1cnNvciBkb2Vzbid0IGV4aXN0LlxuICAgICAgaWYgKCEoZnVuY05hbWUgaW4gQ29uc3RydWN0b3IucHJvdG90eXBlKSkgcmV0dXJuO1xuXG4gICAgICBDb25zdHJ1Y3Rvci5wcm90b3R5cGVbZnVuY05hbWUucmVwbGFjZSgnb3BlbicsICdpdGVyYXRlJyldID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBhcmdzID0gdG9BcnJheShhcmd1bWVudHMpO1xuICAgICAgICB2YXIgY2FsbGJhY2sgPSBhcmdzW2FyZ3MubGVuZ3RoIC0gMV07XG4gICAgICAgIHZhciBuYXRpdmVPYmplY3QgPSB0aGlzLl9zdG9yZSB8fCB0aGlzLl9pbmRleDtcbiAgICAgICAgdmFyIHJlcXVlc3QgPSBuYXRpdmVPYmplY3RbZnVuY05hbWVdLmFwcGx5KG5hdGl2ZU9iamVjdCwgYXJncy5zbGljZSgwLCAtMSkpO1xuICAgICAgICByZXF1ZXN0Lm9uc3VjY2VzcyA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIGNhbGxiYWNrKHJlcXVlc3QucmVzdWx0KTtcbiAgICAgICAgfTtcbiAgICAgIH07XG4gICAgfSk7XG4gIH0pO1xuXG4gIC8vIHBvbHlmaWxsIGdldEFsbFxuICBbSW5kZXgsIE9iamVjdFN0b3JlXS5mb3JFYWNoKGZ1bmN0aW9uKENvbnN0cnVjdG9yKSB7XG4gICAgaWYgKENvbnN0cnVjdG9yLnByb3RvdHlwZS5nZXRBbGwpIHJldHVybjtcbiAgICBDb25zdHJ1Y3Rvci5wcm90b3R5cGUuZ2V0QWxsID0gZnVuY3Rpb24ocXVlcnksIGNvdW50KSB7XG4gICAgICB2YXIgaW5zdGFuY2UgPSB0aGlzO1xuICAgICAgdmFyIGl0ZW1zID0gW107XG5cbiAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlKSB7XG4gICAgICAgIGluc3RhbmNlLml0ZXJhdGVDdXJzb3IocXVlcnksIGZ1bmN0aW9uKGN1cnNvcikge1xuICAgICAgICAgIGlmICghY3Vyc29yKSB7XG4gICAgICAgICAgICByZXNvbHZlKGl0ZW1zKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG4gICAgICAgICAgaXRlbXMucHVzaChjdXJzb3IudmFsdWUpO1xuXG4gICAgICAgICAgaWYgKGNvdW50ICE9PSB1bmRlZmluZWQgJiYgaXRlbXMubGVuZ3RoID09IGNvdW50KSB7XG4gICAgICAgICAgICByZXNvbHZlKGl0ZW1zKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG4gICAgICAgICAgY3Vyc29yLmNvbnRpbnVlKCk7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfTtcbiAgfSk7XG5cbiAgdmFyIGV4cCA9IHtcbiAgICBvcGVuOiBmdW5jdGlvbihuYW1lLCB2ZXJzaW9uLCB1cGdyYWRlQ2FsbGJhY2spIHtcbiAgICAgIHZhciBwID0gcHJvbWlzaWZ5UmVxdWVzdENhbGwoaW5kZXhlZERCLCAnb3BlbicsIFtuYW1lLCB2ZXJzaW9uXSk7XG4gICAgICB2YXIgcmVxdWVzdCA9IHAucmVxdWVzdDtcblxuICAgICAgaWYgKHJlcXVlc3QpIHtcbiAgICAgICAgcmVxdWVzdC5vbnVwZ3JhZGVuZWVkZWQgPSBmdW5jdGlvbihldmVudCkge1xuICAgICAgICAgIGlmICh1cGdyYWRlQ2FsbGJhY2spIHtcbiAgICAgICAgICAgIHVwZ3JhZGVDYWxsYmFjayhuZXcgVXBncmFkZURCKHJlcXVlc3QucmVzdWx0LCBldmVudC5vbGRWZXJzaW9uLCByZXF1ZXN0LnRyYW5zYWN0aW9uKSk7XG4gICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gcC50aGVuKGZ1bmN0aW9uKGRiKSB7XG4gICAgICAgIHJldHVybiBuZXcgREIoZGIpO1xuICAgICAgfSk7XG4gICAgfSxcbiAgICBkZWxldGU6IGZ1bmN0aW9uKG5hbWUpIHtcbiAgICAgIHJldHVybiBwcm9taXNpZnlSZXF1ZXN0Q2FsbChpbmRleGVkREIsICdkZWxldGVEYXRhYmFzZScsIFtuYW1lXSk7XG4gICAgfVxuICB9O1xuXG4gIGlmICh0eXBlb2YgbW9kdWxlICE9PSAndW5kZWZpbmVkJykge1xuICAgIG1vZHVsZS5leHBvcnRzID0gZXhwO1xuICAgIG1vZHVsZS5leHBvcnRzLmRlZmF1bHQgPSBtb2R1bGUuZXhwb3J0cztcbiAgfVxuICBlbHNlIHtcbiAgICBzZWxmLmlkYiA9IGV4cDtcbiAgfVxufSgpKTtcbiJdLCJzb3VyY2VSb290IjoiIn0=