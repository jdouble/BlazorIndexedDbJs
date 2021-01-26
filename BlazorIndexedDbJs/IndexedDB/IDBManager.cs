using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.JSInterop;

namespace BlazorIndexedDbJs
{
    /// <summary>
    /// Provides functionality for accessing IndexedDB from Blazor application
    /// </summary>
    public abstract class IDBManager
    {
        private struct DbFunctions
        {
            public const string CreateDb = "createDb";
            public const string DeleteDb = "deleteDb";
            public const string OpenDb = "openDb";
            public const string Get = "get";
            public const string GetAll = "getAll";
            public const string GetAllByArrayKey = "getAllByArrayKey";
            public const string GetAllByKeyRange = "getAllByKeyRange";
            public const string Count = "count";
            public const string CountByKeyRange = "countByKeyRange";
            public const string Query = "query";
            public const string GetFromIndex = "getFromIndex";
            public const string GetAllFromIndex = "getAllFromIndex";
            public const string GetAllFromIndexByArrayKey = "GetAllFromIndexByArrayKey";
            public const string GetAllFromIndexByKeyRange = "GetAllFromIndexByKeyRange";
            public const string CountFromIndex = "countFromIndex";
            public const string CountFromIndexByKeyRange = "countFromIndexByKeyRange";
            public const string QueryFromIndex = "queryFromIndex";
            public const string Add = "add";
            public const string Put = "put";
            public const string Delete = "delete";
            public const string BatchAdd = "batchAdd";
            public const string BatchPut = "batchPut";
            public const string BatchDelete = "batchDelete";
            public const string ClearStore = "clearStore";
            public const string GetDbInfo = "getDbInfo";
        }

        private readonly IDBDatabase _database;
        private readonly IJSRuntime _jsRuntime;
        private const string InteropPrefix = "TimeGhost.IndexedDbManager";
        private bool _isOpen;

        /// <summary>
        /// A notification event that is raised when an action is completed
        /// </summary>
        public event EventHandler<IDBManagerNotificationArgs>? ActionCompleted;

        public IDBManager(IJSRuntime jsRuntime)
        {
            _jsRuntime = jsRuntime;
            _database = new IDBDatabase();
            OnConfiguring(_database);
        }

        /// <summary>
        /// This mus be overrided in descendant classes
        /// </summary>
        /// <param name="database"></param>
        protected abstract void OnConfiguring(IDBDatabase database);

        public List<IDBObjectStore> ObjectStores => _database.ObjectStores;
        public int Version => _database.Version;
        public string Name => _database.Name;

        /// <summary>
        /// Opens the IndexedDB defined in the DbDatabase. Under the covers will create the database if it does not exist
        /// and create the stores defined in DbDatabase.
        /// </summary>
        /// <returns></returns>
        public async Task OpenDb()
        {
            var result = await CallJavascript<string>(DbFunctions.OpenDb, _database, new { Instance = DotNetObjectReference.Create(this), MethodName= "Callback"});
            _isOpen = true;
            await GetCurrentDbState();
            RaiseNotification(DbFunctions.OpenDb, "", result);
        }

        /// <summary>
        /// Deletes the database corresponding to the dbName passed in
        /// </summary>
        /// <param name="dbName">The name of database to delete</param>
        /// <returns></returns>
        public async Task DeleteDb()
        {
            var result = await CallJavascript<string>(DbFunctions.DeleteDb, _database.Name);
            RaiseNotification(DbFunctions.DeleteDb, "", result);
        }

        private async Task GetCurrentDbState()
        {
            await EnsureDbOpen();
            var result = await CallJavascript<IDBDatabaseInformation>(DbFunctions.GetDbInfo, _database.Name);
            if (result.Version > _database.Version)
            {
                _database.Version = result.Version;
                var currentStores = _database.ObjectStores.Select(s => s.Name);
                foreach (var storeName in result.ObjectStoreNames)
                {
                    if (!currentStores.Contains(storeName))
                    {
                        _database.ObjectStores.Add(new IDBObjectStore { Name = storeName });
                    }
                }
            }
        }

