/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/idb/build/esm/index.js":
/*!*********************************************!*\
  !*** ./node_modules/idb/build/esm/index.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "unwrap": () => /* reexport safe */ _wrap_idb_value_js__WEBPACK_IMPORTED_MODULE_0__.u,
/* harmony export */   "wrap": () => /* reexport safe */ _wrap_idb_value_js__WEBPACK_IMPORTED_MODULE_0__.w,
/* harmony export */   "deleteDB": () => /* binding */ deleteDB,
/* harmony export */   "openDB": () => /* binding */ openDB
/* harmony export */ });
/* harmony import */ var _wrap_idb_value_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./wrap-idb-value.js */ "./node_modules/idb/build/esm/wrap-idb-value.js");



/**
 * Open a database.
 *
 * @param name Name of the database.
 * @param version Schema version.
 * @param callbacks Additional callbacks.
 */
function openDB(name, version, { blocked, upgrade, blocking, terminated } = {}) {
    const request = indexedDB.open(name, version);
    const openPromise = (0,_wrap_idb_value_js__WEBPACK_IMPORTED_MODULE_0__.w)(request);
    if (upgrade) {
        request.addEventListener('upgradeneeded', (event) => {
            upgrade((0,_wrap_idb_value_js__WEBPACK_IMPORTED_MODULE_0__.w)(request.result), event.oldVersion, event.newVersion, (0,_wrap_idb_value_js__WEBPACK_IMPORTED_MODULE_0__.w)(request.transaction));
        });
    }
    if (blocked)
        request.addEventListener('blocked', () => blocked());
    openPromise
        .then((db) => {
        if (terminated)
            db.addEventListener('close', () => terminated());
        if (blocking)
            db.addEventListener('versionchange', () => blocking());
    })
        .catch(() => { });
    return openPromise;
}
/**
 * Delete a database.
 *
 * @param name Name of the database.
 */
function deleteDB(name, { blocked } = {}) {
    const request = indexedDB.deleteDatabase(name);
    if (blocked)
        request.addEventListener('blocked', () => blocked());
    return (0,_wrap_idb_value_js__WEBPACK_IMPORTED_MODULE_0__.w)(request).then(() => undefined);
}

const readMethods = ['get', 'getKey', 'getAll', 'getAllKeys', 'count'];
const writeMethods = ['put', 'add', 'delete', 'clear'];
const cachedMethods = new Map();
function getMethod(target, prop) {
    if (!(target instanceof IDBDatabase &&
        !(prop in target) &&
        typeof prop === 'string')) {
        return;
    }
    if (cachedMethods.get(prop))
        return cachedMethods.get(prop);
    const targetFuncName = prop.replace(/FromIndex$/, '');
    const useIndex = prop !== targetFuncName;
    const isWrite = writeMethods.includes(targetFuncName);
    if (
    // Bail if the target doesn't exist on the target. Eg, getAll isn't in Edge.
    !(targetFuncName in (useIndex ? IDBIndex : IDBObjectStore).prototype) ||
        !(isWrite || readMethods.includes(targetFuncName))) {
        return;
    }
    const method = async function (storeName, ...args) {
        // isWrite ? 'readwrite' : undefined gzipps better, but fails in Edge :(
        const tx = this.transaction(storeName, isWrite ? 'readwrite' : 'readonly');
        let target = tx.store;
        if (useIndex)
            target = target.index(args.shift());
        const returnVal = await target[targetFuncName](...args);
        if (isWrite)
            await tx.done;
        return returnVal;
    };
    cachedMethods.set(prop, method);
    return method;
}
(0,_wrap_idb_value_js__WEBPACK_IMPORTED_MODULE_0__.r)((oldTraps) => ({
    ...oldTraps,
    get: (target, prop, receiver) => getMethod(target, prop) || oldTraps.get(target, prop, receiver),
    has: (target, prop) => !!getMethod(target, prop) || oldTraps.has(target, prop),
}));




/***/ }),

/***/ "./node_modules/idb/build/esm/wrap-idb-value.js":
/*!******************************************************!*\
  !*** ./node_modules/idb/build/esm/wrap-idb-value.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "a": () => /* binding */ reverseTransformCache,
/* harmony export */   "i": () => /* binding */ instanceOfAny,
/* harmony export */   "r": () => /* binding */ replaceTraps,
/* harmony export */   "u": () => /* binding */ unwrap,
/* harmony export */   "w": () => /* binding */ wrap
/* harmony export */ });
const instanceOfAny = (object, constructors) => constructors.some((c) => object instanceof c);

let idbProxyableTypes;
let cursorAdvanceMethods;
// This is a function to prevent it throwing up in node environments.
function getIdbProxyableTypes() {
    return (idbProxyableTypes ||
        (idbProxyableTypes = [
            IDBDatabase,
            IDBObjectStore,
            IDBIndex,
            IDBCursor,
            IDBTransaction,
        ]));
}
// This is a function to prevent it throwing up in node environments.
function getCursorAdvanceMethods() {
    return (cursorAdvanceMethods ||
        (cursorAdvanceMethods = [
            IDBCursor.prototype.advance,
            IDBCursor.prototype.continue,
            IDBCursor.prototype.continuePrimaryKey,
        ]));
}
const cursorRequestMap = new WeakMap();
const transactionDoneMap = new WeakMap();
const transactionStoreNamesMap = new WeakMap();
const transformCache = new WeakMap();
const reverseTransformCache = new WeakMap();
function promisifyRequest(request) {
    const promise = new Promise((resolve, reject) => {
        const unlisten = () => {
            request.removeEventListener('success', success);
            request.removeEventListener('error', error);
        };
        const success = () => {
            resolve(wrap(request.result));
            unlisten();
        };
        const error = () => {
            reject(request.error);
            unlisten();
        };
        request.addEventListener('success', success);
        request.addEventListener('error', error);
    });
    promise
        .then((value) => {
        // Since cursoring reuses the IDBRequest (*sigh*), we cache it for later retrieval
        // (see wrapFunction).
        if (value instanceof IDBCursor) {
            cursorRequestMap.set(value, request);
        }
        // Catching to avoid "Uncaught Promise exceptions"
    })
        .catch(() => { });
    // This mapping exists in reverseTransformCache but doesn't doesn't exist in transformCache. This
    // is because we create many promises from a single IDBRequest.
    reverseTransformCache.set(promise, request);
    return promise;
}
function cacheDonePromiseForTransaction(tx) {
    // Early bail if we've already created a done promise for this transaction.
    if (transactionDoneMap.has(tx))
        return;
    const done = new Promise((resolve, reject) => {
        const unlisten = () => {
            tx.removeEventListener('complete', complete);
            tx.removeEventListener('error', error);
            tx.removeEventListener('abort', error);
        };
        const complete = () => {
            resolve();
            unlisten();
        };
        const error = () => {
            reject(tx.error || new DOMException('AbortError', 'AbortError'));
            unlisten();
        };
        tx.addEventListener('complete', complete);
        tx.addEventListener('error', error);
        tx.addEventListener('abort', error);
    });
    // Cache it for later retrieval.
    transactionDoneMap.set(tx, done);
}
let idbProxyTraps = {
    get(target, prop, receiver) {
        if (target instanceof IDBTransaction) {
            // Special handling for transaction.done.
            if (prop === 'done')
                return transactionDoneMap.get(target);
            // Polyfill for objectStoreNames because of Edge.
            if (prop === 'objectStoreNames') {
                return target.objectStoreNames || transactionStoreNamesMap.get(target);
            }
            // Make tx.store return the only store in the transaction, or undefined if there are many.
            if (prop === 'store') {
                return receiver.objectStoreNames[1]
                    ? undefined
                    : receiver.objectStore(receiver.objectStoreNames[0]);
            }
        }
        // Else transform whatever we get back.
        return wrap(target[prop]);
    },
    set(target, prop, value) {
        target[prop] = value;
        return true;
    },
    has(target, prop) {
        if (target instanceof IDBTransaction &&
            (prop === 'done' || prop === 'store')) {
            return true;
        }
        return prop in target;
    },
};
function replaceTraps(callback) {
    idbProxyTraps = callback(idbProxyTraps);
}
function wrapFunction(func) {
    // Due to expected object equality (which is enforced by the caching in `wrap`), we
    // only create one new func per func.
    // Edge doesn't support objectStoreNames (booo), so we polyfill it here.
    if (func === IDBDatabase.prototype.transaction &&
        !('objectStoreNames' in IDBTransaction.prototype)) {
        return function (storeNames, ...args) {
            const tx = func.call(unwrap(this), storeNames, ...args);
            transactionStoreNamesMap.set(tx, storeNames.sort ? storeNames.sort() : [storeNames]);
            return wrap(tx);
        };
    }
    // Cursor methods are special, as the behaviour is a little more different to standard IDB. In
    // IDB, you advance the cursor and wait for a new 'success' on the IDBRequest that gave you the
    // cursor. It's kinda like a promise that can resolve with many values. That doesn't make sense
    // with real promises, so each advance methods returns a new promise for the cursor object, or
    // undefined if the end of the cursor has been reached.
    if (getCursorAdvanceMethods().includes(func)) {
        return function (...args) {
            // Calling the original function with the proxy as 'this' causes ILLEGAL INVOCATION, so we use
            // the original object.
            func.apply(unwrap(this), args);
            return wrap(cursorRequestMap.get(this));
        };
    }
    return function (...args) {
        // Calling the original function with the proxy as 'this' causes ILLEGAL INVOCATION, so we use
        // the original object.
        return wrap(func.apply(unwrap(this), args));
    };
}
function transformCachableValue(value) {
    if (typeof value === 'function')
        return wrapFunction(value);
    // This doesn't return, it just creates a 'done' promise for the transaction,
    // which is later returned for transaction.done (see idbObjectHandler).
    if (value instanceof IDBTransaction)
        cacheDonePromiseForTransaction(value);
    if (instanceOfAny(value, getIdbProxyableTypes()))
        return new Proxy(value, idbProxyTraps);
    // Return the same value back if we're not going to transform it.
    return value;
}
function wrap(value) {
    // We sometimes generate multiple promises from a single IDBRequest (eg when cursoring), because
    // IDB is weird and a single IDBRequest can yield many responses, so these can't be cached.
    if (value instanceof IDBRequest)
        return promisifyRequest(value);
    // If we've already transformed this value before, reuse the transformed value.
    // This is faster, but it also provides object equality.
    if (transformCache.has(value))
        return transformCache.get(value);
    const newValue = transformCachableValue(value);
    // Not all types are transformed.
    // These may be primitive types, so they can't be WeakMap keys.
    if (newValue !== value) {
        transformCache.set(value, newValue);
        reverseTransformCache.set(newValue, value);
    }
    return newValue;
}
const unwrap = (value) => reverseTransformCache.get(value);




/***/ }),

