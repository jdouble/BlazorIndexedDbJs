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
            try {
                if (!this.dbInstance || this.dbInstance.version < database.version) {
                    if (this.dbInstance) {
                        this.dbInstance.close();
                    }
                    this.dbInstance = yield idb_1.default.open(database.name, database.version, upgradeDB => {
                        this.upgradeDatabase(upgradeDB, database);
                    });
                }
            }
            catch (e) {
                this.dbInstance = yield idb_1.default.open(database.name);
            }
            return `IndexedDB ${database.name} opened`;
        });
        this.deleteDb = (dbName) => __awaiter(this, void 0, void 0, function* () {
            this.dbInstance.close();
            yield idb_1.default.delete(dbName);
            this.dbInstance = undefined;
            return `The database ${dbName} has been deleted`;
        });
        this.getDbInfo = (dbName) => __awaiter(this, void 0, void 0, function* () {
            if (!this.dbInstance) {
                this.dbInstance = yield idb_1.default.open(dbName);
            }
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
        });
        this.get = (storename, key) => __awaiter(this, void 0, void 0, function* () {
            const tx = this.getTransaction(this.dbInstance, storename, 'readonly');
            let result = yield tx.objectStore(storename).get(key);
            yield tx.complete;
            return result;
        });
        this.getAll = (storeName, key, count) => __awaiter(this, void 0, void 0, function* () {
            const tx = this.getTransaction(this.dbInstance, storeName, 'readonly');
            let results = yield tx.objectStore(storeName).getAll(key !== null && key !== void 0 ? key : undefined, count !== null && count !== void 0 ? count : undefined);
            yield tx.complete;
            return results;
        });
        this.getAllByKeyRange = (storeName, lower, upper, lowerOpen, upperOpen, count) => __awaiter(this, void 0, void 0, function* () {
            return yield this.getAll(storeName, IDBKeyRange.bound(lower, upper, lowerOpen, upperOpen), count);
        });
        this.getAllByArrayKey = (storeName, key) => __awaiter(this, void 0, void 0, function* () {
            const tx = this.getTransaction(this.dbInstance, storeName, 'readonly');
            const sx = tx.objectStore(storeName);
            let results = [];
            for (let index = 0; index < key.length; index++) {
                const element = key[index];
                results.push(yield sx.get(element));
            }
            yield tx.complete;
            return results;
        });
        this.count = (storeName, key) => __awaiter(this, void 0, void 0, function* () {
            const tx = this.getTransaction(this.dbInstance, storeName, 'readonly');
            let result = yield tx.objectStore(storeName).count(key !== null && key !== void 0 ? key : undefined);
            yield tx.complete;
            return result;
        });
        this.countByKeyRange = (storeName, lower, upper, lowerOpen, upperOpen) => __awaiter(this, void 0, void 0, function* () {
            return yield this.count(storeName, IDBKeyRange.bound(lower, upper, lowerOpen, upperOpen));
        });
        this.query = (storeName, filter, count = 0, skip = 0) => __awaiter(this, void 0, void 0, function* () {
            const tx = this.getTransaction(this.dbInstance, storeName, 'readonly');
            try {
                var func = new Function('obj', filter);
            }
            catch (e) {
                throw `${e.message} in filter { ${filter} }`;
            }
            var row = 0;
            var error = "";
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
                catch (e) {
                    error = `obj: ${JSON.stringify(cursor.value)}\nfilter: ${filter}\nerror: ${e.message}`;
                    return;
                }
                if (count > 0 && results.length >= count) {
                    return;
                }
                cursor.continue();
            });
            yield tx.complete;
            if (error) {
                throw error;
            }
            return results;
        });
        this.getFromIndex = (storeName, indexName, key) => __awaiter(this, void 0, void 0, function* () {
            const tx = this.getTransaction(this.dbInstance, storeName, 'readonly');
            const results = yield tx.objectStore(storeName).index(indexName).get(key);
            yield tx.complete;
            return results;
        });
        this.getAllFromIndex = (storeName, indexName, key, count) => __awaiter(this, void 0, void 0, function* () {
            const tx = this.getTransaction(this.dbInstance, storeName, 'readonly');
            const results = yield tx.objectStore(storeName).index(indexName).getAll(key !== null && key !== void 0 ? key : undefined, count !== null && count !== void 0 ? count : undefined);
            yield tx.complete;
            return results;
        });
        this.getAllFromIndexByKeyRange = (storeName, indexName, lower, upper, lowerOpen, upperOpen, count) => __awaiter(this, void 0, void 0, function* () {
            return yield this.getAllFromIndex(storeName, indexName, IDBKeyRange.bound(lower, upper, lowerOpen, upperOpen), count);
        });
        this.getAllFromIndexArrayKey = (storeName, indexName, key) => __awaiter(this, void 0, void 0, function* () {
            const tx = this.getTransaction(this.dbInstance, storeName, 'readonly');
            const dx = tx.objectStore(storeName).index(indexName);
            let results = [];
            for (let index = 0; index < key.length; index++) {
                const element = key[index];
                results.push(yield dx.get(element));
            }
            yield tx.complete;
            return results;
        });
        this.countFromIndex = (storeName, indexName, key) => __awaiter(this, void 0, void 0, function* () {
            const tx = this.getTransaction(this.dbInstance, storeName, 'readonly');
            let result = yield tx.objectStore(storeName).index(indexName).count(key !== null && key !== void 0 ? key : undefined);
            yield tx.complete;
            return result;
        });
        this.countFromIndexByKeyRange = (storeName, indexName, lower, upper, lowerOpen, upperOpen) => __awaiter(this, void 0, void 0, function* () {
            return yield this.countFromIndex(storeName, indexName, IDBKeyRange.bound(lower, upper, lowerOpen, upperOpen));
        });
        this.queryFromIndex = (storeName, indexName, filter, count = 0, skip = 0) => __awaiter(this, void 0, void 0, function* () {
            const tx = this.getTransaction(this.dbInstance, storeName, 'readonly');
            try {
                var func = new Function('obj', filter);
            }
            catch (e) {
                throw `${e.message} in filter { ${filter} }`;
            }
            var row = 0;
            var error = "";
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
                catch (e) {
                    error = `obj: ${JSON.stringify(cursor.value)}\nfilter: ${filter}\nerror: ${e.message}`;
                    return;
                }
                if (count > 0 && results.length >= count) {
                    return;
                }
                cursor.continue();
            });
            yield tx.complete;
            if (error) {
                throw error;
            }
            return results;
        });
        this.add = (storename, data, key) => __awaiter(this, void 0, void 0, function* () {
            const tx = this.getTransaction(this.dbInstance, storename, 'readwrite');
            const objectStore = tx.objectStore(storename);
            data = this.checkForKeyPath(objectStore, data);
            const result = yield objectStore.add(data, key !== null && key !== void 0 ? key : undefined);
            yield tx.complete;
            return `Added new record with id ${result}`;
        });
        this.put = (storename, data, key) => __awaiter(this, void 0, void 0, function* () {
            const tx = this.getTransaction(this.dbInstance, storename, 'readwrite');
            const result = yield tx.objectStore(storename).put(data, key !== null && key !== void 0 ? key : undefined);
            yield tx.complete;
            return `updated record with id ${result}`;
        });
        this.delete = (storename, id) => __awaiter(this, void 0, void 0, function* () {
            const tx = this.getTransaction(this.dbInstance, storename, 'readwrite');
            yield tx.objectStore(storename).delete(id);
            yield tx.complete;
            return `Record with id: ${id} deleted`;
        });
        this.batchAdd = (storename, data) => __awaiter(this, void 0, void 0, function* () {
            const tx = this.getTransaction(this.dbInstance, storename, 'readwrite');
            const objectStore = tx.objectStore(storename);
            data.forEach((element) => __awaiter(this, void 0, void 0, function* () {
                let item = this.checkForKeyPath(objectStore, element);
                yield objectStore.add(item);
            }));
            yield tx.complete;
            return `Added ${data.length} records`;
        });
        this.batchPut = (storename, data) => __awaiter(this, void 0, void 0, function* () {
            const tx = this.getTransaction(this.dbInstance, storename, 'readwrite');
            data.forEach((element) => __awaiter(this, void 0, void 0, function* () {
                yield tx.objectStore(storename).put(element);
            }));
            yield tx.complete;
            return `updated ${data.length} records`;
        });
        this.batchDelete = (storename, ids) => __awaiter(this, void 0, void 0, function* () {
            const tx = this.getTransaction(this.dbInstance, storename, 'readwrite');
            ids.forEach((element) => __awaiter(this, void 0, void 0, function* () {
                yield tx.objectStore(storename).delete(element);
            }));
            yield tx.complete;
            return `Deleted ${ids.length} records`;
        });
        this.clearStore = (storeName) => __awaiter(this, void 0, void 0, function* () {
            const tx = this.getTransaction(this.dbInstance, storeName, 'readwrite');
            yield tx.objectStore(storeName).clear();
            yield tx.complete;
            return `Store ${storeName} cleared`;
        });
    }
    getTransaction(dbInstance, stName, mode) {
        const tx = dbInstance.transaction(stName, mode);
        tx.complete.catch(err => {
            if (err) {
                console.error(err.message);
            }
            else {
                console.error('Undefined error in getTransaction()');
            }
        });
        return tx;
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
    upgradeDatabase(upgradeDB, dbStore) {
        if (upgradeDB.oldVersion < dbStore.version) {
            if (dbStore.objectStores) {
                for (var store of dbStore.objectStores) {
                    if (!upgradeDB.objectStoreNames.contains(store.name)) {
                        this.addNewStore(upgradeDB, store);
                    }
                }
            }
        }
    }
    addNewStore(upgradeDB, store) {
        var _a, _b, _c;
        let primaryKey = store.primaryKey;
        if (!primaryKey) {
            primaryKey = { name: 'id', keyPath: 'id', multiEntry: false, unique: false, autoIncrement: true };
        }
        const newStore = upgradeDB.createObjectStore(store.name, {
            keyPath: (_a = primaryKey.keyPath) !== null && _a !== void 0 ? _a : primaryKey.multiKeyPath,
            autoIncrement: primaryKey.autoIncrement
        });
        for (var index of store.indexes) {
            newStore.createIndex(index.name, (_c = (_b = index.keyPath) !== null && _b !== void 0 ? _b : index.multiKeyPath) !== null && _c !== void 0 ? _c : index.name, {
                multiEntry: index.multiEntry,
                unique: index.unique
            });
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L0luaXRpYWxpc2VJbmRleERiQmxhem9yLnRzIiwid2VicGFjazovLy8uL2NsaWVudC9pbmRleGVkRGJCbGF6b3IudHMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2lkYi9saWIvaWRiLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7UUFBQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTs7O1FBR0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDBDQUEwQyxnQ0FBZ0M7UUFDMUU7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSx3REFBd0Qsa0JBQWtCO1FBQzFFO1FBQ0EsaURBQWlELGNBQWM7UUFDL0Q7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLHlDQUF5QyxpQ0FBaUM7UUFDMUUsZ0hBQWdILG1CQUFtQixFQUFFO1FBQ3JJO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMkJBQTJCLDBCQUEwQixFQUFFO1FBQ3ZELGlDQUFpQyxlQUFlO1FBQ2hEO1FBQ0E7UUFDQTs7UUFFQTtRQUNBLHNEQUFzRCwrREFBK0Q7O1FBRXJIO1FBQ0E7OztRQUdBO1FBQ0E7Ozs7Ozs7Ozs7Ozs7OztBQ2xGQSxzR0FBcUQ7QUFFckQsSUFBVSxPQUFPLENBbUJoQjtBQW5CRCxXQUFVLE9BQU87SUFDYixNQUFNLG1CQUFtQixHQUFXLG1CQUFtQixDQUFDO0lBQ3hELE1BQU0sZUFBZSxHQUFHO1FBQ3BCLFVBQVUsRUFBRSxJQUFJLGtDQUFnQixFQUFFO0tBQ3JDLENBQUM7SUFFRixTQUFnQixVQUFVO1FBQ3RCLElBQUksT0FBTyxNQUFNLEtBQUssV0FB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O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNULE9BQU87QUFDUDtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1QsT0FBTztBQUNQO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsT0FBTztBQUNQLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxNQUFNLElBQTZCO0FBQ25DO0FBQ0E7QUFDQTtBQUNBLE9BQU8sRUFFSjtBQUNILENBQUMiLCJmaWxlIjoiQmxhem9ySW5kZXhlZERiLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9jbGllbnQvSW5pdGlhbGlzZUluZGV4RGJCbGF6b3IudHNcIik7XG4iLCJpbXBvcnQgeyBJbmRleGVkRGJNYW5hZ2VyIH0gZnJvbSAnLi9pbmRleGVkRGJCbGF6b3InO1xuXG5uYW1lc3BhY2UgSW5kZXhEYiB7XG4gICAgY29uc3QgdGltZWdob3N0RXh0ZW5zaW9uczogc3RyaW5nID0gJ0JsYXpvckluZGV4ZWREYkpzJztcbiAgICBjb25zdCBleHRlbnNpb25PYmplY3QgPSB7XG4gICAgICAgIElEQk1hbmFnZXI6IG5ldyBJbmRleGVkRGJNYW5hZ2VyKClcbiAgICB9O1xuXG4gICAgZXhwb3J0IGZ1bmN0aW9uIGluaXRpYWxpc2UoKTogdm9pZCB7XG4gICAgICAgIGlmICh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyAmJiAhd2luZG93W3RpbWVnaG9zdEV4dGVuc2lvbnNdKSB7XG4gICAgICAgICAgICB3aW5kb3dbdGltZWdob3N0RXh0ZW5zaW9uc10gPSB7XG4gICAgICAgICAgICAgICAgLi4uZXh0ZW5zaW9uT2JqZWN0XG4gICAgICAgICAgICB9O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgd2luZG93W3RpbWVnaG9zdEV4dGVuc2lvbnNdID0ge1xuICAgICAgICAgICAgICAgIC4uLndpbmRvd1t0aW1lZ2hvc3RFeHRlbnNpb25zXSxcbiAgICAgICAgICAgICAgICAuLi5leHRlbnNpb25PYmplY3RcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cblxuICAgIH1cbn1cblxuSW5kZXhEYi5pbml0aWFsaXNlKCk7IiwiLy8vLy8gPHJlZmVyZW5jZSBwYXRoPVwiTWljcm9zb2Z0LkpTSW50ZXJvcC5kLnRzXCIvPlxuaW1wb3J0IGlkYiBmcm9tICcuLi9ub2RlX21vZHVsZXMvaWRiL2xpYi9pZGInO1xuaW1wb3J0IHsgREIsIFVwZ3JhZGVEQiwgT2JqZWN0U3RvcmUsIFRyYW5zYWN0aW9uIH0gZnJvbSAnLi4vbm9kZV9tb2R1bGVzL2lkYi9saWIvaWRiJztcbmltcG9ydCB7IElEYXRhYmFzZSwgSUluZGV4U2VhcmNoLCBJSW5kZXgsIElPYmplY3RTdG9yZSwgSUluZm9ybWF0aW9uIH0gZnJvbSAnLi9JbnRlcm9wSW50ZXJmYWNlcyc7XG5cbmV4cG9ydCBjbGFzcyBJbmRleGVkRGJNYW5hZ2VyIHtcblxuICAgIHByaXZhdGUgZGJJbnN0YW5jZTogYW55ID0gdW5kZWZpbmVkO1xuXG4gICAgY29uc3RydWN0b3IoKSB7IH1cblxuICAgIHB1YmxpYyBvcGVuRGIgPSBhc3luYyAoZGF0YWJhc2U6IElEYXRhYmFzZSk6IFByb21pc2U8c3RyaW5nPiA9PiB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBpZiAoIXRoaXMuZGJJbnN0YW5jZSB8fCB0aGlzLmRiSW5zdGFuY2UudmVyc2lvbiA8IGRhdGFiYXNlLnZlcnNpb24pIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5kYkluc3RhbmNlKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZGJJbnN0YW5jZS5jbG9zZSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aGlzLmRiSW5zdGFuY2UgPSBhd2FpdCBpZGIub3BlbihkYXRhYmFzZS5uYW1lLCBkYXRhYmFzZS52ZXJzaW9uLCB1cGdyYWRlREIgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnVwZ3JhZGVEYXRhYmFzZSh1cGdyYWRlREIsIGRhdGFiYXNlKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgdGhpcy5kYkluc3RhbmNlID0gYXdhaXQgaWRiLm9wZW4oZGF0YWJhc2UubmFtZSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gYEluZGV4ZWREQiAke2RhdGFiYXNlLm5hbWV9IG9wZW5lZGA7XG4gICAgfVxuXG4gICAgcHVibGljIGRlbGV0ZURiID0gYXN5bmMoZGJOYW1lOiBzdHJpbmcpOiBQcm9taXNlPHN0cmluZz4gPT4ge1xuICAgICAgICB0aGlzLmRiSW5zdGFuY2UuY2xvc2UoKTtcblxuICAgICAgICBhd2FpdCBpZGIuZGVsZXRlKGRiTmFtZSk7XG5cbiAgICAgICAgdGhpcy5kYkluc3RhbmNlID0gdW5kZWZpbmVkO1xuXG4gICAgICAgIHJldHVybiBgVGhlIGRhdGFiYXNlICR7ZGJOYW1lfSBoYXMgYmVlbiBkZWxldGVkYDtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0RGJJbmZvID0gYXN5bmMgKGRiTmFtZTogc3RyaW5nKSA6IFByb21pc2U8SUluZm9ybWF0aW9uPiA9PiB7XG4gICAgICAgIGlmICghdGhpcy5kYkluc3RhbmNlKSB7XG4gICAgICAgICAgICB0aGlzLmRiSW5zdGFuY2UgPSBhd2FpdCBpZGIub3BlbihkYk5hbWUpO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgY3VycmVudERiID0gPERCPnRoaXMuZGJJbnN0YW5jZTtcblxuICAgICAgICBsZXQgZ2V0U3RvcmVOYW1lcyA9IChsaXN0OiBET01TdHJpbmdMaXN0KTogc3RyaW5nW10gPT4ge1xuICAgICAgICAgICAgbGV0IG5hbWVzOiBzdHJpbmdbXSA9IFtdO1xuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgbmFtZXMucHVzaChsaXN0W2ldKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBuYW1lcztcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBkYkluZm86IElJbmZvcm1hdGlvbiA9IHtcbiAgICAgICAgICAgIHZlcnNpb246IGN1cnJlbnREYi52ZXJzaW9uLFxuICAgICAgICAgICAgb2JqZWN0U3RvcmVOYW1lczogZ2V0U3RvcmVOYW1lcyhjdXJyZW50RGIub2JqZWN0U3RvcmVOYW1lcylcbiAgICAgICAgfTtcblxuICAgICAgICByZXR1cm4gZGJJbmZvO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXQgPSBhc3luYyAoc3RvcmVuYW1lOiBzdHJpbmcsIGtleTogYW55KTogUHJvbWlzZTxhbnk+ID0+IHtcblxuICAgICAgICBjb25zdCB0eCA9IHRoaXMuZ2V0VHJhbnNhY3Rpb24odGhpcy5kYkluc3RhbmNlLCBzdG9yZW5hbWUsICdyZWFkb25seScpO1xuXG4gICAgICAgIGxldCByZXN1bHQgPSBhd2FpdCB0eC5vYmplY3RTdG9yZShzdG9yZW5hbWUpLmdldChrZXkpO1xuXG4gICAgICAgIGF3YWl0IHR4LmNvbXBsZXRlO1xuXG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuXG4gICAgcHVibGljIGdldEFsbCA9IGFzeW5jIChzdG9yZU5hbWU6IHN0cmluZywga2V5PzogYW55LCBjb3VudD86IG51bWJlcik6IFByb21pc2U8YW55PiA9PiB7XG4gICAgICAgIGNvbnN0IHR4ID0gdGhpcy5nZXRUcmFuc2FjdGlvbih0aGlzLmRiSW5zdGFuY2UsIHN0b3JlTmFtZSwgJ3JlYWRvbmx5Jyk7XG5cbiAgICAgICAgbGV0IHJlc3VsdHMgPSBhd2FpdCB0eC5vYmplY3RTdG9yZShzdG9yZU5hbWUpLmdldEFsbChrZXkgPz8gdW5kZWZpbmVkLCBjb3VudCA/PyB1bmRlZmluZWQpO1xuXG4gICAgICAgIGF3YWl0IHR4LmNvbXBsZXRlO1xuXG4gICAgICAgIHJldHVybiByZXN1bHRzO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXRBbGxCeUtleVJhbmdlID0gYXN5bmMgKHN0b3JlTmFtZTogc3RyaW5nLCBsb3dlcjogYW55LCB1cHBlcjogYW55LCBsb3dlck9wZW46IGJvb2xlYW4sIHVwcGVyT3BlbjogYm9vbGVhbiwgY291bnQ/OiBudW1iZXIpOiBQcm9taXNlPGFueT4gPT4ge1xuICAgICAgICByZXR1cm4gYXdhaXQgdGhpcy5nZXRBbGwoc3RvcmVOYW1lLCBJREJLZXlSYW5nZS5ib3VuZChsb3dlciwgdXBwZXIsIGxvd2VyT3BlbiwgdXBwZXJPcGVuKSwgY291bnQpO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXRBbGxCeUFycmF5S2V5ID0gYXN5bmMgKHN0b3JlTmFtZTogc3RyaW5nLCBrZXk6IGFueVtdKTogUHJvbWlzZTxhbnk+ID0+IHtcbiAgICAgICAgY29uc3QgdHggPSB0aGlzLmdldFRyYW5zYWN0aW9uKHRoaXMuZGJJbnN0YW5jZSwgc3RvcmVOYW1lLCAncmVhZG9ubHknKTtcbiAgICAgICAgY29uc3Qgc3ggPSB0eC5vYmplY3RTdG9yZShzdG9yZU5hbWUpO1xuXG4gICAgICAgIGxldCByZXN1bHRzOiBhbnlbXSA9IFtdO1xuXG4gICAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBrZXkubGVuZ3RoOyBpbmRleCsrKSB7XG4gICAgICAgICAgICBjb25zdCBlbGVtZW50ID0ga2V5W2luZGV4XTtcbiAgICAgICAgICAgIHJlc3VsdHMucHVzaChhd2FpdCBzeC5nZXQoZWxlbWVudCkpO1xuICAgICAgICB9XG5cbiAgICAgICAgYXdhaXQgdHguY29tcGxldGU7XG5cbiAgICAgICAgcmV0dXJuIHJlc3VsdHM7XG4gICAgfVxuXG4gICAgcHVibGljIGNvdW50ID0gYXN5bmMgKHN0b3JlTmFtZTogc3RyaW5nLCBrZXk/OiBhbnkpOiBQcm9taXNlPG51bWJlcj4gPT4ge1xuICAgICAgICBjb25zdCB0eCA9IHRoaXMuZ2V0VHJhbnNhY3Rpb24odGhpcy5kYkluc3RhbmNlLCBzdG9yZU5hbWUsICdyZWFkb25seScpO1xuXG4gICAgICAgIGxldCByZXN1bHQgPSBhd2FpdCB0eC5vYmplY3RTdG9yZShzdG9yZU5hbWUpLmNvdW50KGtleSA/PyB1bmRlZmluZWQpO1xuXG4gICAgICAgIGF3YWl0IHR4LmNvbXBsZXRlO1xuXG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuXG4gICAgcHVibGljIGNvdW50QnlLZXlSYW5nZSA9IGFzeW5jIChzdG9yZU5hbWU6IHN0cmluZywgbG93ZXI6IGFueSwgdXBwZXI6IGFueSwgbG93ZXJPcGVuOiBib29sZWFuLCB1cHBlck9wZW46IGJvb2xlYW4pOiBQcm9taXNlPG51bWJlcj4gPT4ge1xuICAgICAgICByZXR1cm4gYXdhaXQgdGhpcy5jb3VudChzdG9yZU5hbWUsIElEQktleVJhbmdlLmJvdW5kKGxvd2VyLCB1cHBlciwgbG93ZXJPcGVuLCB1cHBlck9wZW4pKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgcXVlcnkgPSBhc3luYyAoc3RvcmVOYW1lOiBzdHJpbmcsIGZpbHRlcjogc3RyaW5nLCBjb3VudDogbnVtYmVyID0gMCwgc2tpcDogbnVtYmVyID0gMCk6IFByb21pc2U8YW55PiA9PiB7XG4gICAgICAgIGNvbnN0IHR4ID0gdGhpcy5nZXRUcmFuc2FjdGlvbih0aGlzLmRiSW5zdGFuY2UsIHN0b3JlTmFtZSwgJ3JlYWRvbmx5Jyk7XG5cbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHZhciBmdW5jID0gbmV3IEZ1bmN0aW9uKCdvYmonLCBmaWx0ZXIpO1xuICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICB0aHJvdyBgJHsoZSBhcyBFcnJvcikubWVzc2FnZX0gaW4gZmlsdGVyIHsgJHtmaWx0ZXJ9IH1gXG4gICAgICAgIH1cblxuICAgICAgICB2YXIgcm93ID0gMDtcbiAgICAgICAgdmFyIGVycm9yID0gXCJcIjtcblxuICAgICAgICBsZXQgcmVzdWx0czogYW55W10gPSBbXTtcblxuICAgICAgICB0eC5vYmplY3RTdG9yZShzdG9yZU5hbWUpXG4gICAgICAgICAgICAuaXRlcmF0ZUN1cnNvcihjdXJzb3IgPT4ge1xuICAgICAgICAgICAgICAgIGlmICghY3Vyc29yKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGZ1bmMoY3Vyc29yLnZhbHVlKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcm93ICsrO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJvdyA+IHNraXApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXN1bHRzLnB1c2goY3Vyc29yLnZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjYXRjaCAoZSkge1xuICAgICAgICAgICAgICAgICAgICBlcnJvciA9IGBvYmo6ICR7SlNPTi5zdHJpbmdpZnkoY3Vyc29yLnZhbHVlKX1cXG5maWx0ZXI6ICR7ZmlsdGVyfVxcbmVycm9yOiAkeyhlIGFzIEVycm9yKS5tZXNzYWdlfWA7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKGNvdW50ID4gMCAmJiByZXN1bHRzLmxlbmd0aCA+PSBjb3VudCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGN1cnNvci5jb250aW51ZSgpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgYXdhaXQgdHguY29tcGxldGU7XG5cbiAgICAgICAgaWYgKGVycm9yKSB7XG4gICAgICAgICAgICB0aHJvdyBlcnJvcjtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiByZXN1bHRzO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXRGcm9tSW5kZXggPSBhc3luYyAoc3RvcmVOYW1lOiBzdHJpbmcsIGluZGV4TmFtZTogc3RyaW5nLCBrZXk6IGFueSk6IFByb21pc2U8YW55PiA9PiB7XG4gICAgICAgIGNvbnN0IHR4ID0gdGhpcy5nZXRUcmFuc2FjdGlvbih0aGlzLmRiSW5zdGFuY2UsIHN0b3JlTmFtZSwgJ3JlYWRvbmx5Jyk7XG5cbiAgICAgICAgY29uc3QgcmVzdWx0cyA9IGF3YWl0IHR4Lm9iamVjdFN0b3JlKHN0b3JlTmFtZSkuaW5kZXgoaW5kZXhOYW1lKS5nZXQoa2V5KTtcblxuICAgICAgICBhd2FpdCB0eC5jb21wbGV0ZTtcblxuICAgICAgICByZXR1cm4gcmVzdWx0cztcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0QWxsRnJvbUluZGV4ID0gYXN5bmMgKHN0b3JlTmFtZTogc3RyaW5nLCBpbmRleE5hbWU6IHN0cmluZywga2V5PzogYW55LCBjb3VudD86IG51bWJlcik6IFByb21pc2U8YW55PiA9PiB7XG4gICAgICAgIGNvbnN0IHR4ID0gdGhpcy5nZXRUcmFuc2FjdGlvbih0aGlzLmRiSW5zdGFuY2UsIHN0b3JlTmFtZSwgJ3JlYWRvbmx5Jyk7XG5cbiAgICAgICAgY29uc3QgcmVzdWx0cyA9IGF3YWl0IHR4Lm9iamVjdFN0b3JlKHN0b3JlTmFtZSkuaW5kZXgoaW5kZXhOYW1lKS5nZXRBbGwoa2V5ID8/IHVuZGVmaW5lZCwgY291bnQgPz8gdW5kZWZpbmVkKTtcblxuICAgICAgICBhd2FpdCB0eC5jb21wbGV0ZTtcblxuICAgICAgICByZXR1cm4gcmVzdWx0cztcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0QWxsRnJvbUluZGV4QnlLZXlSYW5nZSA9IGFzeW5jIChzdG9yZU5hbWU6IHN0cmluZywgaW5kZXhOYW1lOiBzdHJpbmcsIGxvd2VyOiBhbnksIHVwcGVyOiBhbnksIGxvd2VyT3BlbjogYm9vbGVhbiwgdXBwZXJPcGVuOiBib29sZWFuLCBjb3VudD86IG51bWJlcik6IFByb21pc2U8YW55PiA9PiB7XG4gICAgICAgIHJldHVybiBhd2FpdCB0aGlzLmdldEFsbEZyb21JbmRleChzdG9yZU5hbWUsIGluZGV4TmFtZSwgSURCS2V5UmFuZ2UuYm91bmQobG93ZXIsIHVwcGVyLCBsb3dlck9wZW4sIHVwcGVyT3BlbiksIGNvdW50KTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0QWxsRnJvbUluZGV4QXJyYXlLZXkgPSBhc3luYyAoc3RvcmVOYW1lOiBzdHJpbmcsIGluZGV4TmFtZTogc3RyaW5nLCBrZXk6IGFueVtdKTogUHJvbWlzZTxhbnk+ID0+IHtcbiAgICAgICAgY29uc3QgdHggPSB0aGlzLmdldFRyYW5zYWN0aW9uKHRoaXMuZGJJbnN0YW5jZSwgc3RvcmVOYW1lLCAncmVhZG9ubHknKTtcbiAgICAgICAgY29uc3QgZHggPSB0eC5vYmplY3RTdG9yZShzdG9yZU5hbWUpLmluZGV4KGluZGV4TmFtZSk7XG5cbiAgICAgICAgbGV0IHJlc3VsdHM6IGFueVtdID0gW107XG5cbiAgICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IGtleS5sZW5ndGg7IGluZGV4KyspIHtcbiAgICAgICAgICAgIGNvbnN0IGVsZW1lbnQgPSBrZXlbaW5kZXhdO1xuICAgICAgICAgICAgcmVzdWx0cy5wdXNoKGF3YWl0IGR4LmdldChlbGVtZW50KSk7XG4gICAgICAgIH1cblxuICAgICAgICBhd2FpdCB0eC5jb21wbGV0ZTtcblxuICAgICAgICByZXR1cm4gcmVzdWx0cztcbiAgICB9XG5cbiAgICBwdWJsaWMgY291bnRGcm9tSW5kZXggPSBhc3luYyAoc3RvcmVOYW1lOiBzdHJpbmcsIGluZGV4TmFtZTogc3RyaW5nLCBrZXk/OiBhbnkpOiBQcm9taXNlPG51bWJlcj4gPT4ge1xuICAgICAgICBjb25zdCB0eCA9IHRoaXMuZ2V0VHJhbnNhY3Rpb24odGhpcy5kYkluc3RhbmNlLCBzdG9yZU5hbWUsICdyZWFkb25seScpO1xuXG4gICAgICAgIGxldCByZXN1bHQgPSBhd2FpdCB0eC5vYmplY3RTdG9yZShzdG9yZU5hbWUpLmluZGV4KGluZGV4TmFtZSkuY291bnQoa2V5ID8/IHVuZGVmaW5lZCk7XG5cbiAgICAgICAgYXdhaXQgdHguY29tcGxldGU7XG5cbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG5cbiAgICBwdWJsaWMgY291bnRGcm9tSW5kZXhCeUtleVJhbmdlID0gYXN5bmMgKHN0b3JlTmFtZTogc3RyaW5nLCBpbmRleE5hbWU6IHN0cmluZywgbG93ZXI6IGFueSwgdXBwZXI6IGFueSwgbG93ZXJPcGVuOiBib29sZWFuLCB1cHBlck9wZW46IGJvb2xlYW4pOiBQcm9taXNlPG51bWJlcj4gPT4ge1xuICAgICAgICByZXR1cm4gYXdhaXQgdGhpcy5jb3VudEZyb21JbmRleChzdG9yZU5hbWUsIGluZGV4TmFtZSwgSURCS2V5UmFuZ2UuYm91bmQobG93ZXIsIHVwcGVyLCBsb3dlck9wZW4sIHVwcGVyT3BlbikpO1xuICAgIH1cblxuICAgIHB1YmxpYyBxdWVyeUZyb21JbmRleCA9IGFzeW5jIChzdG9yZU5hbWU6IHN0cmluZywgaW5kZXhOYW1lOiBzdHJpbmcsIGZpbHRlcjogc3RyaW5nLCBjb3VudDogbnVtYmVyID0gMCwgc2tpcDogbnVtYmVyID0gMCk6IFByb21pc2U8YW55PiA9PiB7XG4gICAgICAgIGNvbnN0IHR4ID0gdGhpcy5nZXRUcmFuc2FjdGlvbih0aGlzLmRiSW5zdGFuY2UsIHN0b3JlTmFtZSwgJ3JlYWRvbmx5Jyk7XG5cbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHZhciBmdW5jID0gbmV3IEZ1bmN0aW9uKCdvYmonLCBmaWx0ZXIpO1xuICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICB0aHJvdyBgJHsoZSBhcyBFcnJvcikubWVzc2FnZX0gaW4gZmlsdGVyIHsgJHtmaWx0ZXJ9IH1gXG4gICAgICAgIH1cblxuICAgICAgICB2YXIgcm93ID0gMDtcbiAgICAgICAgdmFyIGVycm9yID0gXCJcIjtcblxuICAgICAgICBsZXQgcmVzdWx0czogYW55W10gPSBbXTtcblxuICAgICAgICB0eC5vYmplY3RTdG9yZShzdG9yZU5hbWUpXG4gICAgICAgICAgICAuaW5kZXgoaW5kZXhOYW1lKVxuICAgICAgICAgICAgLml0ZXJhdGVDdXJzb3IoY3Vyc29yID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoIWN1cnNvcikge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChmdW5jKGN1cnNvci52YWx1ZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJvdyArKztcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyb3cgPiBza2lwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0cy5wdXNoKGN1cnNvci52YWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgICAgICAgICAgZXJyb3IgPSBgb2JqOiAke0pTT04uc3RyaW5naWZ5KGN1cnNvci52YWx1ZSl9XFxuZmlsdGVyOiAke2ZpbHRlcn1cXG5lcnJvcjogJHsoZSBhcyBFcnJvcikubWVzc2FnZX1gO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChjb3VudCA+IDAgJiYgcmVzdWx0cy5sZW5ndGggPj0gY291bnQpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjdXJzb3IuY29udGludWUoKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIGF3YWl0IHR4LmNvbXBsZXRlO1xuXG4gICAgICAgIGlmIChlcnJvcikge1xuICAgICAgICAgICAgdGhyb3cgZXJyb3I7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gcmVzdWx0cztcbiAgICB9XG5cbiAgICBwdWJsaWMgYWRkID0gYXN5bmMgKHN0b3JlbmFtZTogc3RyaW5nLCBkYXRhOiBhbnksIGtleT86IGFueSk6IFByb21pc2U8c3RyaW5nPiA9PiB7XG4gICAgICAgIGNvbnN0IHR4ID0gdGhpcy5nZXRUcmFuc2FjdGlvbih0aGlzLmRiSW5zdGFuY2UsIHN0b3JlbmFtZSwgJ3JlYWR3cml0ZScpO1xuICAgICAgICBjb25zdCBvYmplY3RTdG9yZSA9IHR4Lm9iamVjdFN0b3JlKHN0b3JlbmFtZSk7XG5cbiAgICAgICAgZGF0YSA9IHRoaXMuY2hlY2tGb3JLZXlQYXRoKG9iamVjdFN0b3JlLCBkYXRhKTtcblxuICAgICAgICBjb25zdCByZXN1bHQgPSBhd2FpdCBvYmplY3RTdG9yZS5hZGQoZGF0YSwga2V5ID8/IHVuZGVmaW5lZCk7XG5cbiAgICAgICAgYXdhaXQgdHguY29tcGxldGU7XG5cbiAgICAgICAgcmV0dXJuIGBBZGRlZCBuZXcgcmVjb3JkIHdpdGggaWQgJHtyZXN1bHR9YDtcbiAgICB9XG5cbiAgICBwdWJsaWMgcHV0ID0gYXN5bmMgKHN0b3JlbmFtZTogc3RyaW5nLCBkYXRhOiBhbnksIGtleT86IGFueSk6IFByb21pc2U8c3RyaW5nPiA9PiB7XG4gICAgICAgIGNvbnN0IHR4ID0gdGhpcy5nZXRUcmFuc2FjdGlvbih0aGlzLmRiSW5zdGFuY2UsIHN0b3JlbmFtZSwgJ3JlYWR3cml0ZScpO1xuXG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IHR4Lm9iamVjdFN0b3JlKHN0b3JlbmFtZSkucHV0KGRhdGEsIGtleSA/PyB1bmRlZmluZWQpO1xuXG4gICAgICAgIGF3YWl0IHR4LmNvbXBsZXRlO1xuXG4gICAgICAgIHJldHVybiBgdXBkYXRlZCByZWNvcmQgd2l0aCBpZCAke3Jlc3VsdH1gO1xuICAgIH1cblxuICAgIHB1YmxpYyBkZWxldGUgPSBhc3luYyAoc3RvcmVuYW1lOiBzdHJpbmcsIGlkOiBhbnkpOiBQcm9taXNlPHN0cmluZz4gPT4ge1xuICAgICAgICBjb25zdCB0eCA9IHRoaXMuZ2V0VHJhbnNhY3Rpb24odGhpcy5kYkluc3RhbmNlLCBzdG9yZW5hbWUsICdyZWFkd3JpdGUnKTtcblxuICAgICAgICBhd2FpdCB0eC5vYmplY3RTdG9yZShzdG9yZW5hbWUpLmRlbGV0ZShpZCk7XG5cbiAgICAgICAgYXdhaXQgdHguY29tcGxldGU7XG5cbiAgICAgICAgcmV0dXJuIGBSZWNvcmQgd2l0aCBpZDogJHtpZH0gZGVsZXRlZGA7XG4gICAgfVxuXG4gICAgcHVibGljIGJhdGNoQWRkID0gYXN5bmMgKHN0b3JlbmFtZTogc3RyaW5nLCBkYXRhOiBhbnlbXSk6IFByb21pc2U8c3RyaW5nPiA9PiB7XG4gICAgICAgIGNvbnN0IHR4ID0gdGhpcy5nZXRUcmFuc2FjdGlvbih0aGlzLmRiSW5zdGFuY2UsIHN0b3JlbmFtZSwgJ3JlYWR3cml0ZScpO1xuICAgICAgICBjb25zdCBvYmplY3RTdG9yZSA9IHR4Lm9iamVjdFN0b3JlKHN0b3JlbmFtZSk7XG5cbiAgICAgICAgZGF0YS5mb3JFYWNoKGFzeW5jIGVsZW1lbnQgPT4ge1xuICAgICAgICAgICAgbGV0IGl0ZW0gPSB0aGlzLmNoZWNrRm9yS2V5UGF0aChvYmplY3RTdG9yZSwgZWxlbWVudCk7XG4gICAgICAgICAgICBhd2FpdCBvYmplY3RTdG9yZS5hZGQoaXRlbSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGF3YWl0IHR4LmNvbXBsZXRlO1xuXG4gICAgICAgIHJldHVybiBgQWRkZWQgJHtkYXRhLmxlbmd0aH0gcmVjb3Jkc2A7XG4gICAgfVxuXG4gICAgcHVibGljIGJhdGNoUHV0ID0gYXN5bmMgKHN0b3JlbmFtZTogc3RyaW5nLCBkYXRhOiBhbnlbXSk6IFByb21pc2U8c3RyaW5nPiA9PiB7XG4gICAgICAgIGNvbnN0IHR4ID0gdGhpcy5nZXRUcmFuc2FjdGlvbih0aGlzLmRiSW5zdGFuY2UsIHN0b3JlbmFtZSwgJ3JlYWR3cml0ZScpO1xuXG4gICAgICAgIGRhdGEuZm9yRWFjaChhc3luYyBlbGVtZW50ID0+IHtcbiAgICAgICAgICAgIGF3YWl0IHR4Lm9iamVjdFN0b3JlKHN0b3JlbmFtZSkucHV0KGVsZW1lbnQpO1xuICAgICAgICB9KTtcblxuICAgICAgICBhd2FpdCB0eC5jb21wbGV0ZTtcblxuICAgICAgICByZXR1cm4gYHVwZGF0ZWQgJHtkYXRhLmxlbmd0aH0gcmVjb3Jkc2A7XG4gICAgfVxuXG4gICAgcHVibGljIGJhdGNoRGVsZXRlID0gYXN5bmMgKHN0b3JlbmFtZTogc3RyaW5nLCBpZHM6IGFueVtdKTogUHJvbWlzZTxzdHJpbmc+ID0+IHtcbiAgICAgICAgY29uc3QgdHggPSB0aGlzLmdldFRyYW5zYWN0aW9uKHRoaXMuZGJJbnN0YW5jZSwgc3RvcmVuYW1lLCAncmVhZHdyaXRlJyk7XG5cbiAgICAgICAgaWRzLmZvckVhY2goYXN5bmMgZWxlbWVudCA9PiB7XG4gICAgICAgICAgICBhd2FpdCB0eC5vYmplY3RTdG9yZShzdG9yZW5hbWUpLmRlbGV0ZShlbGVtZW50KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgYXdhaXQgdHguY29tcGxldGU7XG5cbiAgICAgICAgcmV0dXJuIGBEZWxldGVkICR7aWRzLmxlbmd0aH0gcmVjb3Jkc2A7XG4gICAgfVxuXG4gICAgcHVibGljIGNsZWFyU3RvcmUgPSBhc3luYyAoc3RvcmVOYW1lOiBzdHJpbmcpOiBQcm9taXNlPHN0cmluZz4gPT4ge1xuICAgICAgICBjb25zdCB0eCA9IHRoaXMuZ2V0VHJhbnNhY3Rpb24odGhpcy5kYkluc3RhbmNlLCBzdG9yZU5hbWUsICdyZWFkd3JpdGUnKTtcblxuICAgICAgICBhd2FpdCB0eC5vYmplY3RTdG9yZShzdG9yZU5hbWUpLmNsZWFyKCk7XG5cbiAgICAgICAgYXdhaXQgdHguY29tcGxldGU7XG5cbiAgICAgICAgcmV0dXJuIGBTdG9yZSAke3N0b3JlTmFtZX0gY2xlYXJlZGA7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBnZXRUcmFuc2FjdGlvbihkYkluc3RhbmNlOiBEQiwgc3ROYW1lOiBzdHJpbmcsIG1vZGU/OiAncmVhZG9ubHknIHwgJ3JlYWR3cml0ZScpIHtcbiAgICAgICAgY29uc3QgdHggPSBkYkluc3RhbmNlLnRyYW5zYWN0aW9uKHN0TmFtZSwgbW9kZSk7XG4gICAgICAgIHR4LmNvbXBsZXRlLmNhdGNoKFxuICAgICAgICAgICAgZXJyID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoKGVyciBhcyBFcnJvcikubWVzc2FnZSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcignVW5kZWZpbmVkIGVycm9yIGluIGdldFRyYW5zYWN0aW9uKCknKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiB0eDtcbiAgICB9XG5cbiAgICAvLyBDdXJyZW50bHkgZG9uJ3Qgc3VwcG9ydCBhZ2dyZWdhdGUga2V5c1xuICAgIHByaXZhdGUgY2hlY2tGb3JLZXlQYXRoKG9iamVjdFN0b3JlOiBPYmplY3RTdG9yZTxhbnksIGFueT4sIGRhdGE6IGFueSkge1xuICAgICAgICBpZiAoIW9iamVjdFN0b3JlLmF1dG9JbmNyZW1lbnQgfHwgIW9iamVjdFN0b3JlLmtleVBhdGgpIHtcbiAgICAgICAgICAgIHJldHVybiBkYXRhO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHR5cGVvZiBvYmplY3RTdG9yZS5rZXlQYXRoICE9PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgcmV0dXJuIGRhdGE7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBrZXlQYXRoID0gb2JqZWN0U3RvcmUua2V5UGF0aCBhcyBzdHJpbmc7XG5cbiAgICAgICAgaWYgKCFkYXRhW2tleVBhdGhdKSB7XG4gICAgICAgICAgICBkZWxldGUgZGF0YVtrZXlQYXRoXTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZGF0YTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHVwZ3JhZGVEYXRhYmFzZSh1cGdyYWRlREI6IFVwZ3JhZGVEQiwgZGJTdG9yZTogSURhdGFiYXNlKSB7XG4gICAgICAgIGlmICh1cGdyYWRlREIub2xkVmVyc2lvbiA8IGRiU3RvcmUudmVyc2lvbikge1xuICAgICAgICAgICAgaWYgKGRiU3RvcmUub2JqZWN0U3RvcmVzKSB7XG4gICAgICAgICAgICAgICAgZm9yICh2YXIgc3RvcmUgb2YgZGJTdG9yZS5vYmplY3RTdG9yZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCF1cGdyYWRlREIub2JqZWN0U3RvcmVOYW1lcy5jb250YWlucyhzdG9yZS5uYW1lKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5hZGROZXdTdG9yZSh1cGdyYWRlREIsIHN0b3JlKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgYWRkTmV3U3RvcmUodXBncmFkZURCOiBVcGdyYWRlREIsIHN0b3JlOiBJT2JqZWN0U3RvcmUpIHtcbiAgICAgICAgbGV0IHByaW1hcnlLZXkgPSBzdG9yZS5wcmltYXJ5S2V5O1xuXG4gICAgICAgIGlmICghcHJpbWFyeUtleSkge1xuICAgICAgICAgICAgcHJpbWFyeUtleSA9IHsgbmFtZTogJ2lkJywga2V5UGF0aDogJ2lkJywgbXVsdGlFbnRyeTogZmFsc2UsIHVuaXF1ZTogZmFsc2UsIGF1dG9JbmNyZW1lbnQ6IHRydWUgfTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IG5ld1N0b3JlID0gdXBncmFkZURCLmNyZWF0ZU9iamVjdFN0b3JlKHN0b3JlLm5hbWUsXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAga2V5UGF0aDogcHJpbWFyeUtleS5rZXlQYXRoID8/IHByaW1hcnlLZXkubXVsdGlLZXlQYXRoLFxuICAgICAgICAgICAgICAgIGF1dG9JbmNyZW1lbnQ6IHByaW1hcnlLZXkuYXV0b0luY3JlbWVudFxuICAgICAgICAgICAgfVxuICAgICAgICApO1xuXG4gICAgICAgIGZvciAodmFyIGluZGV4IG9mIHN0b3JlLmluZGV4ZXMpIHtcbiAgICAgICAgICAgIG5ld1N0b3JlLmNyZWF0ZUluZGV4KGluZGV4Lm5hbWUsXG4gICAgICAgICAgICAgICAgaW5kZXgua2V5UGF0aCA/PyBpbmRleC5tdWx0aUtleVBhdGggPz8gaW5kZXgubmFtZSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIG11bHRpRW50cnk6IGluZGV4Lm11bHRpRW50cnksXG4gICAgICAgICAgICAgICAgICAgIHVuaXF1ZTogaW5kZXgudW5pcXVlXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgIH1cbn0iLCIndXNlIHN0cmljdCc7XG5cbihmdW5jdGlvbigpIHtcbiAgZnVuY3Rpb24gdG9BcnJheShhcnIpIHtcbiAgICByZXR1cm4gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJyKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHByb21pc2lmeVJlcXVlc3QocmVxdWVzdCkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgIHJlcXVlc3Qub25zdWNjZXNzID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHJlc29sdmUocmVxdWVzdC5yZXN1bHQpO1xuICAgICAgfTtcblxuICAgICAgcmVxdWVzdC5vbmVycm9yID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHJlamVjdChyZXF1ZXN0LmVycm9yKTtcbiAgICAgIH07XG4gICAgfSk7XG4gIH1cblxuICBmdW5jdGlvbiBwcm9taXNpZnlSZXF1ZXN0Q2FsbChvYmosIG1ldGhvZCwgYXJncykge1xuICAgIHZhciByZXF1ZXN0O1xuICAgIHZhciBwID0gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICByZXF1ZXN0ID0gb2JqW21ldGhvZF0uYXBwbHkob2JqLCBhcmdzKTtcbiAgICAgIHByb21pc2lmeVJlcXVlc3QocmVxdWVzdCkudGhlbihyZXNvbHZlLCByZWplY3QpO1xuICAgIH0pO1xuXG4gICAgcC5yZXF1ZXN0ID0gcmVxdWVzdDtcbiAgICByZXR1cm4gcDtcbiAgfVxuXG4gIGZ1bmN0aW9uIHByb21pc2lmeUN1cnNvclJlcXVlc3RDYWxsKG9iaiwgbWV0aG9kLCBhcmdzKSB7XG4gICAgdmFyIHAgPSBwcm9taXNpZnlSZXF1ZXN0Q2FsbChvYmosIG1ldGhvZCwgYXJncyk7XG4gICAgcmV0dXJuIHAudGhlbihmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgaWYgKCF2YWx1ZSkgcmV0dXJuO1xuICAgICAgcmV0dXJuIG5ldyBDdXJzb3IodmFsdWUsIHAucmVxdWVzdCk7XG4gICAgfSk7XG4gIH1cblxuICBmdW5jdGlvbiBwcm94eVByb3BlcnRpZXMoUHJveHlDbGFzcywgdGFyZ2V0UHJvcCwgcHJvcGVydGllcykge1xuICAgIHByb3BlcnRpZXMuZm9yRWFjaChmdW5jdGlvbihwcm9wKSB7XG4gICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoUHJveHlDbGFzcy5wcm90b3R5cGUsIHByb3AsIHtcbiAgICAgICAgZ2V0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgICByZXR1cm4gdGhpc1t0YXJnZXRQcm9wXVtwcm9wXTtcbiAgICAgICAgfSxcbiAgICAgICAgc2V0OiBmdW5jdGlvbih2YWwpIHtcbiAgICAgICAgICB0aGlzW3RhcmdldFByb3BdW3Byb3BdID0gdmFsO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHByb3h5UmVxdWVzdE1ldGhvZHMoUHJveHlDbGFzcywgdGFyZ2V0UHJvcCwgQ29uc3RydWN0b3IsIHByb3BlcnRpZXMpIHtcbiAgICBwcm9wZXJ0aWVzLmZvckVhY2goZnVuY3Rpb24ocHJvcCkge1xuICAgICAgaWYgKCEocHJvcCBpbiBDb25zdHJ1Y3Rvci5wcm90b3R5cGUpKSByZXR1cm47XG4gICAgICBQcm94eUNsYXNzLnByb3RvdHlwZVtwcm9wXSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gcHJvbWlzaWZ5UmVxdWVzdENhbGwodGhpc1t0YXJnZXRQcm9wXSwgcHJvcCwgYXJndW1lbnRzKTtcbiAgICAgIH07XG4gICAgfSk7XG4gIH1cblxuICBmdW5jdGlvbiBwcm94eU1ldGhvZHMoUHJveHlDbGFzcywgdGFyZ2V0UHJvcCwgQ29uc3RydWN0b3IsIHByb3BlcnRpZXMpIHtcbiAgICBwcm9wZXJ0aWVzLmZvckVhY2goZnVuY3Rpb24ocHJvcCkge1xuICAgICAgaWYgKCEocHJvcCBpbiBDb25zdHJ1Y3Rvci5wcm90b3R5cGUpKSByZXR1cm47XG4gICAgICBQcm94eUNsYXNzLnByb3RvdHlwZVtwcm9wXSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gdGhpc1t0YXJnZXRQcm9wXVtwcm9wXS5hcHBseSh0aGlzW3RhcmdldFByb3BdLCBhcmd1bWVudHMpO1xuICAgICAgfTtcbiAgICB9KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHByb3h5Q3Vyc29yUmVxdWVzdE1ldGhvZHMoUHJveHlDbGFzcywgdGFyZ2V0UHJvcCwgQ29uc3RydWN0b3IsIHByb3BlcnRpZXMpIHtcbiAgICBwcm9wZXJ0aWVzLmZvckVhY2goZnVuY3Rpb24ocHJvcCkge1xuICAgICAgaWYgKCEocHJvcCBpbiBDb25zdHJ1Y3Rvci5wcm90b3R5cGUpKSByZXR1cm47XG4gICAgICBQcm94eUNsYXNzLnByb3RvdHlwZVtwcm9wXSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gcHJvbWlzaWZ5Q3Vyc29yUmVxdWVzdENhbGwodGhpc1t0YXJnZXRQcm9wXSwgcHJvcCwgYXJndW1lbnRzKTtcbiAgICAgIH07XG4gICAgfSk7XG4gIH1cblxuICBmdW5jdGlvbiBJbmRleChpbmRleCkge1xuICAgIHRoaXMuX2luZGV4ID0gaW5kZXg7XG4gIH1cblxuICBwcm94eVByb3BlcnRpZXMoSW5kZXgsICdfaW5kZXgnLCBbXG4gICAgJ25hbWUnLFxuICAgICdrZXlQYXRoJyxcbiAgICAnbXVsdGlFbnRyeScsXG4gICAgJ3VuaXF1ZSdcbiAgXSk7XG5cbiAgcHJveHlSZXF1ZXN0TWV0aG9kcyhJbmRleCwgJ19pbmRleCcsIElEQkluZGV4LCBbXG4gICAgJ2dldCcsXG4gICAgJ2dldEtleScsXG4gICAgJ2dldEFsbCcsXG4gICAgJ2dldEFsbEtleXMnLFxuICAgICdjb3VudCdcbiAgXSk7XG5cbiAgcHJveHlDdXJzb3JSZXF1ZXN0TWV0aG9kcyhJbmRleCwgJ19pbmRleCcsIElEQkluZGV4LCBbXG4gICAgJ29wZW5DdXJzb3InLFxuICAgICdvcGVuS2V5Q3Vyc29yJ1xuICBdKTtcblxuICBmdW5jdGlvbiBDdXJzb3IoY3Vyc29yLCByZXF1ZXN0KSB7XG4gICAgdGhpcy5fY3Vyc29yID0gY3Vyc29yO1xuICAgIHRoaXMuX3JlcXVlc3QgPSByZXF1ZXN0O1xuICB9XG5cbiAgcHJveHlQcm9wZXJ0aWVzKEN1cnNvciwgJ19jdXJzb3InLCBbXG4gICAgJ2RpcmVjdGlvbicsXG4gICAgJ2tleScsXG4gICAgJ3ByaW1hcnlLZXknLFxuICAgICd2YWx1ZSdcbiAgXSk7XG5cbiAgcHJveHlSZXF1ZXN0TWV0aG9kcyhDdXJzb3IsICdfY3Vyc29yJywgSURCQ3Vyc29yLCBbXG4gICAgJ3VwZGF0ZScsXG4gICAgJ2RlbGV0ZSdcbiAgXSk7XG5cbiAgLy8gcHJveHkgJ25leHQnIG1ldGhvZHNcbiAgWydhZHZhbmNlJywgJ2NvbnRpbnVlJywgJ2NvbnRpbnVlUHJpbWFyeUtleSddLmZvckVhY2goZnVuY3Rpb24obWV0aG9kTmFtZSkge1xuICAgIGlmICghKG1ldGhvZE5hbWUgaW4gSURCQ3Vyc29yLnByb3RvdHlwZSkpIHJldHVybjtcbiAgICBDdXJzb3IucHJvdG90eXBlW21ldGhvZE5hbWVdID0gZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgY3Vyc29yID0gdGhpcztcbiAgICAgIHZhciBhcmdzID0gYXJndW1lbnRzO1xuICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpLnRoZW4oZnVuY3Rpb24oKSB7XG4gICAgICAgIGN1cnNvci5fY3Vyc29yW21ldGhvZE5hbWVdLmFwcGx5KGN1cnNvci5fY3Vyc29yLCBhcmdzKTtcbiAgICAgICAgcmV0dXJuIHByb21pc2lmeVJlcXVlc3QoY3Vyc29yLl9yZXF1ZXN0KS50aGVuKGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICAgICAgaWYgKCF2YWx1ZSkgcmV0dXJuO1xuICAgICAgICAgIHJldHVybiBuZXcgQ3Vyc29yKHZhbHVlLCBjdXJzb3IuX3JlcXVlc3QpO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH07XG4gIH0pO1xuXG4gIGZ1bmN0aW9uIE9iamVjdFN0b3JlKHN0b3JlKSB7XG4gICAgdGhpcy5fc3RvcmUgPSBzdG9yZTtcbiAgfVxuXG4gIE9iamVjdFN0b3JlLnByb3RvdHlwZS5jcmVhdGVJbmRleCA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiBuZXcgSW5kZXgodGhpcy5fc3RvcmUuY3JlYXRlSW5kZXguYXBwbHkodGhpcy5fc3RvcmUsIGFyZ3VtZW50cykpO1xuICB9O1xuXG4gIE9iamVjdFN0b3JlLnByb3RvdHlwZS5pbmRleCA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiBuZXcgSW5kZXgodGhpcy5fc3RvcmUuaW5kZXguYXBwbHkodGhpcy5fc3RvcmUsIGFyZ3VtZW50cykpO1xuICB9O1xuXG4gIHByb3h5UHJvcGVydGllcyhPYmplY3RTdG9yZSwgJ19zdG9yZScsIFtcbiAgICAnbmFtZScsXG4gICAgJ2tleVBhdGgnLFxuICAgICdpbmRleE5hbWVzJyxcbiAgICAnYXV0b0luY3JlbWVudCdcbiAgXSk7XG5cbiAgcHJveHlSZXF1ZXN0TWV0aG9kcyhPYmplY3RTdG9yZSwgJ19zdG9yZScsIElEQk9iamVjdFN0b3JlLCBbXG4gICAgJ3B1dCcsXG4gICAgJ2FkZCcsXG4gICAgJ2RlbGV0ZScsXG4gICAgJ2NsZWFyJyxcbiAgICAnZ2V0JyxcbiAgICAnZ2V0QWxsJyxcbiAgICAnZ2V0S2V5JyxcbiAgICAnZ2V0QWxsS2V5cycsXG4gICAgJ2NvdW50J1xuICBdKTtcblxuICBwcm94eUN1cnNvclJlcXVlc3RNZXRob2RzKE9iamVjdFN0b3JlLCAnX3N0b3JlJywgSURCT2JqZWN0U3RvcmUsIFtcbiAgICAnb3BlbkN1cnNvcicsXG4gICAgJ29wZW5LZXlDdXJzb3InXG4gIF0pO1xuXG4gIHByb3h5TWV0aG9kcyhPYmplY3RTdG9yZSwgJ19zdG9yZScsIElEQk9iamVjdFN0b3JlLCBbXG4gICAgJ2RlbGV0ZUluZGV4J1xuICBdKTtcblxuICBmdW5jdGlvbiBUcmFuc2FjdGlvbihpZGJUcmFuc2FjdGlvbikge1xuICAgIHRoaXMuX3R4ID0gaWRiVHJhbnNhY3Rpb247XG4gICAgdGhpcy5jb21wbGV0ZSA9IG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgaWRiVHJhbnNhY3Rpb24ub25jb21wbGV0ZSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXNvbHZlKCk7XG4gICAgICB9O1xuICAgICAgaWRiVHJhbnNhY3Rpb24ub25lcnJvciA9IGZ1bmN0aW9uKCkge1xuICAgICAgICByZWplY3QoaWRiVHJhbnNhY3Rpb24uZXJyb3IpO1xuICAgICAgfTtcbiAgICAgIGlkYlRyYW5zYWN0aW9uLm9uYWJvcnQgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgcmVqZWN0KGlkYlRyYW5zYWN0aW9uLmVycm9yKTtcbiAgICAgIH07XG4gICAgfSk7XG4gIH1cblxuICBUcmFuc2FjdGlvbi5wcm90b3R5cGUub2JqZWN0U3RvcmUgPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gbmV3IE9iamVjdFN0b3JlKHRoaXMuX3R4Lm9iamVjdFN0b3JlLmFwcGx5KHRoaXMuX3R4LCBhcmd1bWVudHMpKTtcbiAgfTtcblxuICBwcm94eVByb3BlcnRpZXMoVHJhbnNhY3Rpb24sICdfdHgnLCBbXG4gICAgJ29iamVjdFN0b3JlTmFtZXMnLFxuICAgICdtb2RlJ1xuICBdKTtcblxuICBwcm94eU1ldGhvZHMoVHJhbnNhY3Rpb24sICdfdHgnLCBJREJUcmFuc2FjdGlvbiwgW1xuICAgICdhYm9ydCdcbiAgXSk7XG5cbiAgZnVuY3Rpb24gVXBncmFkZURCKGRiLCBvbGRWZXJzaW9uLCB0cmFuc2FjdGlvbikge1xuICAgIHRoaXMuX2RiID0gZGI7XG4gICAgdGhpcy5vbGRWZXJzaW9uID0gb2xkVmVyc2lvbjtcbiAgICB0aGlzLnRyYW5zYWN0aW9uID0gbmV3IFRyYW5zYWN0aW9uKHRyYW5zYWN0aW9uKTtcbiAgfVxuXG4gIFVwZ3JhZGVEQi5wcm90b3R5cGUuY3JlYXRlT2JqZWN0U3RvcmUgPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gbmV3IE9iamVjdFN0b3JlKHRoaXMuX2RiLmNyZWF0ZU9iamVjdFN0b3JlLmFwcGx5KHRoaXMuX2RiLCBhcmd1bWVudHMpKTtcbiAgfTtcblxuICBwcm94eVByb3BlcnRpZXMoVXBncmFkZURCLCAnX2RiJywgW1xuICAgICduYW1lJyxcbiAgICAndmVyc2lvbicsXG4gICAgJ29iamVjdFN0b3JlTmFtZXMnXG4gIF0pO1xuXG4gIHByb3h5TWV0aG9kcyhVcGdyYWRlREIsICdfZGInLCBJREJEYXRhYmFzZSwgW1xuICAgICdkZWxldGVPYmplY3RTdG9yZScsXG4gICAgJ2Nsb3NlJ1xuICBdKTtcblxuICBmdW5jdGlvbiBEQihkYikge1xuICAgIHRoaXMuX2RiID0gZGI7XG4gIH1cblxuICBEQi5wcm90b3R5cGUudHJhbnNhY3Rpb24gPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gbmV3IFRyYW5zYWN0aW9uKHRoaXMuX2RiLnRyYW5zYWN0aW9uLmFwcGx5KHRoaXMuX2RiLCBhcmd1bWVudHMpKTtcbiAgfTtcblxuICBwcm94eVByb3BlcnRpZXMoREIsICdfZGInLCBbXG4gICAgJ25hbWUnLFxuICAgICd2ZXJzaW9uJyxcbiAgICAnb2JqZWN0U3RvcmVOYW1lcydcbiAgXSk7XG5cbiAgcHJveHlNZXRob2RzKERCLCAnX2RiJywgSURCRGF0YWJhc2UsIFtcbiAgICAnY2xvc2UnXG4gIF0pO1xuXG4gIC8vIEFkZCBjdXJzb3IgaXRlcmF0b3JzXG4gIC8vIFRPRE86IHJlbW92ZSB0aGlzIG9uY2UgYnJvd3NlcnMgZG8gdGhlIHJpZ2h0IHRoaW5nIHdpdGggcHJvbWlzZXNcbiAgWydvcGVuQ3Vyc29yJywgJ29wZW5LZXlDdXJzb3InXS5mb3JFYWNoKGZ1bmN0aW9uKGZ1bmNOYW1lKSB7XG4gICAgW09iamVjdFN0b3JlLCBJbmRleF0uZm9yRWFjaChmdW5jdGlvbihDb25zdHJ1Y3Rvcikge1xuICAgICAgLy8gRG9uJ3QgY3JlYXRlIGl0ZXJhdGVLZXlDdXJzb3IgaWYgb3BlbktleUN1cnNvciBkb2Vzbid0IGV4aXN0LlxuICAgICAgaWYgKCEoZnVuY05hbWUgaW4gQ29uc3RydWN0b3IucHJvdG90eXBlKSkgcmV0dXJuO1xuXG4gICAgICBDb25zdHJ1Y3Rvci5wcm90b3R5cGVbZnVuY05hbWUucmVwbGFjZSgnb3BlbicsICdpdGVyYXRlJyldID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBhcmdzID0gdG9BcnJheShhcmd1bWVudHMpO1xuICAgICAgICB2YXIgY2FsbGJhY2sgPSBhcmdzW2FyZ3MubGVuZ3RoIC0gMV07XG4gICAgICAgIHZhciBuYXRpdmVPYmplY3QgPSB0aGlzLl9zdG9yZSB8fCB0aGlzLl9pbmRleDtcbiAgICAgICAgdmFyIHJlcXVlc3QgPSBuYXRpdmVPYmplY3RbZnVuY05hbWVdLmFwcGx5KG5hdGl2ZU9iamVjdCwgYXJncy5zbGljZSgwLCAtMSkpO1xuICAgICAgICByZXF1ZXN0Lm9uc3VjY2VzcyA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIGNhbGxiYWNrKHJlcXVlc3QucmVzdWx0KTtcbiAgICAgICAgfTtcbiAgICAgIH07XG4gICAgfSk7XG4gIH0pO1xuXG4gIC8vIHBvbHlmaWxsIGdldEFsbFxuICBbSW5kZXgsIE9iamVjdFN0b3JlXS5mb3JFYWNoKGZ1bmN0aW9uKENvbnN0cnVjdG9yKSB7XG4gICAgaWYgKENvbnN0cnVjdG9yLnByb3RvdHlwZS5nZXRBbGwpIHJldHVybjtcbiAgICBDb25zdHJ1Y3Rvci5wcm90b3R5cGUuZ2V0QWxsID0gZnVuY3Rpb24ocXVlcnksIGNvdW50KSB7XG4gICAgICB2YXIgaW5zdGFuY2UgPSB0aGlzO1xuICAgICAgdmFyIGl0ZW1zID0gW107XG5cbiAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlKSB7XG4gICAgICAgIGluc3RhbmNlLml0ZXJhdGVDdXJzb3IocXVlcnksIGZ1bmN0aW9uKGN1cnNvcikge1xuICAgICAgICAgIGlmICghY3Vyc29yKSB7XG4gICAgICAgICAgICByZXNvbHZlKGl0ZW1zKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG4gICAgICAgICAgaXRlbXMucHVzaChjdXJzb3IudmFsdWUpO1xuXG4gICAgICAgICAgaWYgKGNvdW50ICE9PSB1bmRlZmluZWQgJiYgaXRlbXMubGVuZ3RoID09IGNvdW50KSB7XG4gICAgICAgICAgICByZXNvbHZlKGl0ZW1zKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG4gICAgICAgICAgY3Vyc29yLmNvbnRpbnVlKCk7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfTtcbiAgfSk7XG5cbiAgdmFyIGV4cCA9IHtcbiAgICBvcGVuOiBmdW5jdGlvbihuYW1lLCB2ZXJzaW9uLCB1cGdyYWRlQ2FsbGJhY2spIHtcbiAgICAgIHZhciBwID0gcHJvbWlzaWZ5UmVxdWVzdENhbGwoaW5kZXhlZERCLCAnb3BlbicsIFtuYW1lLCB2ZXJzaW9uXSk7XG4gICAgICB2YXIgcmVxdWVzdCA9IHAucmVxdWVzdDtcblxuICAgICAgaWYgKHJlcXVlc3QpIHtcbiAgICAgICAgcmVxdWVzdC5vbnVwZ3JhZGVuZWVkZWQgPSBmdW5jdGlvbihldmVudCkge1xuICAgICAgICAgIGlmICh1cGdyYWRlQ2FsbGJhY2spIHtcbiAgICAgICAgICAgIHVwZ3JhZGVDYWxsYmFjayhuZXcgVXBncmFkZURCKHJlcXVlc3QucmVzdWx0LCBldmVudC5vbGRWZXJzaW9uLCByZXF1ZXN0LnRyYW5zYWN0aW9uKSk7XG4gICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gcC50aGVuKGZ1bmN0aW9uKGRiKSB7XG4gICAgICAgIHJldHVybiBuZXcgREIoZGIpO1xuICAgICAgfSk7XG4gICAgfSxcbiAgICBkZWxldGU6IGZ1bmN0aW9uKG5hbWUpIHtcbiAgICAgIHJldHVybiBwcm9taXNpZnlSZXF1ZXN0Q2FsbChpbmRleGVkREIsICdkZWxldGVEYXRhYmFzZScsIFtuYW1lXSk7XG4gICAgfVxuICB9O1xuXG4gIGlmICh0eXBlb2YgbW9kdWxlICE9PSAndW5kZWZpbmVkJykge1xuICAgIG1vZHVsZS5leHBvcnRzID0gZXhwO1xuICAgIG1vZHVsZS5leHBvcnRzLmRlZmF1bHQgPSBtb2R1bGUuZXhwb3J0cztcbiAgfVxuICBlbHNlIHtcbiAgICBzZWxmLmlkYiA9IGV4cDtcbiAgfVxufSgpKTtcbiJdLCJzb3VyY2VSb290IjoiIn0=