        /// <summary>
        /// This function provides the means to add a store to an existing database,
        /// </summary>
        /// <param name="objectStore"></param>
        /// <returns></returns>
        public async Task CreateObjectStore(IDBObjectStore objectStore)
        {
            if (objectStore == null)
            {
                return;
            }

            if (_database.ObjectStores.Any(s => s.Name == objectStore.Name))
            {
                return;
            }
            _database.ObjectStores.Add(objectStore);
            _database.Version += 1;
            var result = await CallJavascript<string>(DbFunctions.OpenDb, _database, new { Instance = DotNetObjectReference.Create(this), MethodName = "Callback" });
            _isOpen = true;
            RaiseNotification("createObjectStore", objectStore.Name, $"new store {objectStore.Name} added");
        }

        /// <summary>
        /// Retrieve a record by Key
        /// </summary>
        /// <typeparam name="TKey"></typeparam>
        /// <typeparam name="TResult"></typeparam>
        /// <param name="storeName">The name of the ObjectStore to retrieve the record from</param>
        /// <param name="key">the key of the record</param>
        /// <returns></returns>
        public async Task<TResult?> Get<TKey, TResult>(string storeName, TKey key)
        {
            await EnsureDbOpen();
            var result = await CallJavascript<TResult?>(DbFunctions.Get, storeName, key);
            RaiseNotification(DbFunctions.Get, storeName, $"Retrieved 1 records from {storeName}");
            return result;
        }

        /// <summary>
        /// Gets all of the records in a given store.
        /// </summary>
        /// <typeparam name="TResult"></typeparam>
        /// <param name="storeName">The name of the ObjectStore to retrieve the record from</param>
        /// <returns></returns>
        public async Task<List<TResult>> GetAll<TResult>(string storeName, int? count = null)
        {
            await EnsureDbOpen();
            var results = await CallJavascript<List<TResult>>(DbFunctions.GetAll, storeName, null, count);
            RaiseNotification(DbFunctions.GetAll, storeName, $"Retrieved {results.Count} records from {storeName}");
            return results;
        }

        /// <summary>
        /// Gets all of the records by Key in a given store.
        /// </summary>
        /// <param name="storeName">The name of the ObjectStore to retrieve the record from</param>
        /// <param name="key"></param>
        /// <typeparam name="TKey"></typeparam>
        /// <typeparam name="TResult"></typeparam>
        /// <returns></returns>
        public async Task<List<TResult>> GetAll<TKey, TResult>(string storeName, TKey key, int? count = null)
        {
            await EnsureDbOpen();
            var results = await CallJavascript<List<TResult>>(DbFunctions.GetAll, storeName, key, count);
            RaiseNotification(DbFunctions.GetAll, storeName, $"Retrieved {results.Count} records from {storeName}");
            return results;
        }

        /// <summary>
        /// Gets all of the records by ArrayKey in a given store.
        /// </summary>
        /// <param name="storeName">The name of the ObjectStore to retrieve the record from</param>
        /// <param name="key"></param>
        /// <typeparam name="TKey"></typeparam>
        /// <typeparam name="TResult"></typeparam>
        /// <returns></returns>
        public async Task<List<TResult>> GetAll<TKey, TResult>(string storeName, TKey[] key)
        {
            await EnsureDbOpen();
            var results = await CallJavascript<List<TResult>>(DbFunctions.GetAllByArrayKey, storeName, key);
            RaiseNotification(DbFunctions.GetAllByArrayKey, storeName, $"Retrieved {results.Count} records from {storeName}");
            return results;
        }