/***/ "./client/InitialiseIndexDbBlazor.ts":
/*!*******************************************!*\
  !*** ./client/InitialiseIndexDbBlazor.ts ***!
  \*******************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
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
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.IndexedDbManager = void 0;
const idb_1 = __webpack_require__(/*! idb */ "./node_modules/idb/build/esm/index.js");
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
                    this.dbInstance = yield idb_1.openDB(database.name, database.version, {
                        upgrade(db, oldVersion, newVersion, transaction) {
                            try {
                                IndexedDbManager.upgradeDatabase(db, oldVersion, newVersion, database);
                            }
                            catch (error) {
                                upgradeError = error.toString();
                                throw (error);
                            }
                        },
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
                yield idb_1.deleteDB(dbName);
                this.dbInstance = undefined;
                return `The database ${dbName} has been deleted`;
            }
            catch (error) {
                throw `Database ${dbName}, ${error.toString()}`;
            }
        });
        this.getDbSchema = (dbName) => __awaiter(this, void 0, void 0, function* () {
            try {
                if (!this.dbInstance)
                    throw E_DB_CLOSED;
                const dbInstance = this.dbInstance;
                const dbInfo = {
                    name: dbInstance.name,
                    version: dbInstance.version,
                    objectStores: []
                };
                for (let s = 0; s < dbInstance.objectStoreNames.length; s++) {
                    let dbStore = dbInstance.transaction(dbInstance.objectStoreNames[s], 'readonly').store;
                    let objectStore = {
                        name: dbStore.name,
                        keyPath: Array.isArray(dbStore.keyPath) ? dbStore.keyPath.join(',') : dbStore.keyPath,
                        autoIncrement: dbStore.autoIncrement,
                        indexes: []
                    };
                    for (let i = 0; i < dbStore.indexNames.length; i++) {
                        const dbIndex = dbStore.index(dbStore.indexNames[i]);
                        let index = {
                            name: dbIndex.name,
                            keyPath: Array.isArray(dbIndex.keyPath) ? dbIndex.keyPath.join(',') : dbIndex.keyPath,
                            multiEntry: dbIndex.multiEntry,
                            unique: dbIndex.unique
                        };
                        objectStore.indexes.push(index);
                    }
                    dbInfo.objectStores.push(objectStore);
                }
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
                let result = yield tx.store.count(key !== null && key !== void 0 ? key : undefined);
                yield tx.done;
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
                let result = yield tx.store.get(key);
                yield tx.done;
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
                let results = yield tx.store.getAll(key !== null && key !== void 0 ? key : undefined, count !== null && count !== void 0 ? count : undefined);
                yield tx.done;
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
                let results = [];
                for (let index = 0; index < key.length; index++) {
                    const element = key[index];
                    results = results.concat(yield tx.store.getAll(element));
                }
                yield tx.done;
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
                let result = yield tx.store.getKey(key);
                yield tx.done;
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
                let results = yield tx.store.getAllKeys(key !== null && key !== void 0 ? key : undefined, count !== null && count !== void 0 ? count : undefined);
                yield tx.done;
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
                let results = [];
                for (let index = 0; index < key.length; index++) {
                    const element = key[index];
                    results = results.concat(yield tx.store.getAllKeys(element));
                }
                yield tx.done;
                return results;
            }
            catch (error) {
                throw `Store ${storeName}, ${error.toString()}`;
            }
        });
        this.query = (storeName, key, filter, count = 0, skip = 0) => __awaiter(this, void 0, void 0, function* () {
            try {
                if (!this.dbInstance)
                    throw E_DB_CLOSED;
                try {
                    var func = new Function('obj', filter);
                }
                catch (error) {
                    throw `${error.toString()} in filter { ${filter} }`;
                }
                var row = 0;
                var errorMessage = "";
                let results = [];
                const tx = this.dbInstance.transaction(storeName, 'readonly');
                let cursor = yield tx.store.openCursor(key !== null && key !== void 0 ? key : undefined);
                while (cursor) {
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
                    cursor = yield cursor.continue();
                }
                yield tx.done;
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
                let result = yield tx.store.index(indexName).count(key !== null && key !== void 0 ? key : undefined);
                yield tx.done;
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
                const results = yield tx.store.index(indexName).get(key);
                yield tx.done;
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
                const results = yield tx.store.index(indexName).getAll(key !== null && key !== void 0 ? key : undefined, count !== null && count !== void 0 ? count : undefined);
                yield tx.done;
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
                const dx = tx.store.index(indexName);
                let results = [];
                for (let index = 0; index < key.length; index++) {
                    const element = key[index];
                    results = results.concat(yield dx.getAll(element));
                }
                yield tx.done;
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
                const results = yield tx.store.index(indexName).getKey(key);
                yield tx.done;
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
                const results = yield tx.store.index(indexName).getAllKeys(key !== null && key !== void 0 ? key : undefined, count !== null && count !== void 0 ? count : undefined);
                yield tx.done;
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
                const dx = tx.store.index(indexName);
                let results = [];
                for (let index = 0; index < key.length; index++) {
                    const element = key[index];
                    results = results.concat(yield dx.getAllKeys(element));
                }
                yield tx.done;
                return results;
            }
            catch (error) {
                throw `Store ${storeName}, Index ${indexName}, ${error.toString()}`;
            }
        });
        this.queryFromIndex = (storeName, indexName, key, filter, count = 0, skip = 0) => __awaiter(this, void 0, void 0, function* () {
            try {
                if (!this.dbInstance)
                    throw E_DB_CLOSED;
                try {
                    var func = new Function('obj', filter);
                }
                catch (error) {
                    throw `${error.toString()} in filter { ${filter} }`;
                }
                var row = 0;
                var errorMessage = "";
                let results = [];
                const tx = this.dbInstance.transaction(storeName, 'readonly');
                let cursor = yield tx.store.index(indexName).openCursor(key !== null && key !== void 0 ? key : undefined);
                while (cursor) {
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
                    cursor = yield cursor.continue();
                }
                yield tx.done;
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
                data = this.checkForKeyPath(tx.store, data);
                const result = yield tx.store.add(data, key !== null && key !== void 0 ? key : undefined);
                yield tx.done;
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
                const result = yield tx.store.put(data, key !== null && key !== void 0 ? key : undefined);
                yield tx.done;
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
                yield tx.store.delete(id);
                yield tx.done;
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
                data.forEach((element) => __awaiter(this, void 0, void 0, function* () {
                    let item = this.checkForKeyPath(tx.store, element);
                    yield tx.store.add(item);
                }));
                yield tx.done;
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
                    yield tx.store.put(element);
                }));
                yield tx.done;
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
                    yield tx.store.delete(element);
                }));
                yield tx.done;
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
                yield tx.store.clear();
                yield tx.done;
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
    static upgradeDatabase(upgradeDB, oldVersion, newVersion, dbDatabase) {
        if (newVersion && newVersion > oldVersion) {
            if (dbDatabase.objectStores) {
                for (var store of dbDatabase.objectStores) {
                    if (!upgradeDB.objectStoreNames.contains(store.name)) {
                        this.addNewStore(upgradeDB, store);
                    }
                }
            }
        }
    }
    static getKeyPath(keyPath) {
        if (keyPath) {
            var multiKeyPath = keyPath.split(',');
            return multiKeyPath.length > 1 ? multiKeyPath : keyPath;
        }
        else {
            return undefined;
        }
    }
    static addNewStore(upgradeDB, store) {
        var _a;
        try {
            const newStore = upgradeDB.createObjectStore(store.name, {
                keyPath: this.getKeyPath(store.keyPath),
                autoIncrement: store.autoIncrement
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


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop)
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	// startup
/******/ 	// Load entry module
/******/ 	__webpack_require__("./client/InitialiseIndexDbBlazor.ts");
/******/ 	// This entry module used 'exports' so it can't be inlined
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9pbmRleGVkZGJibGF6b3IuanMvLi9ub2RlX21vZHVsZXMvaWRiL2J1aWxkL2VzbS9pbmRleC5qcyIsIndlYnBhY2s6Ly9pbmRleGVkZGJibGF6b3IuanMvLi9ub2RlX21vZHVsZXMvaWRiL2J1aWxkL2VzbS93cmFwLWlkYi12YWx1ZS5qcyIsIndlYnBhY2s6Ly9pbmRleGVkZGJibGF6b3IuanMvLi9jbGllbnQvSW5pdGlhbGlzZUluZGV4RGJCbGF6b3IudHMiLCJ3ZWJwYWNrOi8vaW5kZXhlZGRiYmxhem9yLmpzLy4vY2xpZW50L2luZGV4ZWREYkJsYXpvci50cyIsIndlYnBhY2s6Ly9pbmRleGVkZGJibGF6b3IuanMvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vaW5kZXhlZGRiYmxhem9yLmpzL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9pbmRleGVkZGJibGF6b3IuanMvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9pbmRleGVkZGJibGF6b3IuanMvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9pbmRleGVkZGJibGF6b3IuanMvd2VicGFjay9zdGFydHVwIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFtRTtBQUNOOztBQUU3RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdDQUFnQyx5Q0FBeUMsS0FBSztBQUM5RTtBQUNBLHdCQUF3QixxREFBSTtBQUM1QjtBQUNBO0FBQ0Esb0JBQW9CLHFEQUFJLHNEQUFzRCxxREFBSTtBQUNsRixTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMLHNCQUFzQixFQUFFO0FBQ3hCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUJBQXlCLFVBQVUsS0FBSztBQUN4QztBQUNBO0FBQ0E7QUFDQSxXQUFXLHFEQUFJO0FBQ2Y7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxREFBWTtBQUNaO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRTJCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDbEY1Qjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMLHNCQUFzQixFQUFFO0FBQ3hCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNB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VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3JCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHdDQUF3Qyx5Q0FBeUM7V0FDakY7V0FDQTtXQUNBLEU7Ozs7O1dDUEEsc0Y7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0Esc0RBQXNELGtCQUFrQjtXQUN4RTtXQUNBLCtDQUErQyxjQUFjO1dBQzdELEU7Ozs7VUNOQTtVQUNBO1VBQ0E7VUFDQSIsImZpbGUiOiJCbGF6b3JJbmRleGVkRGIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyB3IGFzIHdyYXAsIHIgYXMgcmVwbGFjZVRyYXBzIH0gZnJvbSAnLi93cmFwLWlkYi12YWx1ZS5qcyc7XG5leHBvcnQgeyB1IGFzIHVud3JhcCwgdyBhcyB3cmFwIH0gZnJvbSAnLi93cmFwLWlkYi12YWx1ZS5qcyc7XG5cbi8qKlxuICogT3BlbiBhIGRhdGFiYXNlLlxuICpcbiAqIEBwYXJhbSBuYW1lIE5hbWUgb2YgdGhlIGRhdGFiYXNlLlxuICogQHBhcmFtIHZlcnNpb24gU2NoZW1hIHZlcnNpb24uXG4gKiBAcGFyYW0gY2FsbGJhY2tzIEFkZGl0aW9uYWwgY2FsbGJhY2tzLlxuICovXG5mdW5jdGlvbiBvcGVuREIobmFtZSwgdmVyc2lvbiwgeyBibG9ja2VkLCB1cGdyYWRlLCBibG9ja2luZywgdGVybWluYXRlZCB9ID0ge30pIHtcbiAgICBjb25zdCByZXF1ZXN0ID0gaW5kZXhlZERCLm9wZW4obmFtZSwgdmVyc2lvbik7XG4gICAgY29uc3Qgb3BlblByb21pc2UgPSB3cmFwKHJlcXVlc3QpO1xuICAgIGlmICh1cGdyYWRlKSB7XG4gICAgICAgIHJlcXVlc3QuYWRkRXZlbnRMaXN0ZW5lcigndXBncmFkZW5lZWRlZCcsIChldmVudCkgPT4ge1xuICAgICAgICAgICAgdXBncmFkZSh3cmFwKHJlcXVlc3QucmVzdWx0KSwgZXZlbnQub2xkVmVyc2lvbiwgZXZlbnQubmV3VmVyc2lvbiwgd3JhcChyZXF1ZXN0LnRyYW5zYWN0aW9uKSk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBpZiAoYmxvY2tlZClcbiAgICAgICAgcmVxdWVzdC5hZGRFdmVudExpc3RlbmVyKCdibG9ja2VkJywgKCkgPT4gYmxvY2tlZCgpKTtcbiAgICBvcGVuUHJvbWlzZVxuICAgICAgICAudGhlbigoZGIpID0+IHtcbiAgICAgICAgaWYgKHRlcm1pbmF0ZWQpXG4gICAgICAgICAgICBkYi5hZGRFdmVudExpc3RlbmVyKCdjbG9zZScsICgpID0+IHRlcm1pbmF0ZWQoKSk7XG4gICAgICAgIGlmIChibG9ja2luZylcbiAgICAgICAgICAgIGRiLmFkZEV2ZW50TGlzdGVuZXIoJ3ZlcnNpb25jaGFuZ2UnLCAoKSA9PiBibG9ja2luZygpKTtcbiAgICB9KVxuICAgICAgICAuY2F0Y2goKCkgPT4geyB9KTtcbiAgICByZXR1cm4gb3BlblByb21pc2U7XG59XG4vKipcbiAqIERlbGV0ZSBhIGRhdGFiYXNlLlxuICpcbiAqIEBwYXJhbSBuYW1lIE5hbWUgb2YgdGhlIGRhdGFiYXNlLlxuICovXG5mdW5jdGlvbiBkZWxldGVEQihuYW1lLCB7IGJsb2NrZWQgfSA9IHt9KSB7XG4gICAgY29uc3QgcmVxdWVzdCA9IGluZGV4ZWREQi5kZWxldGVEYXRhYmFzZShuYW1lKTtcbiAgICBpZiAoYmxvY2tlZClcbiAgICAgICAgcmVxdWVzdC5hZGRFdmVudExpc3RlbmVyKCdibG9ja2VkJywgKCkgPT4gYmxvY2tlZCgpKTtcbiAgICByZXR1cm4gd3JhcChyZXF1ZXN0KS50aGVuKCgpID0+IHVuZGVmaW5lZCk7XG59XG5cbmNvbnN0IHJlYWRNZXRob2RzID0gWydnZXQnLCAnZ2V0S2V5JywgJ2dldEFsbCcsICdnZXRBbGxLZXlzJywgJ2NvdW50J107XG5jb25zdCB3cml0ZU1ldGhvZHMgPSBbJ3B1dCcsICdhZGQnLCAnZGVsZXRlJywgJ2NsZWFyJ107XG5jb25zdCBjYWNoZWRNZXRob2RzID0gbmV3IE1hcCgpO1xuZnVuY3Rpb24gZ2V0TWV0aG9kKHRhcmdldCwgcHJvcCkge1xuICAgIGlmICghKHRhcmdldCBpbnN0YW5jZW9mIElEQkRhdGFiYXNlICYmXG4gICAgICAgICEocHJvcCBpbiB0YXJnZXQpICYmXG4gICAgICAgIHR5cGVvZiBwcm9wID09PSAnc3RyaW5nJykpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAoY2FjaGVkTWV0aG9kcy5nZXQocHJvcCkpXG4gICAgICAgIHJldHVybiBjYWNoZWRNZXRob2RzLmdldChwcm9wKTtcbiAgICBjb25zdCB0YXJnZXRGdW5jTmFtZSA9IHByb3AucmVwbGFjZSgvRnJvbUluZGV4JC8sICcnKTtcbiAgICBjb25zdCB1c2VJbmRleCA9IHByb3AgIT09IHRhcmdldEZ1bmNOYW1lO1xuICAgIGNvbnN0IGlzV3JpdGUgPSB3cml0ZU1ldGhvZHMuaW5jbHVkZXModGFyZ2V0RnVuY05hbWUpO1xuICAgIGlmIChcbiAgICAvLyBCYWlsIGlmIHRoZSB0YXJnZXQgZG9lc24ndCBleGlzdCBvbiB0aGUgdGFyZ2V0LiBFZywgZ2V0QWxsIGlzbid0IGluIEVkZ2UuXG4gICAgISh0YXJnZXRGdW5jTmFtZSBpbiAodXNlSW5kZXggPyBJREJJbmRleCA6IElEQk9iamVjdFN0b3JlKS5wcm90b3R5cGUpIHx8XG4gICAgICAgICEoaXNXcml0ZSB8fCByZWFkTWV0aG9kcy5pbmNsdWRlcyh0YXJnZXRGdW5jTmFtZSkpKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY29uc3QgbWV0aG9kID0gYXN5bmMgZnVuY3Rpb24gKHN0b3JlTmFtZSwgLi4uYXJncykge1xuICAgICAgICAvLyBpc1dyaXRlID8gJ3JlYWR3cml0ZScgOiB1bmRlZmluZWQgZ3ppcHBzIGJldHRlciwgYnV0IGZhaWxzIGluIEVkZ2UgOihcbiAgICAgICAgY29uc3QgdHggPSB0aGlzLnRyYW5zYWN0aW9uKHN0b3JlTmFtZSwgaXNXcml0ZSA/ICdyZWFkd3JpdGUnIDogJ3JlYWRvbmx5Jyk7XG4gICAgICAgIGxldCB0YXJnZXQgPSB0eC5zdG9yZTtcbiAgICAgICAgaWYgKHVzZUluZGV4KVxuICAgICAgICAgICAgdGFyZ2V0ID0gdGFyZ2V0LmluZGV4KGFyZ3Muc2hpZnQoKSk7XG4gICAgICAgIGNvbnN0IHJldHVyblZhbCA9IGF3YWl0IHRhcmdldFt0YXJnZXRGdW5jTmFtZV0oLi4uYXJncyk7XG4gICAgICAgIGlmIChpc1dyaXRlKVxuICAgICAgICAgICAgYXdhaXQgdHguZG9uZTtcbiAgICAgICAgcmV0dXJuIHJldHVyblZhbDtcbiAgICB9O1xuICAgIGNhY2hlZE1ldGhvZHMuc2V0KHByb3AsIG1ldGhvZCk7XG4gICAgcmV0dXJuIG1ldGhvZDtcbn1cbnJlcGxhY2VUcmFwcygob2xkVHJhcHMpID0+ICh7XG4gICAgLi4ub2xkVHJhcHMsXG4gICAgZ2V0OiAodGFyZ2V0LCBwcm9wLCByZWNlaXZlcikgPT4gZ2V0TWV0aG9kKHRhcmdldCwgcHJvcCkgfHwgb2xkVHJhcHMuZ2V0KHRhcmdldCwgcHJvcCwgcmVjZWl2ZXIpLFxuICAgIGhhczogKHRhcmdldCwgcHJvcCkgPT4gISFnZXRNZXRob2QodGFyZ2V0LCBwcm9wKSB8fCBvbGRUcmFwcy5oYXModGFyZ2V0LCBwcm9wKSxcbn0pKTtcblxuZXhwb3J0IHsgZGVsZXRlREIsIG9wZW5EQiB9O1xuIiwiY29uc3QgaW5zdGFuY2VPZkFueSA9IChvYmplY3QsIGNvbnN0cnVjdG9ycykgPT4gY29uc3RydWN0b3JzLnNvbWUoKGMpID0+IG9iamVjdCBpbnN0YW5jZW9mIGMpO1xuXG5sZXQgaWRiUHJveHlhYmxlVHlwZXM7XG5sZXQgY3Vyc29yQWR2YW5jZU1ldGhvZHM7XG4vLyBUaGlzIGlzIGEgZnVuY3Rpb24gdG8gcHJldmVudCBpdCB0aHJvd2luZyB1cCBpbiBub2RlIGVudmlyb25tZW50cy5cbmZ1bmN0aW9uIGdldElkYlByb3h5YWJsZVR5cGVzKCkge1xuICAgIHJldHVybiAoaWRiUHJveHlhYmxlVHlwZXMgfHxcbiAgICAgICAgKGlkYlByb3h5YWJsZVR5cGVzID0gW1xuICAgICAgICAgICAgSURCRGF0YWJhc2UsXG4gICAgICAgICAgICBJREJPYmplY3RTdG9yZSxcbiAgICAgICAgICAgIElEQkluZGV4LFxuICAgICAgICAgICAgSURCQ3Vyc29yLFxuICAgICAgICAgICAgSURCVHJhbnNhY3Rpb24sXG4gICAgICAgIF0pKTtcbn1cbi8vIFRoaXMgaXMgYSBmdW5jdGlvbiB0byBwcmV2ZW50IGl0IHRocm93aW5nIHVwIGluIG5vZGUgZW52aXJvbm1lbnRzLlxuZnVuY3Rpb24gZ2V0Q3Vyc29yQWR2YW5jZU1ldGhvZHMoKSB7XG4gICAgcmV0dXJuIChjdXJzb3JBZHZhbmNlTWV0aG9kcyB8fFxuICAgICAgICAoY3Vyc29yQWR2YW5jZU1ldGhvZHMgPSBbXG4gICAgICAgICAgICBJREJDdXJzb3IucHJvdG90eXBlLmFkdmFuY2UsXG4gICAgICAgICAgICBJREJDdXJzb3IucHJvdG90eXBlLmNvbnRpbnVlLFxuICAgICAgICAgICAgSURCQ3Vyc29yLnByb3RvdHlwZS5jb250aW51ZVByaW1hcnlLZXksXG4gICAgICAgIF0pKTtcbn1cbmNvbnN0IGN1cnNvclJlcXVlc3RNYXAgPSBuZXcgV2Vha01hcCgpO1xuY29uc3QgdHJhbnNhY3Rpb25Eb25lTWFwID0gbmV3IFdlYWtNYXAoKTtcbmNvbnN0IHRyYW5zYWN0aW9uU3RvcmVOYW1lc01hcCA9IG5ldyBXZWFrTWFwKCk7XG5jb25zdCB0cmFuc2Zvcm1DYWNoZSA9IG5ldyBXZWFrTWFwKCk7XG5jb25zdCByZXZlcnNlVHJhbnNmb3JtQ2FjaGUgPSBuZXcgV2Vha01hcCgpO1xuZnVuY3Rpb24gcHJvbWlzaWZ5UmVxdWVzdChyZXF1ZXN0KSB7XG4gICAgY29uc3QgcHJvbWlzZSA9IG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgY29uc3QgdW5saXN0ZW4gPSAoKSA9PiB7XG4gICAgICAgICAgICByZXF1ZXN0LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3N1Y2Nlc3MnLCBzdWNjZXNzKTtcbiAgICAgICAgICAgIHJlcXVlc3QucmVtb3ZlRXZlbnRMaXN0ZW5lcignZXJyb3InLCBlcnJvcik7XG4gICAgICAgIH07XG4gICAgICAgIGNvbnN0IHN1Y2Nlc3MgPSAoKSA9PiB7XG4gICAgICAgICAgICByZXNvbHZlKHdyYXAocmVxdWVzdC5yZXN1bHQpKTtcbiAgICAgICAgICAgIHVubGlzdGVuKCk7XG4gICAgICAgIH07XG4gICAgICAgIGNvbnN0IGVycm9yID0gKCkgPT4ge1xuICAgICAgICAgICAgcmVqZWN0KHJlcXVlc3QuZXJyb3IpO1xuICAgICAgICAgICAgdW5saXN0ZW4oKTtcbiAgICAgICAgfTtcbiAgICAgICAgcmVxdWVzdC5hZGRFdmVudExpc3RlbmVyKCdzdWNjZXNzJywgc3VjY2Vzcyk7XG4gICAgICAgIHJlcXVlc3QuYWRkRXZlbnRMaXN0ZW5lcignZXJyb3InLCBlcnJvcik7XG4gICAgfSk7XG4gICAgcHJvbWlzZVxuICAgICAgICAudGhlbigodmFsdWUpID0+IHtcbiAgICAgICAgLy8gU2luY2UgY3Vyc29yaW5nIHJldXNlcyB0aGUgSURCUmVxdWVzdCAoKnNpZ2gqKSwgd2UgY2FjaGUgaXQgZm9yIGxhdGVyIHJldHJpZXZhbFxuICAgICAgICAvLyAoc2VlIHdyYXBGdW5jdGlvbikuXG4gICAgICAgIGlmICh2YWx1ZSBpbnN0YW5jZW9mIElEQkN1cnNvcikge1xuICAgICAgICAgICAgY3Vyc29yUmVxdWVzdE1hcC5zZXQodmFsdWUsIHJlcXVlc3QpO1xuICAgICAgICB9XG4gICAgICAgIC8vIENhdGNoaW5nIHRvIGF2b2lkIFwiVW5jYXVnaHQgUHJvbWlzZSBleGNlcHRpb25zXCJcbiAgICB9KVxuICAgICAgICAuY2F0Y2goKCkgPT4geyB9KTtcbiAgICAvLyBUaGlzIG1hcHBpbmcgZXhpc3RzIGluIHJldmVyc2VUcmFuc2Zvcm1DYWNoZSBidXQgZG9lc24ndCBkb2Vzbid0IGV4aXN0IGluIHRyYW5zZm9ybUNhY2hlLiBUaGlzXG4gICAgLy8gaXMgYmVjYXVzZSB3ZSBjcmVhdGUgbWFueSBwcm9taXNlcyBmcm9tIGEgc2luZ2xlIElEQlJlcXVlc3QuXG4gICAgcmV2ZXJzZVRyYW5zZm9ybUNhY2hlLnNldChwcm9taXNlLCByZXF1ZXN0KTtcbiAgICByZXR1cm4gcHJvbWlzZTtcbn1cbmZ1bmN0aW9uIGNhY2hlRG9uZVByb21pc2VGb3JUcmFuc2FjdGlvbih0eCkge1xuICAgIC8vIEVhcmx5IGJhaWwgaWYgd2UndmUgYWxyZWFkeSBjcmVhdGVkIGEgZG9uZSBwcm9taXNlIGZvciB0aGlzIHRyYW5zYWN0aW9uLlxuICAgIGlmICh0cmFuc2FjdGlvbkRvbmVNYXAuaGFzKHR4KSlcbiAgICAgICAgcmV0dXJuO1xuICAgIGNvbnN0IGRvbmUgPSBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgIGNvbnN0IHVubGlzdGVuID0gKCkgPT4ge1xuICAgICAgICAgICAgdHgucmVtb3ZlRXZlbnRMaXN0ZW5lcignY29tcGxldGUnLCBjb21wbGV0ZSk7XG4gICAgICAgICAgICB0eC5yZW1vdmVFdmVudExpc3RlbmVyKCdlcnJvcicsIGVycm9yKTtcbiAgICAgICAgICAgIHR4LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2Fib3J0JywgZXJyb3IpO1xuICAgICAgICB9O1xuICAgICAgICBjb25zdCBjb21wbGV0ZSA9ICgpID0+IHtcbiAgICAgICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgICAgIHVubGlzdGVuKCk7XG4gICAgICAgIH07XG4gICAgICAgIGNvbnN0IGVycm9yID0gKCkgPT4ge1xuICAgICAgICAgICAgcmVqZWN0KHR4LmVycm9yIHx8IG5ldyBET01FeGNlcHRpb24oJ0Fib3J0RXJyb3InLCAnQWJvcnRFcnJvcicpKTtcbiAgICAgICAgICAgIHVubGlzdGVuKCk7XG4gICAgICAgIH07XG4gICAgICAgIHR4LmFkZEV2ZW50TGlzdGVuZXIoJ2NvbXBsZXRlJywgY29tcGxldGUpO1xuICAgICAgICB0eC5hZGRFdmVudExpc3RlbmVyKCdlcnJvcicsIGVycm9yKTtcbiAgICAgICAgdHguYWRkRXZlbnRMaXN0ZW5lcignYWJvcnQnLCBlcnJvcik7XG4gICAgfSk7XG4gICAgLy8gQ2FjaGUgaXQgZm9yIGxhdGVyIHJldHJpZXZhbC5cbiAgICB0cmFuc2FjdGlvbkRvbmVNYXAuc2V0KHR4LCBkb25lKTtcbn1cbmxldCBpZGJQcm94eVRyYXBzID0ge1xuICAgIGdldCh0YXJnZXQsIHByb3AsIHJlY2VpdmVyKSB7XG4gICAgICAgIGlmICh0YXJnZXQgaW5zdGFuY2VvZiBJREJUcmFuc2FjdGlvbikge1xuICAgICAgICAgICAgLy8gU3BlY2lhbCBoYW5kbGluZyBmb3IgdHJhbnNhY3Rpb24uZG9uZS5cbiAgICAgICAgICAgIGlmIChwcm9wID09PSAnZG9uZScpXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRyYW5zYWN0aW9uRG9uZU1hcC5nZXQodGFyZ2V0KTtcbiAgICAgICAgICAgIC8vIFBvbHlmaWxsIGZvciBvYmplY3RTdG9yZU5hbWVzIGJlY2F1c2Ugb2YgRWRnZS5cbiAgICAgICAgICAgIGlmIChwcm9wID09PSAnb2JqZWN0U3RvcmVOYW1lcycpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGFyZ2V0Lm9iamVjdFN0b3JlTmFtZXMgfHwgdHJhbnNhY3Rpb25TdG9yZU5hbWVzTWFwLmdldCh0YXJnZXQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gTWFrZSB0eC5zdG9yZSByZXR1cm4gdGhlIG9ubHkgc3RvcmUgaW4gdGhlIHRyYW5zYWN0aW9uLCBvciB1bmRlZmluZWQgaWYgdGhlcmUgYXJlIG1hbnkuXG4gICAgICAgICAgICBpZiAocHJvcCA9PT0gJ3N0b3JlJykge1xuICAgICAgICAgICAgICAgIHJldHVybiByZWNlaXZlci5vYmplY3RTdG9yZU5hbWVzWzFdXG4gICAgICAgICAgICAgICAgICAgID8gdW5kZWZpbmVkXG4gICAgICAgICAgICAgICAgICAgIDogcmVjZWl2ZXIub2JqZWN0U3RvcmUocmVjZWl2ZXIub2JqZWN0U3RvcmVOYW1lc1swXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgLy8gRWxzZSB0cmFuc2Zvcm0gd2hhdGV2ZXIgd2UgZ2V0IGJhY2suXG4gICAgICAgIHJldHVybiB3cmFwKHRhcmdldFtwcm9wXSk7XG4gICAgfSxcbiAgICBzZXQodGFyZ2V0LCBwcm9wLCB2YWx1ZSkge1xuICAgICAgICB0YXJnZXRbcHJvcF0gPSB2YWx1ZTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSxcbiAgICBoYXModGFyZ2V0LCBwcm9wKSB7XG4gICAgICAgIGlmICh0YXJnZXQgaW5zdGFuY2VvZiBJREJUcmFuc2FjdGlvbiAmJlxuICAgICAgICAgICAgKHByb3AgPT09ICdkb25lJyB8fCBwcm9wID09PSAnc3RvcmUnKSkge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHByb3AgaW4gdGFyZ2V0O1xuICAgIH0sXG59O1xuZnVuY3Rpb24gcmVwbGFjZVRyYXBzKGNhbGxiYWNrKSB7XG4gICAgaWRiUHJveHlUcmFwcyA9IGNhbGxiYWNrKGlkYlByb3h5VHJhcHMpO1xufVxuZnVuY3Rpb24gd3JhcEZ1bmN0aW9uKGZ1bmMpIHtcbiAgICAvLyBEdWUgdG8gZXhwZWN0ZWQgb2JqZWN0IGVxdWFsaXR5ICh3aGljaCBpcyBlbmZvcmNlZCBieSB0aGUgY2FjaGluZyBpbiBgd3JhcGApLCB3ZVxuICAgIC8vIG9ubHkgY3JlYXRlIG9uZSBuZXcgZnVuYyBwZXIgZnVuYy5cbiAgICAvLyBFZGdlIGRvZXNuJ3Qgc3VwcG9ydCBvYmplY3RTdG9yZU5hbWVzIChib29vKSwgc28gd2UgcG9seWZpbGwgaXQgaGVyZS5cbiAgICBpZiAoZnVuYyA9PT0gSURCRGF0YWJhc2UucHJvdG90eXBlLnRyYW5zYWN0aW9uICYmXG4gICAgICAgICEoJ29iamVjdFN0b3JlTmFtZXMnIGluIElEQlRyYW5zYWN0aW9uLnByb3RvdHlwZSkpIHtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIChzdG9yZU5hbWVzLCAuLi5hcmdzKSB7XG4gICAgICAgICAgICBjb25zdCB0eCA9IGZ1bmMuY2FsbCh1bndyYXAodGhpcyksIHN0b3JlTmFtZXMsIC4uLmFyZ3MpO1xuICAgICAgICAgICAgdHJhbnNhY3Rpb25TdG9yZU5hbWVzTWFwLnNldCh0eCwgc3RvcmVOYW1lcy5zb3J0ID8gc3RvcmVOYW1lcy5zb3J0KCkgOiBbc3RvcmVOYW1lc10pO1xuICAgICAgICAgICAgcmV0dXJuIHdyYXAodHgpO1xuICAgICAgICB9O1xuICAgIH1cbiAgICAvLyBDdXJzb3IgbWV0aG9kcyBhcmUgc3BlY2lhbCwgYXMgdGhlIGJlaGF2aW91ciBpcyBhIGxpdHRsZSBtb3JlIGRpZmZlcmVudCB0byBzdGFuZGFyZCBJREIuIEluXG4gICAgLy8gSURCLCB5b3UgYWR2YW5jZSB0aGUgY3Vyc29yIGFuZCB3YWl0IGZvciBhIG5ldyAnc3VjY2Vzcycgb24gdGhlIElEQlJlcXVlc3QgdGhhdCBnYXZlIHlvdSB0aGVcbiAgICAvLyBjdXJzb3IuIEl0J3Mga2luZGEgbGlrZSBhIHByb21pc2UgdGhhdCBjYW4gcmVzb2x2ZSB3aXRoIG1hbnkgdmFsdWVzLiBUaGF0IGRvZXNuJ3QgbWFrZSBzZW5zZVxuICAgIC8vIHdpdGggcmVhbCBwcm9taXNlcywgc28gZWFjaCBhZHZhbmNlIG1ldGhvZHMgcmV0dXJucyBhIG5ldyBwcm9taXNlIGZvciB0aGUgY3Vyc29yIG9iamVjdCwgb3JcbiAgICAvLyB1bmRlZmluZWQgaWYgdGhlIGVuZCBvZiB0aGUgY3Vyc29yIGhhcyBiZWVuIHJlYWNoZWQuXG4gICAgaWYgKGdldEN1cnNvckFkdmFuY2VNZXRob2RzKCkuaW5jbHVkZXMoZnVuYykpIHtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uICguLi5hcmdzKSB7XG4gICAgICAgICAgICAvLyBDYWxsaW5nIHRoZSBvcmlnaW5hbCBmdW5jdGlvbiB3aXRoIHRoZSBwcm94eSBhcyAndGhpcycgY2F1c2VzIElMTEVHQUwgSU5WT0NBVElPTiwgc28gd2UgdXNlXG4gICAgICAgICAgICAvLyB0aGUgb3JpZ2luYWwgb2JqZWN0LlxuICAgICAgICAgICAgZnVuYy5hcHBseSh1bndyYXAodGhpcyksIGFyZ3MpO1xuICAgICAgICAgICAgcmV0dXJuIHdyYXAoY3Vyc29yUmVxdWVzdE1hcC5nZXQodGhpcykpO1xuICAgICAgICB9O1xuICAgIH1cbiAgICByZXR1cm4gZnVuY3Rpb24gKC4uLmFyZ3MpIHtcbiAgICAgICAgLy8gQ2FsbGluZyB0aGUgb3JpZ2luYWwgZnVuY3Rpb24gd2l0aCB0aGUgcHJveHkgYXMgJ3RoaXMnIGNhdXNlcyBJTExFR0FMIElOVk9DQVRJT04sIHNvIHdlIHVzZVxuICAgICAgICAvLyB0aGUgb3JpZ2luYWwgb2JqZWN0LlxuICAgICAgICByZXR1cm4gd3JhcChmdW5jLmFwcGx5KHVud3JhcCh0aGlzKSwgYXJncykpO1xuICAgIH07XG59XG5mdW5jdGlvbiB0cmFuc2Zvcm1DYWNoYWJsZVZhbHVlKHZhbHVlKSB7XG4gICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ2Z1bmN0aW9uJylcbiAgICAgICAgcmV0dXJuIHdyYXBGdW5jdGlvbih2YWx1ZSk7XG4gICAgLy8gVGhpcyBkb2Vzbid0IHJldHVybiwgaXQganVzdCBjcmVhdGVzIGEgJ2RvbmUnIHByb21pc2UgZm9yIHRoZSB0cmFuc2FjdGlvbixcbiAgICAvLyB3aGljaCBpcyBsYXRlciByZXR1cm5lZCBmb3IgdHJhbnNhY3Rpb24uZG9uZSAoc2VlIGlkYk9iamVjdEhhbmRsZXIpLlxuICAgIGlmICh2YWx1ZSBpbnN0YW5jZW9mIElEQlRyYW5zYWN0aW9uKVxuICAgICAgICBjYWNoZURvbmVQcm9taXNlRm9yVHJhbnNhY3Rpb24odmFsdWUpO1xuICAgIGlmIChpbnN0YW5jZU9mQW55KHZhbHVlLCBnZXRJZGJQcm94eWFibGVUeXBlcygpKSlcbiAgICAgICAgcmV0dXJuIG5ldyBQcm94eSh2YWx1ZSwgaWRiUHJveHlUcmFwcyk7XG4gICAgLy8gUmV0dXJuIHRoZSBzYW1lIHZhbHVlIGJhY2sgaWYgd2UncmUgbm90IGdvaW5nIHRvIHRyYW5zZm9ybSBpdC5cbiAgICByZXR1cm4gdmFsdWU7XG59XG5mdW5jdGlvbiB3cmFwKHZhbHVlKSB7XG4gICAgLy8gV2Ugc29tZXRpbWVzIGdlbmVyYXRlIG11bHRpcGxlIHByb21pc2VzIGZyb20gYSBzaW5nbGUgSURCUmVxdWVzdCAoZWcgd2hlbiBjdXJzb3JpbmcpLCBiZWNhdXNlXG4gICAgLy8gSURCIGlzIHdlaXJkIGFuZCBhIHNpbmdsZSBJREJSZXF1ZXN0IGNhbiB5aWVsZCBtYW55IHJlc3BvbnNlcywgc28gdGhlc2UgY2FuJ3QgYmUgY2FjaGVkLlxuICAgIGlmICh2YWx1ZSBpbnN0YW5jZW9mIElEQlJlcXVlc3QpXG4gICAgICAgIHJldHVybiBwcm9taXNpZnlSZXF1ZXN0KHZhbHVlKTtcbiAgICAvLyBJZiB3ZSd2ZSBhbHJlYWR5IHRyYW5zZm9ybWVkIHRoaXMgdmFsdWUgYmVmb3JlLCByZXVzZSB0aGUgdHJhbnNmb3JtZWQgdmFsdWUuXG4gICAgLy8gVGhpcyBpcyBmYXN0ZXIsIGJ1dCBpdCBhbHNvIHByb3ZpZGVzIG9iamVjdCBlcXVhbGl0eS5cbiAgICBpZiAodHJhbnNmb3JtQ2FjaGUuaGFzKHZhbHVlKSlcbiAgICAgICAgcmV0dXJuIHRyYW5zZm9ybUNhY2hlLmdldCh2YWx1ZSk7XG4gICAgY29uc3QgbmV3VmFsdWUgPSB0cmFuc2Zvcm1DYWNoYWJsZVZhbHVlKHZhbHVlKTtcbiAgICAvLyBOb3QgYWxsIHR5cGVzIGFyZSB0cmFuc2Zvcm1lZC5cbiAgICAvLyBUaGVzZSBtYXkgYmUgcHJpbWl0aXZlIHR5cGVzLCBzbyB0aGV5IGNhbid0IGJlIFdlYWtNYXAga2V5cy5cbiAgICBpZiAobmV3VmFsdWUgIT09IHZhbHVlKSB7XG4gICAgICAgIHRyYW5zZm9ybUNhY2hlLnNldCh2YWx1ZSwgbmV3VmFsdWUpO1xuICAgICAgICByZXZlcnNlVHJhbnNmb3JtQ2FjaGUuc2V0KG5ld1ZhbHVlLCB2YWx1ZSk7XG4gICAgfVxuICAgIHJldHVybiBuZXdWYWx1ZTtcbn1cbmNvbnN0IHVud3JhcCA9ICh2YWx1ZSkgPT4gcmV2ZXJzZVRyYW5zZm9ybUNhY2hlLmdldCh2YWx1ZSk7XG5cbmV4cG9ydCB7IHJldmVyc2VUcmFuc2Zvcm1DYWNoZSBhcyBhLCBpbnN0YW5jZU9mQW55IGFzIGksIHJlcGxhY2VUcmFwcyBhcyByLCB1bndyYXAgYXMgdSwgd3JhcCBhcyB3IH07XG4iLCJpbXBvcnQgeyBJbmRleGVkRGJNYW5hZ2VyIH0gZnJvbSAnLi9pbmRleGVkRGJCbGF6b3InO1xuXG5uYW1lc3BhY2UgSW5kZXhEYiB7XG4gICAgY29uc3QgdGltZWdob3N0RXh0ZW5zaW9uczogc3RyaW5nID0gJ0JsYXpvckluZGV4ZWREYkpzJztcbiAgICBjb25zdCBleHRlbnNpb25PYmplY3QgPSB7XG4gICAgICAgIElEQk1hbmFnZXI6IG5ldyBJbmRleGVkRGJNYW5hZ2VyKClcbiAgICB9O1xuXG4gICAgZXhwb3J0IGZ1bmN0aW9uIGluaXRpYWxpc2UoKTogdm9pZCB7XG4gICAgICAgIGlmICh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyAmJiAhd2luZG93W3RpbWVnaG9zdEV4dGVuc2lvbnNdKSB7XG4gICAgICAgICAgICB3aW5kb3dbdGltZWdob3N0RXh0ZW5zaW9uc10gPSB7XG4gICAgICAgICAgICAgICAgLi4uZXh0ZW5zaW9uT2JqZWN0XG4gICAgICAgICAgICB9O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgd2luZG93W3RpbWVnaG9zdEV4dGVuc2lvbnNdID0ge1xuICAgICAgICAgICAgICAgIC4uLndpbmRvd1t0aW1lZ2hvc3RFeHRlbnNpb25zXSxcbiAgICAgICAgICAgICAgICAuLi5leHRlbnNpb25PYmplY3RcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cblxuICAgIH1cbn1cblxuSW5kZXhEYi5pbml0aWFsaXNlKCk7IiwiLy8vLy8gPHJlZmVyZW5jZSBwYXRoPVwiTWljcm9zb2Z0LkpTSW50ZXJvcC5kLnRzXCIvPlxuaW1wb3J0IHsgb3BlbkRCLCBkZWxldGVEQiwgSURCUERhdGFiYXNlLCBJREJQT2JqZWN0U3RvcmUgfSBmcm9tICdpZGInO1xuaW1wb3J0IHsgSURhdGFiYXNlLCBJT2JqZWN0U3RvcmUsIElJbmRleCB9IGZyb20gJy4vSW50ZXJvcEludGVyZmFjZXMnO1xuXG5jb25zdCBFX0RCX0NMT1NFRDogc3RyaW5nID0gXCJEYXRhYmFzZSBpcyBjbG9zZWRcIjtcblxuZXhwb3J0IGNsYXNzIEluZGV4ZWREYk1hbmFnZXIge1xuXG4gICAgcHJpdmF0ZSBkYkluc3RhbmNlPzogSURCUERhdGFiYXNlID0gdW5kZWZpbmVkO1xuXG4gICAgY29uc3RydWN0b3IoKSB7IH1cblxuICAgIHB1YmxpYyBvcGVuID0gYXN5bmMgKGRhdGFiYXNlOiBJRGF0YWJhc2UpOiBQcm9taXNlPHN0cmluZz4gPT4ge1xuICAgICAgICB2YXIgdXBncmFkZUVycm9yID0gXCJcIjtcblxuICAgICAgICB0cnkge1xuICAgICAgICAgICAgaWYgKCF0aGlzLmRiSW5zdGFuY2UgfHwgdGhpcy5kYkluc3RhbmNlLnZlcnNpb24gPCBkYXRhYmFzZS52ZXJzaW9uKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuZGJJbnN0YW5jZSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmRiSW5zdGFuY2UuY2xvc2UoKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kYkluc3RhbmNlID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aGlzLmRiSW5zdGFuY2UgPSBhd2FpdCBvcGVuREIoZGF0YWJhc2UubmFtZSwgZGF0YWJhc2UudmVyc2lvbiwge1xuICAgICAgICAgICAgICAgICAgICB1cGdyYWRlKGRiLCBvbGRWZXJzaW9uLCBuZXdWZXJzaW9uLCB0cmFuc2FjdGlvbikge1xuICAgICAgICAgICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBJbmRleGVkRGJNYW5hZ2VyLnVwZ3JhZGVEYXRhYmFzZShkYiwgb2xkVmVyc2lvbiwgbmV3VmVyc2lvbiwgZGF0YWJhc2UpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB1cGdyYWRlRXJyb3IgPSBlcnJvci50b1N0cmluZygpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRocm93KGVycm9yKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIGBJbmRleGVkREIgJHtkYXRhYmFzZS5uYW1lfSBvcGVuZWRgO1xuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgdGhyb3cgZXJyb3IudG9TdHJpbmcoKSsnICcrdXBncmFkZUVycm9yO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIGRlbGV0ZURhdGFiYXNlID0gYXN5bmMoZGJOYW1lOiBzdHJpbmcpOiBQcm9taXNlPHN0cmluZz4gPT4ge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgaWYgKCF0aGlzLmRiSW5zdGFuY2UpIHRocm93IEVfREJfQ0xPU0VEO1xuXG4gICAgICAgICAgICB0aGlzLmRiSW5zdGFuY2UuY2xvc2UoKTtcblxuICAgICAgICAgICAgYXdhaXQgZGVsZXRlREIoZGJOYW1lKTtcblxuICAgICAgICAgICAgdGhpcy5kYkluc3RhbmNlID0gdW5kZWZpbmVkO1xuXG4gICAgICAgICAgICByZXR1cm4gYFRoZSBkYXRhYmFzZSAke2RiTmFtZX0gaGFzIGJlZW4gZGVsZXRlZGA7XG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICB0aHJvdyBgRGF0YWJhc2UgJHtkYk5hbWV9LCAke2Vycm9yLnRvU3RyaW5nKCl9YDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBnZXREYlNjaGVtYSA9IGFzeW5jIChkYk5hbWU6IHN0cmluZykgOiBQcm9taXNlPElEYXRhYmFzZT4gPT4ge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgaWYgKCF0aGlzLmRiSW5zdGFuY2UpIHRocm93IEVfREJfQ0xPU0VEO1xuXG4gICAgICAgICAgICBjb25zdCBkYkluc3RhbmNlID0gdGhpcy5kYkluc3RhbmNlO1xuXG4gICAgICAgICAgICBjb25zdCBkYkluZm86IElEYXRhYmFzZSA9IHtcbiAgICAgICAgICAgICAgICBuYW1lOiBkYkluc3RhbmNlLm5hbWUsXG4gICAgICAgICAgICAgICAgdmVyc2lvbjogZGJJbnN0YW5jZS52ZXJzaW9uLFxuICAgICAgICAgICAgICAgIG9iamVjdFN0b3JlczogW11cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZm9yIChsZXQgcyA9IDA7IHMgPCBkYkluc3RhbmNlLm9iamVjdFN0b3JlTmFtZXMubGVuZ3RoOyBzKyspIHtcbiAgICAgICAgICAgICAgICBsZXQgZGJTdG9yZSA9IGRiSW5zdGFuY2UudHJhbnNhY3Rpb24oZGJJbnN0YW5jZS5vYmplY3RTdG9yZU5hbWVzW3NdLCAncmVhZG9ubHknKS5zdG9yZTtcbiAgICAgICAgICAgICAgICBsZXQgb2JqZWN0U3RvcmU6IElPYmplY3RTdG9yZSA9IHtcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogZGJTdG9yZS5uYW1lLFxuICAgICAgICAgICAgICAgICAgICBrZXlQYXRoOiBBcnJheS5pc0FycmF5KGRiU3RvcmUua2V5UGF0aCkgPyBkYlN0b3JlLmtleVBhdGguam9pbignLCcpIDogZGJTdG9yZS5rZXlQYXRoLFxuICAgICAgICAgICAgICAgICAgICBhdXRvSW5jcmVtZW50OiBkYlN0b3JlLmF1dG9JbmNyZW1lbnQsXG4gICAgICAgICAgICAgICAgICAgIGluZGV4ZXM6IFtdXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZGJTdG9yZS5pbmRleE5hbWVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGRiSW5kZXggPSBkYlN0b3JlLmluZGV4KGRiU3RvcmUuaW5kZXhOYW1lc1tpXSk7XG4gICAgICAgICAgICAgICAgICAgIGxldCBpbmRleDogSUluZGV4ID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogZGJJbmRleC5uYW1lLFxuICAgICAgICAgICAgICAgICAgICAgICAga2V5UGF0aDogQXJyYXkuaXNBcnJheShkYkluZGV4LmtleVBhdGgpID8gZGJJbmRleC5rZXlQYXRoLmpvaW4oJywnKSA6IGRiSW5kZXgua2V5UGF0aCxcbiAgICAgICAgICAgICAgICAgICAgICAgIG11bHRpRW50cnk6IGRiSW5kZXgubXVsdGlFbnRyeSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHVuaXF1ZTogZGJJbmRleC51bmlxdWVcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBvYmplY3RTdG9yZS5pbmRleGVzLnB1c2goaW5kZXgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBkYkluZm8ub2JqZWN0U3RvcmVzLnB1c2gob2JqZWN0U3RvcmUpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gZGJJbmZvO1xuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgdGhyb3cgYERhdGFiYXNlICR7ZGJOYW1lfSwgJHtlcnJvci50b1N0cmluZygpfWA7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBJREJPYmplY3RTdG9yZVxuICAgIHB1YmxpYyBjb3VudCA9IGFzeW5jIChzdG9yZU5hbWU6IHN0cmluZywga2V5PzogYW55KTogUHJvbWlzZTxudW1iZXI+ID0+IHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGlmICghdGhpcy5kYkluc3RhbmNlKSB0aHJvdyBFX0RCX0NMT1NFRDtcblxuICAgICAgICAgICAgY29uc3QgdHggPSB0aGlzLmRiSW5zdGFuY2UudHJhbnNhY3Rpb24oc3RvcmVOYW1lLCAncmVhZG9ubHknKTtcblxuICAgICAgICAgICAgbGV0IHJlc3VsdCA9IGF3YWl0IHR4LnN0b3JlLmNvdW50KGtleSA/PyB1bmRlZmluZWQpO1xuXG4gICAgICAgICAgICBhd2FpdCB0eC5kb25lO1xuXG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgdGhyb3cgYFN0b3JlICR7c3RvcmVOYW1lfSwgJHtlcnJvci50b1N0cmluZygpfWA7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgY291bnRCeUtleVJhbmdlID0gYXN5bmMgKHN0b3JlTmFtZTogc3RyaW5nLCBsb3dlcjogYW55LCB1cHBlcjogYW55LCBsb3dlck9wZW46IGJvb2xlYW4sIHVwcGVyT3BlbjogYm9vbGVhbik6IFByb21pc2U8bnVtYmVyPiA9PiB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICByZXR1cm4gYXdhaXQgdGhpcy5jb3VudChzdG9yZU5hbWUsIElEQktleVJhbmdlLmJvdW5kKGxvd2VyLCB1cHBlciwgbG93ZXJPcGVuLCB1cHBlck9wZW4pKTtcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgIHRocm93IGBTdG9yZSAke3N0b3JlTmFtZX0sICR7ZXJyb3IudG9TdHJpbmcoKX1gO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIGdldCA9IGFzeW5jIChzdG9yZU5hbWU6IHN0cmluZywga2V5OiBhbnkpOiBQcm9taXNlPGFueT4gPT4ge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgaWYgKCF0aGlzLmRiSW5zdGFuY2UpIHRocm93IEVfREJfQ0xPU0VEO1xuXG4gICAgICAgICAgICBjb25zdCB0eCA9IHRoaXMuZGJJbnN0YW5jZS50cmFuc2FjdGlvbihzdG9yZU5hbWUsICdyZWFkb25seScpO1xuXG4gICAgICAgICAgICBsZXQgcmVzdWx0ID0gYXdhaXQgdHguc3RvcmUuZ2V0KGtleSk7XG5cbiAgICAgICAgICAgIGF3YWl0IHR4LmRvbmU7XG5cbiAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICB0aHJvdyBgU3RvcmUgJHtzdG9yZU5hbWV9LCAke2Vycm9yLnRvU3RyaW5nKCl9YDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBnZXRBbGwgPSBhc3luYyAoc3RvcmVOYW1lOiBzdHJpbmcsIGtleT86IGFueSwgY291bnQ/OiBudW1iZXIpOiBQcm9taXNlPGFueT4gPT4ge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgaWYgKCF0aGlzLmRiSW5zdGFuY2UpIHRocm93IEVfREJfQ0xPU0VEO1xuXG4gICAgICAgICAgICBjb25zdCB0eCA9IHRoaXMuZGJJbnN0YW5jZS50cmFuc2FjdGlvbihzdG9yZU5hbWUsICdyZWFkb25seScpO1xuXG4gICAgICAgICAgICBsZXQgcmVzdWx0cyA9IGF3YWl0IHR4LnN0b3JlLmdldEFsbChrZXkgPz8gdW5kZWZpbmVkLCBjb3VudCA/PyB1bmRlZmluZWQpO1xuXG4gICAgICAgICAgICBhd2FpdCB0eC5kb25lO1xuXG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0cztcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgIHRocm93IGBTdG9yZSAke3N0b3JlTmFtZX0sICR7ZXJyb3IudG9TdHJpbmcoKX1gO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIGdldEFsbEJ5S2V5UmFuZ2UgPSBhc3luYyAoc3RvcmVOYW1lOiBzdHJpbmcsIGxvd2VyOiBhbnksIHVwcGVyOiBhbnksIGxvd2VyT3BlbjogYm9vbGVhbiwgdXBwZXJPcGVuOiBib29sZWFuLCBjb3VudD86IG51bWJlcik6IFByb21pc2U8YW55PiA9PiB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBpZiAoIXRoaXMuZGJJbnN0YW5jZSkgdGhyb3cgRV9EQl9DTE9TRUQ7XG5cbiAgICAgICAgICAgIHJldHVybiBhd2FpdCB0aGlzLmdldEFsbChzdG9yZU5hbWUsIElEQktleVJhbmdlLmJvdW5kKGxvd2VyLCB1cHBlciwgbG93ZXJPcGVuLCB1cHBlck9wZW4pLCBjb3VudCk7XG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICB0aHJvdyBgU3RvcmUgJHtzdG9yZU5hbWV9LCAke2Vycm9yLnRvU3RyaW5nKCl9YDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBnZXRBbGxCeUFycmF5S2V5ID0gYXN5bmMgKHN0b3JlTmFtZTogc3RyaW5nLCBrZXk6IGFueVtdKTogUHJvbWlzZTxhbnk+ID0+IHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGlmICghdGhpcy5kYkluc3RhbmNlKSB0aHJvdyBFX0RCX0NMT1NFRDtcblxuICAgICAgICAgICAgY29uc3QgdHggPSB0aGlzLmRiSW5zdGFuY2UudHJhbnNhY3Rpb24oc3RvcmVOYW1lLCAncmVhZG9ubHknKTtcblxuICAgICAgICAgICAgbGV0IHJlc3VsdHM6IGFueVtdID0gW107XG5cbiAgICAgICAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBrZXkubGVuZ3RoOyBpbmRleCsrKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgZWxlbWVudCA9IGtleVtpbmRleF07XG4gICAgICAgICAgICAgICAgcmVzdWx0cyA9IHJlc3VsdHMuY29uY2F0KGF3YWl0IHR4LnN0b3JlLmdldEFsbChlbGVtZW50KSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGF3YWl0IHR4LmRvbmU7XG5cbiAgICAgICAgICAgIHJldHVybiByZXN1bHRzO1xuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgdGhyb3cgYFN0b3JlICR7c3RvcmVOYW1lfSwgJHtlcnJvci50b1N0cmluZygpfWA7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0S2V5ID0gYXN5bmMgKHN0b3JlTmFtZTogc3RyaW5nLCBrZXk6IGFueSk6IFByb21pc2U8YW55PiA9PiB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBpZiAoIXRoaXMuZGJJbnN0YW5jZSkgdGhyb3cgRV9EQl9DTE9TRUQ7XG5cbiAgICAgICAgICAgIGNvbnN0IHR4ID0gdGhpcy5kYkluc3RhbmNlLnRyYW5zYWN0aW9uKHN0b3JlTmFtZSwgJ3JlYWRvbmx5Jyk7XG5cbiAgICAgICAgICAgIGxldCByZXN1bHQgPSBhd2FpdCB0eC5zdG9yZS5nZXRLZXkoa2V5KTtcblxuICAgICAgICAgICAgYXdhaXQgdHguZG9uZTtcblxuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgIHRocm93IGBTdG9yZSAke3N0b3JlTmFtZX0sICR7ZXJyb3IudG9TdHJpbmcoKX1gO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIGdldEFsbEtleXMgPSBhc3luYyAoc3RvcmVOYW1lOiBzdHJpbmcsIGtleT86IGFueSwgY291bnQ/OiBudW1iZXIpOiBQcm9taXNlPGFueT4gPT4ge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgaWYgKCF0aGlzLmRiSW5zdGFuY2UpIHRocm93IEVfREJfQ0xPU0VEO1xuXG4gICAgICAgICAgICBjb25zdCB0eCA9IHRoaXMuZGJJbnN0YW5jZS50cmFuc2FjdGlvbihzdG9yZU5hbWUsICdyZWFkb25seScpO1xuXG4gICAgICAgICAgICBsZXQgcmVzdWx0cyA9IGF3YWl0IHR4LnN0b3JlLmdldEFsbEtleXMoa2V5ID8/IHVuZGVmaW5lZCwgY291bnQgPz8gdW5kZWZpbmVkKTtcblxuICAgICAgICAgICAgYXdhaXQgdHguZG9uZTtcblxuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdHM7XG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICB0aHJvdyBgU3RvcmUgJHtzdG9yZU5hbWV9LCAke2Vycm9yLnRvU3RyaW5nKCl9YDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBnZXRBbGxLZXlzQnlLZXlSYW5nZSA9IGFzeW5jIChzdG9yZU5hbWU6IHN0cmluZywgbG93ZXI6IGFueSwgdXBwZXI6IGFueSwgbG93ZXJPcGVuOiBib29sZWFuLCB1cHBlck9wZW46IGJvb2xlYW4sIGNvdW50PzogbnVtYmVyKTogUHJvbWlzZTxhbnk+ID0+IHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGlmICghdGhpcy5kYkluc3RhbmNlKSB0aHJvdyBFX0RCX0NMT1NFRDtcblxuICAgICAgICAgICAgcmV0dXJuIGF3YWl0IHRoaXMuZ2V0QWxsS2V5cyhzdG9yZU5hbWUsIElEQktleVJhbmdlLmJvdW5kKGxvd2VyLCB1cHBlciwgbG93ZXJPcGVuLCB1cHBlck9wZW4pLCBjb3VudCk7XG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICB0aHJvdyBgU3RvcmUgJHtzdG9yZU5hbWV9LCAke2Vycm9yLnRvU3RyaW5nKCl9YDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBnZXRBbGxLZXlzQnlBcnJheUtleSA9IGFzeW5jIChzdG9yZU5hbWU6IHN0cmluZywga2V5OiBhbnlbXSk6IFByb21pc2U8YW55PiA9PiB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBpZiAoIXRoaXMuZGJJbnN0YW5jZSkgdGhyb3cgRV9EQl9DTE9TRUQ7XG5cbiAgICAgICAgICAgIGNvbnN0IHR4ID0gdGhpcy5kYkluc3RhbmNlLnRyYW5zYWN0aW9uKHN0b3JlTmFtZSwgJ3JlYWRvbmx5Jyk7XG5cbiAgICAgICAgICAgIGxldCByZXN1bHRzOiBhbnlbXSA9IFtdO1xuXG4gICAgICAgICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwga2V5Lmxlbmd0aDsgaW5kZXgrKykge1xuICAgICAgICAgICAgICAgIGNvbnN0IGVsZW1lbnQgPSBrZXlbaW5kZXhdO1xuICAgICAgICAgICAgICAgIHJlc3VsdHMgPSByZXN1bHRzLmNvbmNhdChhd2FpdCB0eC5zdG9yZS5nZXRBbGxLZXlzKGVsZW1lbnQpKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgYXdhaXQgdHguZG9uZTtcblxuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdHM7XG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICB0aHJvdyBgU3RvcmUgJHtzdG9yZU5hbWV9LCAke2Vycm9yLnRvU3RyaW5nKCl9YDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBxdWVyeSA9IGFzeW5jIChzdG9yZU5hbWU6IHN0cmluZywga2V5OiBhbnksIGZpbHRlcjogc3RyaW5nLCBjb3VudDogbnVtYmVyID0gMCwgc2tpcDogbnVtYmVyID0gMCk6IFByb21pc2U8YW55PiA9PiB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBpZiAoIXRoaXMuZGJJbnN0YW5jZSkgdGhyb3cgRV9EQl9DTE9TRUQ7XG5cbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgdmFyIGZ1bmMgPSBuZXcgRnVuY3Rpb24oJ29iaicsIGZpbHRlcik7XG4gICAgICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgICAgIHRocm93IGAke2Vycm9yLnRvU3RyaW5nKCl9IGluIGZpbHRlciB7ICR7ZmlsdGVyfSB9YFxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB2YXIgcm93ID0gMDtcbiAgICAgICAgICAgIHZhciBlcnJvck1lc3NhZ2UgPSBcIlwiO1xuXG4gICAgICAgICAgICBsZXQgcmVzdWx0czogYW55W10gPSBbXTtcblxuICAgICAgICAgICAgY29uc3QgdHggPSB0aGlzLmRiSW5zdGFuY2UudHJhbnNhY3Rpb24oc3RvcmVOYW1lLCAncmVhZG9ubHknKTtcblxuICAgICAgICAgICAgbGV0IGN1cnNvciA9IGF3YWl0IHR4LnN0b3JlLm9wZW5DdXJzb3Ioa2V5ID8/IHVuZGVmaW5lZCk7XG4gICAgICAgICAgICB3aGlsZSAoY3Vyc29yKSB7XG4gICAgICAgICAgICAgICAgaWYgKCFjdXJzb3IpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgb3V0ID0gZnVuYyhjdXJzb3IudmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICBpZiAob3V0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByb3cgKys7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocm93ID4gc2tpcCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdHMucHVzaChvdXQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgICAgICAgICBlcnJvck1lc3NhZ2UgPSBgb2JqOiAke0pTT04uc3RyaW5naWZ5KGN1cnNvci52YWx1ZSl9XFxuZmlsdGVyOiAke2ZpbHRlcn1cXG5lcnJvcjogJHtlcnJvci50b1N0cmluZygpfWA7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKGNvdW50ID4gMCAmJiByZXN1bHRzLmxlbmd0aCA+PSBjb3VudCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGN1cnNvciA9IGF3YWl0IGN1cnNvci5jb250aW51ZSgpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBhd2FpdCB0eC5kb25lO1xuXG4gICAgICAgICAgICBpZiAoZXJyb3JNZXNzYWdlKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgZXJyb3JNZXNzYWdlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0cztcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgIHRocm93IGBTdG9yZSAke3N0b3JlTmFtZX0gJHtlcnJvci50b1N0cmluZygpfWA7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBJREJJbmRleCBmdW5jdGlvbnNcbiAgICBwdWJsaWMgY291bnRGcm9tSW5kZXggPSBhc3luYyAoc3RvcmVOYW1lOiBzdHJpbmcsIGluZGV4TmFtZTogc3RyaW5nLCBrZXk/OiBhbnkpOiBQcm9taXNlPG51bWJlcj4gPT4ge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgaWYgKCF0aGlzLmRiSW5zdGFuY2UpIHRocm93IEVfREJfQ0xPU0VEO1xuXG4gICAgICAgICAgICBjb25zdCB0eCA9IHRoaXMuZGJJbnN0YW5jZS50cmFuc2FjdGlvbihzdG9yZU5hbWUsICdyZWFkb25seScpO1xuXG4gICAgICAgICAgICBsZXQgcmVzdWx0ID0gYXdhaXQgdHguc3RvcmUuaW5kZXgoaW5kZXhOYW1lKS5jb3VudChrZXkgPz8gdW5kZWZpbmVkKTtcblxuICAgICAgICAgICAgYXdhaXQgdHguZG9uZTtcblxuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgIHRocm93IGBTdG9yZSAke3N0b3JlTmFtZX0sIEluZGV4ICR7aW5kZXhOYW1lfSwgJHtlcnJvci50b1N0cmluZygpfWA7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgY291bnRGcm9tSW5kZXhCeUtleVJhbmdlID0gYXN5bmMgKHN0b3JlTmFtZTogc3RyaW5nLCBpbmRleE5hbWU6IHN0cmluZywgbG93ZXI6IGFueSwgdXBwZXI6IGFueSwgbG93ZXJPcGVuOiBib29sZWFuLCB1cHBlck9wZW46IGJvb2xlYW4pOiBQcm9taXNlPG51bWJlcj4gPT4ge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgcmV0dXJuIGF3YWl0IHRoaXMuY291bnRGcm9tSW5kZXgoc3RvcmVOYW1lLCBpbmRleE5hbWUsIElEQktleVJhbmdlLmJvdW5kKGxvd2VyLCB1cHBlciwgbG93ZXJPcGVuLCB1cHBlck9wZW4pKTtcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgIHRocm93IGBTdG9yZSAke3N0b3JlTmFtZX0sIEluZGV4ICR7aW5kZXhOYW1lfSwgJHtlcnJvci50b1N0cmluZygpfWA7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0RnJvbUluZGV4ID0gYXN5bmMgKHN0b3JlTmFtZTogc3RyaW5nLCBpbmRleE5hbWU6IHN0cmluZywga2V5OiBhbnkpOiBQcm9taXNlPGFueT4gPT4ge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgaWYgKCF0aGlzLmRiSW5zdGFuY2UpIHRocm93IEVfREJfQ0xPU0VEO1xuXG4gICAgICAgICAgICBjb25zdCB0eCA9IHRoaXMuZGJJbnN0YW5jZS50cmFuc2FjdGlvbihzdG9yZU5hbWUsICdyZWFkb25seScpO1xuXG4gICAgICAgICAgICBjb25zdCByZXN1bHRzID0gYXdhaXQgdHguc3RvcmUuaW5kZXgoaW5kZXhOYW1lKS5nZXQoa2V5KTtcblxuICAgICAgICAgICAgYXdhaXQgdHguZG9uZTtcblxuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdHM7XG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICB0aHJvdyBgU3RvcmUgJHtzdG9yZU5hbWV9LCBJbmRleCAke2luZGV4TmFtZX0sICR7ZXJyb3IudG9TdHJpbmcoKX1gO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIGdldEFsbEZyb21JbmRleCA9IGFzeW5jIChzdG9yZU5hbWU6IHN0cmluZywgaW5kZXhOYW1lOiBzdHJpbmcsIGtleT86IGFueSwgY291bnQ/OiBudW1iZXIpOiBQcm9taXNlPGFueT4gPT4ge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgaWYgKCF0aGlzLmRiSW5zdGFuY2UpIHRocm93IEVfREJfQ0xPU0VEO1xuXG4gICAgICAgICAgICBjb25zdCB0eCA9IHRoaXMuZGJJbnN0YW5jZS50cmFuc2FjdGlvbihzdG9yZU5hbWUsICdyZWFkb25seScpO1xuXG4gICAgICAgICAgICBjb25zdCByZXN1bHRzID0gYXdhaXQgdHguc3RvcmUuaW5kZXgoaW5kZXhOYW1lKS5nZXRBbGwoa2V5ID8/IHVuZGVmaW5lZCwgY291bnQgPz8gdW5kZWZpbmVkKTtcblxuICAgICAgICAgICAgYXdhaXQgdHguZG9uZTtcblxuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdHM7XG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICB0aHJvdyBgU3RvcmUgJHtzdG9yZU5hbWV9LCBJbmRleCAke2luZGV4TmFtZX0sICR7ZXJyb3IudG9TdHJpbmcoKX1gO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIGdldEFsbEZyb21JbmRleEJ5S2V5UmFuZ2UgPSBhc3luYyAoc3RvcmVOYW1lOiBzdHJpbmcsIGluZGV4TmFtZTogc3RyaW5nLCBsb3dlcjogYW55LCB1cHBlcjogYW55LCBsb3dlck9wZW46IGJvb2xlYW4sIHVwcGVyT3BlbjogYm9vbGVhbiwgY291bnQ/OiBudW1iZXIpOiBQcm9taXNlPGFueT4gPT4ge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgaWYgKCF0aGlzLmRiSW5zdGFuY2UpIHRocm93IEVfREJfQ0xPU0VEO1xuXG4gICAgICAgICAgICByZXR1cm4gYXdhaXQgdGhpcy5nZXRBbGxGcm9tSW5kZXgoc3RvcmVOYW1lLCBpbmRleE5hbWUsIElEQktleVJhbmdlLmJvdW5kKGxvd2VyLCB1cHBlciwgbG93ZXJPcGVuLCB1cHBlck9wZW4pLCBjb3VudCk7XG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICB0aHJvdyBgU3RvcmUgJHtzdG9yZU5hbWV9LCBJbmRleCAke2luZGV4TmFtZX0sICR7ZXJyb3IudG9TdHJpbmcoKX1gO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIGdldEFsbEZyb21JbmRleEJ5QXJyYXlLZXkgPSBhc3luYyAoc3RvcmVOYW1lOiBzdHJpbmcsIGluZGV4TmFtZTogc3RyaW5nLCBrZXk6IGFueVtdKTogUHJvbWlzZTxhbnk+ID0+IHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGlmICghdGhpcy5kYkluc3RhbmNlKSB0aHJvdyBFX0RCX0NMT1NFRDtcblxuICAgICAgICAgICAgY29uc3QgdHggPSB0aGlzLmRiSW5zdGFuY2UudHJhbnNhY3Rpb24oc3RvcmVOYW1lLCAncmVhZG9ubHknKTtcbiAgICAgICAgICAgIGNvbnN0IGR4ID0gdHguc3RvcmUuaW5kZXgoaW5kZXhOYW1lKTtcblxuICAgICAgICAgICAgbGV0IHJlc3VsdHM6IGFueVtdID0gW107XG5cbiAgICAgICAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBrZXkubGVuZ3RoOyBpbmRleCsrKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgZWxlbWVudCA9IGtleVtpbmRleF07XG4gICAgICAgICAgICAgICAgcmVzdWx0cyA9IHJlc3VsdHMuY29uY2F0KGF3YWl0IGR4LmdldEFsbChlbGVtZW50KSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGF3YWl0IHR4LmRvbmU7XG5cbiAgICAgICAgICAgIHJldHVybiByZXN1bHRzO1xuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgdGhyb3cgYFN0b3JlICR7c3RvcmVOYW1lfSwgSW5kZXggJHtpbmRleE5hbWV9LCAke2Vycm9yLnRvU3RyaW5nKCl9YDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBnZXRLZXlGcm9tSW5kZXggPSBhc3luYyAoc3RvcmVOYW1lOiBzdHJpbmcsIGluZGV4TmFtZTogc3RyaW5nLCBrZXk6IGFueSk6IFByb21pc2U8YW55PiA9PiB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBpZiAoIXRoaXMuZGJJbnN0YW5jZSkgdGhyb3cgRV9EQl9DTE9TRUQ7XG5cbiAgICAgICAgICAgIGNvbnN0IHR4ID0gdGhpcy5kYkluc3RhbmNlLnRyYW5zYWN0aW9uKHN0b3JlTmFtZSwgJ3JlYWRvbmx5Jyk7XG5cbiAgICAgICAgICAgIGNvbnN0IHJlc3VsdHMgPSBhd2FpdCB0eC5zdG9yZS5pbmRleChpbmRleE5hbWUpLmdldEtleShrZXkpO1xuXG4gICAgICAgICAgICBhd2FpdCB0eC5kb25lO1xuXG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0cztcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgIHRocm93IGBTdG9yZSAke3N0b3JlTmFtZX0sIEluZGV4ICR7aW5kZXhOYW1lfSwgJHtlcnJvci50b1N0cmluZygpfWA7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0QWxsS2V5c0Zyb21JbmRleCA9IGFzeW5jIChzdG9yZU5hbWU6IHN0cmluZywgaW5kZXhOYW1lOiBzdHJpbmcsIGtleT86IGFueSwgY291bnQ/OiBudW1iZXIpOiBQcm9taXNlPGFueT4gPT4ge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgaWYgKCF0aGlzLmRiSW5zdGFuY2UpIHRocm93IEVfREJfQ0xPU0VEO1xuXG4gICAgICAgICAgICBjb25zdCB0eCA9IHRoaXMuZGJJbnN0YW5jZS50cmFuc2FjdGlvbihzdG9yZU5hbWUsICdyZWFkb25seScpO1xuXG4gICAgICAgICAgICBjb25zdCByZXN1bHRzID0gYXdhaXQgdHguc3RvcmUuaW5kZXgoaW5kZXhOYW1lKS5nZXRBbGxLZXlzKGtleSA/PyB1bmRlZmluZWQsIGNvdW50ID8/IHVuZGVmaW5lZCk7XG5cbiAgICAgICAgICAgIGF3YWl0IHR4LmRvbmU7XG5cbiAgICAgICAgICAgIHJldHVybiByZXN1bHRzO1xuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgdGhyb3cgYFN0b3JlICR7c3RvcmVOYW1lfSwgSW5kZXggJHtpbmRleE5hbWV9LCAke2Vycm9yLnRvU3RyaW5nKCl9YDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBnZXRBbGxLZXlzRnJvbUluZGV4QnlLZXlSYW5nZSA9IGFzeW5jIChzdG9yZU5hbWU6IHN0cmluZywgaW5kZXhOYW1lOiBzdHJpbmcsIGxvd2VyOiBhbnksIHVwcGVyOiBhbnksIGxvd2VyT3BlbjogYm9vbGVhbiwgdXBwZXJPcGVuOiBib29sZWFuLCBjb3VudD86IG51bWJlcik6IFByb21pc2U8YW55PiA9PiB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBpZiAoIXRoaXMuZGJJbnN0YW5jZSkgdGhyb3cgRV9EQl9DTE9TRUQ7XG5cbiAgICAgICAgICAgIHJldHVybiBhd2FpdCB0aGlzLmdldEFsbEtleXNGcm9tSW5kZXgoc3RvcmVOYW1lLCBpbmRleE5hbWUsIElEQktleVJhbmdlLmJvdW5kKGxvd2VyLCB1cHBlciwgbG93ZXJPcGVuLCB1cHBlck9wZW4pLCBjb3VudCk7XG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICB0aHJvdyBgU3RvcmUgJHtzdG9yZU5hbWV9LCBJbmRleCAke2luZGV4TmFtZX0sICR7ZXJyb3IudG9TdHJpbmcoKX1gO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIGdldEFsbEtleXNGcm9tSW5kZXhCeUFycmF5S2V5ID0gYXN5bmMgKHN0b3JlTmFtZTogc3RyaW5nLCBpbmRleE5hbWU6IHN0cmluZywga2V5OiBhbnlbXSk6IFByb21pc2U8YW55PiA9PiB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBpZiAoIXRoaXMuZGJJbnN0YW5jZSkgdGhyb3cgRV9EQl9DTE9TRUQ7XG5cbiAgICAgICAgICAgIGNvbnN0IHR4ID0gdGhpcy5kYkluc3RhbmNlLnRyYW5zYWN0aW9uKHN0b3JlTmFtZSwgJ3JlYWRvbmx5Jyk7XG4gICAgICAgICAgICBjb25zdCBkeCA9IHR4LnN0b3JlLmluZGV4KGluZGV4TmFtZSk7XG5cbiAgICAgICAgICAgIGxldCByZXN1bHRzOiBhbnlbXSA9IFtdO1xuXG4gICAgICAgICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwga2V5Lmxlbmd0aDsgaW5kZXgrKykge1xuICAgICAgICAgICAgICAgIGNvbnN0IGVsZW1lbnQgPSBrZXlbaW5kZXhdO1xuICAgICAgICAgICAgICAgIHJlc3VsdHMgPSByZXN1bHRzLmNvbmNhdChhd2FpdCBkeC5nZXRBbGxLZXlzKGVsZW1lbnQpKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgYXdhaXQgdHguZG9uZTtcblxuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdHM7XG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICB0aHJvdyBgU3RvcmUgJHtzdG9yZU5hbWV9LCBJbmRleCAke2luZGV4TmFtZX0sICR7ZXJyb3IudG9TdHJpbmcoKX1gO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIHF1ZXJ5RnJvbUluZGV4ID0gYXN5bmMgKHN0b3JlTmFtZTogc3RyaW5nLCBpbmRleE5hbWU6IHN0cmluZywga2V5OiBhbnksIGZpbHRlcjogc3RyaW5nLCBjb3VudDogbnVtYmVyID0gMCwgc2tpcDogbnVtYmVyID0gMCk6IFByb21pc2U8YW55PiA9PiB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBpZiAoIXRoaXMuZGJJbnN0YW5jZSkgdGhyb3cgRV9EQl9DTE9TRUQ7XG5cbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgdmFyIGZ1bmMgPSBuZXcgRnVuY3Rpb24oJ29iaicsIGZpbHRlcik7XG4gICAgICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgICAgIHRocm93IGAke2Vycm9yLnRvU3RyaW5nKCl9IGluIGZpbHRlciB7ICR7ZmlsdGVyfSB9YFxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB2YXIgcm93ID0gMDtcbiAgICAgICAgICAgIHZhciBlcnJvck1lc3NhZ2UgPSBcIlwiO1xuXG4gICAgICAgICAgICBsZXQgcmVzdWx0czogYW55W10gPSBbXTtcblxuICAgICAgICAgICAgY29uc3QgdHggPSB0aGlzLmRiSW5zdGFuY2UudHJhbnNhY3Rpb24oc3RvcmVOYW1lLCAncmVhZG9ubHknKTtcblxuICAgICAgICAgICAgbGV0IGN1cnNvciA9IGF3YWl0IHR4LnN0b3JlLmluZGV4KGluZGV4TmFtZSkub3BlbkN1cnNvcihrZXkgPz8gdW5kZWZpbmVkKTtcbiAgICAgICAgICAgIHdoaWxlIChjdXJzb3IpIHtcbiAgICAgICAgICAgICAgICBpZiAoIWN1cnNvcikge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBvdXQgPSBmdW5jKGN1cnNvci52YWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChvdXQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJvdyArKztcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyb3cgPiBza2lwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0cy5wdXNoKG91dCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgICAgIGVycm9yTWVzc2FnZSA9IGBvYmo6ICR7SlNPTi5zdHJpbmdpZnkoY3Vyc29yLnZhbHVlKX1cXG5maWx0ZXI6ICR7ZmlsdGVyfVxcbmVycm9yOiAke2Vycm9yLnRvU3RyaW5nKCl9YDtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoY291bnQgPiAwICYmIHJlc3VsdHMubGVuZ3RoID49IGNvdW50KSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY3Vyc29yID0gYXdhaXQgY3Vyc29yLmNvbnRpbnVlKCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGF3YWl0IHR4LmRvbmU7XG5cbiAgICAgICAgICAgIGlmIChlcnJvck1lc3NhZ2UpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBlcnJvck1lc3NhZ2U7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiByZXN1bHRzO1xuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgdGhyb3cgYFN0b3JlICR7c3RvcmVOYW1lfSwgSW5kZXggJHtpbmRleE5hbWV9LCAke2Vycm9yLnRvU3RyaW5nKCl9YDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBhZGQgPSBhc3luYyAoc3RvcmVOYW1lOiBzdHJpbmcsIGRhdGE6IGFueSwga2V5PzogYW55KTogUHJvbWlzZTxzdHJpbmc+ID0+IHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGlmICghdGhpcy5kYkluc3RhbmNlKSB0aHJvdyBFX0RCX0NMT1NFRDtcblxuICAgICAgICAgICAgY29uc3QgdHggPSB0aGlzLmRiSW5zdGFuY2UudHJhbnNhY3Rpb24oc3RvcmVOYW1lLCAncmVhZHdyaXRlJyk7XG5cbiAgICAgICAgICAgIGRhdGEgPSB0aGlzLmNoZWNrRm9yS2V5UGF0aCh0eC5zdG9yZSwgZGF0YSk7XG5cbiAgICAgICAgICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IHR4LnN0b3JlLmFkZChkYXRhLCBrZXkgPz8gdW5kZWZpbmVkKTtcblxuICAgICAgICAgICAgYXdhaXQgdHguZG9uZTtcblxuICAgICAgICAgICAgcmV0dXJuIGBBZGRlZCBuZXcgcmVjb3JkIHdpdGggaWQgJHtyZXN1bHR9YDtcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgIHRocm93IGBTdG9yZSAke3N0b3JlTmFtZX0sICR7ZXJyb3IudG9TdHJpbmcoKX1gO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIHB1dCA9IGFzeW5jIChzdG9yZU5hbWU6IHN0cmluZywgZGF0YTogYW55LCBrZXk/OiBhbnkpOiBQcm9taXNlPHN0cmluZz4gPT4ge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgaWYgKCF0aGlzLmRiSW5zdGFuY2UpIHRocm93IEVfREJfQ0xPU0VEO1xuXG4gICAgICAgICAgICBjb25zdCB0eCA9IHRoaXMuZGJJbnN0YW5jZS50cmFuc2FjdGlvbihzdG9yZU5hbWUsICdyZWFkd3JpdGUnKTtcblxuICAgICAgICAgICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgdHguc3RvcmUucHV0KGRhdGEsIGtleSA/PyB1bmRlZmluZWQpO1xuXG4gICAgICAgICAgICBhd2FpdCB0eC5kb25lO1xuXG4gICAgICAgICAgICByZXR1cm4gYHVwZGF0ZWQgcmVjb3JkIHdpdGggaWQgJHtyZXN1bHR9YDtcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgIHRocm93IGBTdG9yZSAke3N0b3JlTmFtZX0sICR7ZXJyb3IudG9TdHJpbmcoKX1gO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIGRlbGV0ZSA9IGFzeW5jIChzdG9yZU5hbWU6IHN0cmluZywgaWQ6IGFueSk6IFByb21pc2U8c3RyaW5nPiA9PiB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBpZiAoIXRoaXMuZGJJbnN0YW5jZSkgdGhyb3cgRV9EQl9DTE9TRUQ7XG5cbiAgICAgICAgICAgIGNvbnN0IHR4ID0gdGhpcy5kYkluc3RhbmNlLnRyYW5zYWN0aW9uKHN0b3JlTmFtZSwgJ3JlYWR3cml0ZScpO1xuXG4gICAgICAgICAgICBhd2FpdCB0eC5zdG9yZS5kZWxldGUoaWQpO1xuXG4gICAgICAgICAgICBhd2FpdCB0eC5kb25lO1xuXG4gICAgICAgICAgICByZXR1cm4gYFJlY29yZCB3aXRoIGlkOiAke2lkfSBkZWxldGVkYDtcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgIHRocm93IGBTdG9yZSAke3N0b3JlTmFtZX0sICR7ZXJyb3IudG9TdHJpbmcoKX1gO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIGJhdGNoQWRkID0gYXN5bmMgKHN0b3JlTmFtZTogc3RyaW5nLCBkYXRhOiBhbnlbXSk6IFByb21pc2U8c3RyaW5nPiA9PiB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBpZiAoIXRoaXMuZGJJbnN0YW5jZSkgdGhyb3cgRV9EQl9DTE9TRUQ7XG5cbiAgICAgICAgICAgIGNvbnN0IHR4ID0gdGhpcy5kYkluc3RhbmNlLnRyYW5zYWN0aW9uKHN0b3JlTmFtZSwgJ3JlYWR3cml0ZScpO1xuXG4gICAgICAgICAgICBkYXRhLmZvckVhY2goYXN5bmMgZWxlbWVudCA9PiB7XG4gICAgICAgICAgICAgICAgbGV0IGl0ZW0gPSB0aGlzLmNoZWNrRm9yS2V5UGF0aCh0eC5zdG9yZSwgZWxlbWVudCk7XG4gICAgICAgICAgICAgICAgYXdhaXQgdHguc3RvcmUuYWRkKGl0ZW0pO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGF3YWl0IHR4LmRvbmU7XG5cbiAgICAgICAgICAgIHJldHVybiBgQWRkZWQgJHtkYXRhLmxlbmd0aH0gcmVjb3Jkc2A7XG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICB0aHJvdyBgU3RvcmUgJHtzdG9yZU5hbWV9LCAke2Vycm9yLnRvU3RyaW5nKCl9YDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBiYXRjaFB1dCA9IGFzeW5jIChzdG9yZU5hbWU6IHN0cmluZywgZGF0YTogYW55W10pOiBQcm9taXNlPHN0cmluZz4gPT4ge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgaWYgKCF0aGlzLmRiSW5zdGFuY2UpIHRocm93IEVfREJfQ0xPU0VEO1xuXG4gICAgICAgICAgICBjb25zdCB0eCA9IHRoaXMuZGJJbnN0YW5jZS50cmFuc2FjdGlvbihzdG9yZU5hbWUsICdyZWFkd3JpdGUnKTtcblxuICAgICAgICAgICAgZGF0YS5mb3JFYWNoKGFzeW5jIGVsZW1lbnQgPT4ge1xuICAgICAgICAgICAgICAgIGF3YWl0IHR4LnN0b3JlLnB1dChlbGVtZW50KTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBhd2FpdCB0eC5kb25lO1xuXG4gICAgICAgICAgICByZXR1cm4gYHVwZGF0ZWQgJHtkYXRhLmxlbmd0aH0gcmVjb3Jkc2A7XG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICB0aHJvdyBgU3RvcmUgJHtzdG9yZU5hbWV9LCAke2Vycm9yLnRvU3RyaW5nKCl9YDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBiYXRjaERlbGV0ZSA9IGFzeW5jIChzdG9yZU5hbWU6IHN0cmluZywgaWRzOiBhbnlbXSk6IFByb21pc2U8c3RyaW5nPiA9PiB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBpZiAoIXRoaXMuZGJJbnN0YW5jZSkgdGhyb3cgRV9EQl9DTE9TRUQ7XG5cbiAgICAgICAgICAgIGNvbnN0IHR4ID0gdGhpcy5kYkluc3RhbmNlLnRyYW5zYWN0aW9uKHN0b3JlTmFtZSwgJ3JlYWR3cml0ZScpO1xuXG4gICAgICAgICAgICBpZHMuZm9yRWFjaChhc3luYyBlbGVtZW50ID0+IHtcbiAgICAgICAgICAgICAgICBhd2FpdCB0eC5zdG9yZS5kZWxldGUoZWxlbWVudCk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgYXdhaXQgdHguZG9uZTtcblxuICAgICAgICAgICAgcmV0dXJuIGBEZWxldGVkICR7aWRzLmxlbmd0aH0gcmVjb3Jkc2A7XG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICB0aHJvdyBgU3RvcmUgJHtzdG9yZU5hbWV9LCAke2Vycm9yLnRvU3RyaW5nKCl9YDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBjbGVhclN0b3JlID0gYXN5bmMgKHN0b3JlTmFtZTogc3RyaW5nKTogUHJvbWlzZTxzdHJpbmc+ID0+IHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGlmICghdGhpcy5kYkluc3RhbmNlKSB0aHJvdyBFX0RCX0NMT1NFRDtcblxuICAgICAgICAgICAgY29uc3QgdHggPSB0aGlzLmRiSW5zdGFuY2UudHJhbnNhY3Rpb24oc3RvcmVOYW1lLCAncmVhZHdyaXRlJyk7XG5cbiAgICAgICAgICAgIGF3YWl0IHR4LnN0b3JlLmNsZWFyKCk7XG5cbiAgICAgICAgICAgIGF3YWl0IHR4LmRvbmU7XG5cbiAgICAgICAgICAgIHJldHVybiBgU3RvcmUgJHtzdG9yZU5hbWV9IGNsZWFyZWRgO1xuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgdGhyb3cgYFN0b3JlICR7c3RvcmVOYW1lfSwgJHtlcnJvci50b1N0cmluZygpfWA7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIGNoZWNrRm9yS2V5UGF0aChvYmplY3RTdG9yZTogSURCUE9iamVjdFN0b3JlPGFueSwgYW55PiwgZGF0YTogYW55KSB7XG4gICAgICAgIGlmICghb2JqZWN0U3RvcmUuYXV0b0luY3JlbWVudCB8fCAhb2JqZWN0U3RvcmUua2V5UGF0aCkge1xuICAgICAgICAgICAgcmV0dXJuIGRhdGE7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodHlwZW9mIG9iamVjdFN0b3JlLmtleVBhdGggIT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICByZXR1cm4gZGF0YTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGtleVBhdGggPSBvYmplY3RTdG9yZS5rZXlQYXRoIGFzIHN0cmluZztcblxuICAgICAgICBpZiAoIWRhdGFba2V5UGF0aF0pIHtcbiAgICAgICAgICAgIGRlbGV0ZSBkYXRhW2tleVBhdGhdO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBkYXRhO1xuICAgIH1cblxuICAgIHByaXZhdGUgc3RhdGljIHVwZ3JhZGVEYXRhYmFzZSh1cGdyYWRlREI6IElEQlBEYXRhYmFzZSwgb2xkVmVyc2lvbjogbnVtYmVyLCBuZXdWZXJzaW9uOiBudW1iZXIgfCBudWxsLCBkYkRhdGFiYXNlOiBJRGF0YWJhc2UpIHtcbiAgICAgICAgaWYgKG5ld1ZlcnNpb24gJiYgbmV3VmVyc2lvbiA+IG9sZFZlcnNpb24pIHtcbiAgICAgICAgICAgIGlmIChkYkRhdGFiYXNlLm9iamVjdFN0b3Jlcykge1xuICAgICAgICAgICAgICAgIGZvciAodmFyIHN0b3JlIG9mIGRiRGF0YWJhc2Uub2JqZWN0U3RvcmVzKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICghdXBncmFkZURCLm9iamVjdFN0b3JlTmFtZXMuY29udGFpbnMoc3RvcmUubmFtZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYWRkTmV3U3RvcmUodXBncmFkZURCLCBzdG9yZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIHN0YXRpYyBnZXRLZXlQYXRoKGtleVBhdGg/OiBzdHJpbmcpOiBzdHJpbmcgfCBzdHJpbmdbXSB8IHVuZGVmaW5lZCB7XG4gICAgICAgIGlmIChrZXlQYXRoKSB7XG4gICAgICAgICAgICB2YXIgbXVsdGlLZXlQYXRoID0ga2V5UGF0aC5zcGxpdCgnLCcpO1xuICAgICAgICAgICAgcmV0dXJuIG11bHRpS2V5UGF0aC5sZW5ndGggPiAxID8gbXVsdGlLZXlQYXRoIDoga2V5UGF0aDtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIHN0YXRpYyBhZGROZXdTdG9yZSh1cGdyYWRlREI6IElEQlBEYXRhYmFzZSwgc3RvcmU6IElPYmplY3RTdG9yZSkge1xuICAgICAgICB0cnkge1xuXG4gICAgICAgICAgICBjb25zdCBuZXdTdG9yZSA9IHVwZ3JhZGVEQi5jcmVhdGVPYmplY3RTdG9yZShzdG9yZS5uYW1lLFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAga2V5UGF0aDogdGhpcy5nZXRLZXlQYXRoKHN0b3JlLmtleVBhdGgpLFxuICAgICAgICAgICAgICAgICAgICBhdXRvSW5jcmVtZW50OiBzdG9yZS5hdXRvSW5jcmVtZW50XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgZm9yICh2YXIgaW5kZXggb2Ygc3RvcmUuaW5kZXhlcykge1xuICAgICAgICAgICAgICAgIHRyeSB7XG5cbiAgICAgICAgICAgICAgICAgICAgbmV3U3RvcmUuY3JlYXRlSW5kZXgoaW5kZXgubmFtZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZ2V0S2V5UGF0aChpbmRleC5rZXlQYXRoKSA/PyBpbmRleC5uYW1lLFxuICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG11bHRpRW50cnk6IGluZGV4Lm11bHRpRW50cnksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdW5pcXVlOiBpbmRleC51bmlxdWVcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgICAgICAgICB0aHJvdyBgaW5kZXggJHtpbmRleC5uYW1lfSwgJHtlcnJvci50b1N0cmluZygpfWA7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgdGhyb3cgYHN0b3JlICR7c3RvcmUubmFtZX0sICR7ZXJyb3IudG9TdHJpbmcoKX1gO1xuICAgICAgICB9XG4gICAgfVxufSIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdGlmKF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0pIHtcblx0XHRyZXR1cm4gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCIvLyBzdGFydHVwXG4vLyBMb2FkIGVudHJ5IG1vZHVsZVxuX193ZWJwYWNrX3JlcXVpcmVfXyhcIi4vY2xpZW50L0luaXRpYWxpc2VJbmRleERiQmxhem9yLnRzXCIpO1xuLy8gVGhpcyBlbnRyeSBtb2R1bGUgdXNlZCAnZXhwb3J0cycgc28gaXQgY2FuJ3QgYmUgaW5saW5lZFxuIl0sInNvdXJjZVJvb3QiOiIifQ==