        /// <summary>
        /// Gets all of the records by KeyRange in a given store.
        /// </summary>
        /// <param name="storeName">The name of the ObjectStore to retrieve the record from</param>
        /// <param name="key"></param>
        /// <typeparam name="TKey"></typeparam>
        /// <typeparam name="TResult"></typeparam>
        /// <returns></returns>
        public async Task<List<TResult>> GetAll<TKey, TResult>(string storeName, IDBKeyRange<TKey> key, int? count = null)
        {
            await EnsureDbOpen();
            var results = await CallJavascript<List<TResult>>(DbFunctions.GetAllByKeyRange, storeName, key.Lower, key.Upper, key.LowerOpen, key.UpperOpen, count);
            RaiseNotification(DbFunctions.GetAllByKeyRange, storeName, $"Retrieved {results.Count} records from {storeName}");
            return results;
        }

        /// <summary>
        /// Count records in ObjectStore
        /// </summary>
        /// <param name="storeName">The name of the ObjectStore to retrieve the record from</param>
        /// <returns></returns>
        public async Task<int> Count(string storeName)
        {
            await EnsureDbOpen();
            var result = await CallJavascript<int>(DbFunctions.Count, storeName);
            RaiseNotification(DbFunctions.Count, storeName, $"Retrieved {result} records from {storeName}");
            return result;
        }

        /// <summary>
        /// Count records in ObjectStore
        /// </summary>
        /// <param name="storeName">The name of the ObjectStore to retrieve the record from</param>
        /// <param name="key"></param>
        /// <typeparam name="TKey"></typeparam>
        /// <returns></returns>
        public async Task<int> Count<TKey>(string storeName, TKey key)
        {
            await EnsureDbOpen();
            var result = await CallJavascript<int>(DbFunctions.Count, storeName, key);
            RaiseNotification(DbFunctions.Count, storeName, $"Retrieved {result} records from {storeName}");
            return result;
        }

        /// <summary>
        /// Count records in ObjectStore
        /// </summary>
        /// <param name="storeName">The name of the ObjectStore to retrieve the record from</param>
        /// <param name="key"></param>
        /// <typeparam name="TKey"></typeparam>
        /// <returns></returns>
        public async Task<int> Count<TKey>(string storeName, IDBKeyRange<TKey> key)
        {
            await EnsureDbOpen();
            var result = await CallJavascript<int>(
                DbFunctions.CountByKeyRange, storeName, key.Lower, key.Upper, key.LowerOpen, key.UpperOpen);
            RaiseNotification(DbFunctions.CountByKeyRange, storeName, $"Retrieved {result} records from {storeName}");
            return result;
        }

        /// <summary>
        /// Gets all of the records using a filter expression
        /// </summary>
        /// <param name="storeName">The name of the ObjectStore to retrieve the record from</param>
        /// <param name="filter">expresion that evaluates to true/false, each record es passed to "obj" parameter</param>
        /// <param name="count"></param>
        /// <param name="skip"></param>
        /// <typeparam name="TResult"></typeparam>
        /// <returns></returns>
        public async Task<List<TResult>> Query<TResult>(string storeName, string filter, int? count = null, int? skip = null)
        {
            await EnsureDbOpen();
            var results = await CallJavascript<List<TResult>>(DbFunctions.Query, storeName, filter, count, skip);
            RaiseNotification(DbFunctions.Query, storeName, $"Retrieved {results.Count} records from {storeName}");
            return results;
        }

        /// <summary>
        /// Returns the first record that matches a query against a given index
        /// </summary>
        /// <typeparam name="TKey"></typeparam>
        /// <typeparam name="TResult"></typeparam>
        /// <param name="searchQuery">an instance of StoreIndexQuery</param>
        /// <returns></returns>
        public async Task<TResult> GetFromIndex<TKey, TResult>(string storeName, string indexName, TKey queryValue)
        {
            await EnsureDbOpen();
            var result = await CallJavascript<TResult>(
                DbFunctions.GetFromIndex, storeName, indexName, queryValue);
            RaiseNotification(DbFunctions.GetFromIndex, storeName, $"Retrieved 1 records from {storeName} index {indexName}");
            return result;
        }

        /// <summary>
        /// Gets all of the records that match a given query in the specified index.
        /// </summary>
        /// <param name="storeName">The name of the ObjectStore to retrieve the record from</param>
        /// <param name="indexName"></param>
        /// <param name="count"></param>
        /// <typeparam name="TResult"></typeparam>
        /// <returns></returns>
        public async Task<List<TResult>> GetAllFromIndex<TResult>(string storeName, string indexName, int? count = null)
        {
            await EnsureDbOpen();
            var results = await CallJavascript<List<TResult>>(
                DbFunctions.GetAllFromIndex, storeName, indexName, null, count);
            RaiseNotification(DbFunctions.GetAllFromIndex, storeName, $"Retrieved {results.Count} records from {storeName} index {indexName}");
            return results;
        }

        /// <summary>
        /// Gets all of the records that match a given query in the specified index.
        /// </summary>
        /// <param name="storeName">The name of the ObjectStore to retrieve the record from</param>
        /// <param name="indexName"></param>
        /// <param name="key"></param>
        /// <param name="count"></param>
        /// <typeparam name="TKey"></typeparam>
        /// <typeparam name="TResult"></typeparam>
        /// <returns></returns>
        public async Task<List<TResult>> GetAllFromIndex<TKey, TResult>(string storeName, string indexName, TKey key, int? count = null)
        {
            await EnsureDbOpen();
            var results = await CallJavascript<List<TResult>>(
                DbFunctions.GetAllFromIndex, storeName, indexName, key, count);
            RaiseNotification(DbFunctions.GetAllFromIndex, storeName, $"Retrieved {results.Count} records from {storeName} index {indexName}");
            return results;
        }

        /// <summary>
        /// Gets all of the records that match a given query in the specified index.
        /// </summary>
        /// <param name="storeName">The name of the ObjectStore to retrieve the record from</param>
        /// <param name="indexName"></param>
        /// <param name="key"></param>
        /// <typeparam name="TKey"></typeparam>
        /// <typeparam name="TResult"></typeparam>
        /// <returns></returns>
        public async Task<List<TResult>> GetAllFromIndex<TKey, TResult>(string storeName, string indexName, TKey[] key)
        {
            await EnsureDbOpen();
            var results = await CallJavascript<List<TResult>>(
                DbFunctions.GetAllFromIndexByArrayKey, storeName, indexName, key);
            RaiseNotification(DbFunctions.GetAllFromIndexByArrayKey, storeName, $"Retrieved {results.Count} records from {storeName} index {indexName}");
            return results;
        }

        /// <summary>
        /// Gets all of the records that match a given query in the specified index.
        /// </summary>
        /// <param name="storeName">The name of the ObjectStore to retrieve the record from</param>
        /// <param name="indexName"></param>
        /// <param name="queryValue"></param>
        /// <param name="count"></param>
        /// <typeparam name="TKey"></typeparam>
        /// <typeparam name="TResult"></typeparam>
        /// <returns></returns>
        public async Task<List<TResult>> GetAllFromIndex<TKey, TResult>(string storeName, string indexName, IDBKeyRange<TKey> key, int? count = null)
        {
            await EnsureDbOpen();
            var results = await CallJavascript<List<TResult>>(
                DbFunctions.GetAllFromIndexByKeyRange, storeName, indexName, key.Lower, key.Upper, key.LowerOpen, key.UpperOpen, count);
            RaiseNotification(DbFunctions.GetAllFromIndexByKeyRange, storeName, $"Retrieved {results.Count} records from {storeName} index {indexName}");
            return results;
        }

        /// <summary>
        /// Count records in ObjectStore
        /// </summary>
        /// <param name="storeName">The name of the ObjectStore to retrieve the record from</param>
        /// <returns></returns>
        public async Task<int> CountFromIndex(string storeName, string indexName)
        {
            await EnsureDbOpen();
            var result = await CallJavascript<int>(DbFunctions.CountFromIndex, storeName);
            RaiseNotification(DbFunctions.Count, storeName, $"Retrieved {result} records from {storeName}");
            return result;
        }

        /// <summary>
        /// Count records in ObjectStore
        /// </summary>
        /// <param name="storeName">The name of the ObjectStore to retrieve the record from</param>
        /// <param name="key"></param>
        /// <typeparam name="TKey"></typeparam>
        /// <returns></returns>
        public async Task<int> CountFromIndex<TKey>(string storeName, string indexName, TKey key)
        {
            await EnsureDbOpen();
            var result = await CallJavascript<int>(DbFunctions.CountFromIndex, storeName, key);
            RaiseNotification(DbFunctions.CountFromIndex, storeName, $"Retrieved {result} records from {storeName}");
            return result;
        }

        /// <summary>
        /// Count records in ObjectStore
        /// </summary>
        /// <param name="storeName">The name of the ObjectStore to retrieve the record from</param>
        /// <param name="key"></param>
        /// <typeparam name="TKey"></typeparam>
        /// <returns></returns>
        public async Task<int> CountFromIndex<TKey>(string storeName, string indexName, IDBKeyRange<TKey> key)
        {
            await EnsureDbOpen();
            var result = await CallJavascript<int>(
                DbFunctions.CountFromIndexByKeyRange, storeName, key.Lower, key.Upper, key.LowerOpen, key.UpperOpen);
            RaiseNotification(DbFunctions.CountFromIndexByKeyRange, storeName, $"Retrieved {result} records from {storeName}");
            return result;
        }

        /// <summary>
        /// Gets all of the records using a filter expression
        /// </summary>
        /// <param name="storeName">The name of the ObjectStore to retrieve the record from</param>
        /// <param name="filter">expresion that evaluates to true/false, each record es passed to "obj" parameter</param>
        /// <param name="count"></param>
        /// <param name="skip"></param>
        /// <typeparam name="TResult"></typeparam>
        /// <returns></returns>
        public async Task<List<TResult>> QueryFromIndex<TResult>(string storeName, string indexName, string filter, int? count = null, int? skip = null)
        {
            await EnsureDbOpen();
            var results = await CallJavascript<List<TResult>>(DbFunctions.QueryFromIndex, storeName, indexName, filter, count, skip);
            RaiseNotification(DbFunctions.QueryFromIndex, storeName, $"Retrieved {results.Count} records from {storeName}");
            return results;
        }

        /// <summary>
        /// Adds a new record/object to the specified ObjectStore
        /// </summary>
        /// <param name="storeName">The name of the ObjectStore to retrieve the record from</param>
        /// <param name="data"></param>
        /// <typeparam name="T"></typeparam>
        /// <returns></returns>
        public async Task Add<TData>(string storeName, TData data)
        {
            await EnsureDbOpen();
            var result = await CallJavascript<string>(DbFunctions.Add, storeName, data);
            RaiseNotification(DbFunctions.Add, storeName, result);
        }

        /// <summary>
        /// Adds a new record/object to the specified ObjectStore
        /// </summary>
        /// <param name="storeName">The name of the ObjectStore to retrieve the record from</param>
        /// <param name="storeName"></param>
        /// <param name="data"></param>
        /// <typeparam name="TData"></typeparam>
        /// <returns></returns>
        public async Task Add<TData, TKey>(string storeName, TData data, TKey key)
        {
            await EnsureDbOpen();
            var result = await CallJavascript<string>(DbFunctions.Add, storeName, data, key);
            RaiseNotification(DbFunctions.Add, storeName, result);
        }

        /// <summary>
        /// Updates and existing record
        /// </summary>
        /// <param name="storeName">The name of the ObjectStore to retrieve the record from</param>
        /// <param name="data"></param>
        /// <typeparam name="T"></typeparam>
        /// <returns></returns>
        public async Task Put<TData>(string storeName, TData data)
        {
            await EnsureDbOpen();
            var result = await CallJavascript<string>(DbFunctions.Put, storeName, data);
            RaiseNotification(DbFunctions.Put, storeName, result);
        }

        /// <summary>
        /// Updates and existing record
        /// </summary>
        /// <param name="storeName">The name of the ObjectStore to retrieve the record from</param>
        /// <param name="data"></param>
        /// <param name="key"></param>
        /// <typeparam name="TData"></typeparam>
        /// <typeparam name="TKey"></typeparam>
        /// <returns></returns>
        public async Task Put<TData, TKey>(string storeName, TData data, TKey key)
        {
            await EnsureDbOpen();
            var result = await CallJavascript<string>(DbFunctions.Put, storeName, data, key);
            RaiseNotification(DbFunctions.Put, storeName, result);
        }

        /// <summary>
        /// Deletes a record from the store based on the id
        /// </summary>
        /// <typeparam name="TInput"></typeparam>
        /// <param name="storeName"></param>
        /// <param name="key"></param>
        /// <returns></returns>
        public async Task Delete<TKey>(string storeName, TKey key)
        {
            await EnsureDbOpen();
            var result = await CallJavascript<string>(DbFunctions.Delete, storeName, key);
            RaiseNotification(DbFunctions.Delete, storeName, result);
        }

        /// <summary>
        /// Add an array of new record/object in one transaction to the specified store
        /// </summary>
        /// <param name="storeName">The name of the ObjectStore to retrieve the record from</param>
        /// <param name="data"></param>
        /// <typeparam name="T"></typeparam>
        /// <returns></returns>
        public async Task BatchAdd<TData>(string storeName, TData[] data)
        {
            await EnsureDbOpen();
            var result = await CallJavascript<string>(DbFunctions.BatchAdd, storeName, data);
            RaiseNotification(DbFunctions.BatchAdd, storeName, result);
        }

        public async Task BatchPut<TData>(string storeName, TData[] data)
        {
            await EnsureDbOpen();
            var result = await CallJavascript<string>(DbFunctions.BatchPut, storeName, data);
            RaiseNotification(DbFunctions.BatchPut, storeName, result);
        }

        /// <summary>
        /// Delete multiple records from the store based on the id
        /// </summary>
        /// <param name="storeName">The name of the ObjectStore to retrieve the record from</param>
        /// <param name="id"></param>
        /// <typeparam name="TInput"></typeparam>
        /// <returns></returns>
        public async Task BatchDelete<TInput>(string storeName, TInput[] ids)
        {
            await EnsureDbOpen();
            var result = await CallJavascript<string>(DbFunctions.BatchDelete, storeName, ids);
            RaiseNotification(DbFunctions.BatchDelete, storeName, result);
        }

        /// <summary>
        /// Clears all of the records from a given store.
        /// </summary>
        /// <param name="storeName">The name of the ObjectStore to retrieve the record from</param>
        /// <returns></returns>
        public async Task ClearStore(string storeName)
        {
            await EnsureDbOpen();
                var result =  await CallJavascript<string>(DbFunctions.ClearStore, storeName);
                RaiseNotification(DbFunctions.ClearStore, storeName, result);
        }

        private async Task<TResult> CallJavascript<TResult>(string functionName, params object?[] args)
        {
            try
            {
                return await _jsRuntime.InvokeAsync<TResult>($"{InteropPrefix}.{functionName}", args);
            }
            catch (JSException e)
            {
                throw new IDBException(e.Message);
            }
        }

        private async Task EnsureDbOpen()
        {
            if (!_isOpen) await OpenDb();
        }

        private void RaiseNotification(string operation, string objectStore, string message)
        {
            ActionCompleted?.Invoke(this, new IDBManagerNotificationArgs(operation, objectStore, message));
        }
    }
}
