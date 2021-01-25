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
    public class IndexedDbManager<TDatabase> where TDatabase : IndexedDbDatabase, new()
    {
        private struct DbFunctions
        {
            public const string CreateDb = "createDb";
            public const string DeleteDb = "deleteDb";
            public const string AddRecord = "addRecord";
            public const string AddRecords = "addRecords";
            public const string UpdateRecord = "updateRecord";
            public const string UpdateRecords = "updateRecords";
            public const string GetRecords = "getRecords";
            public const string OpenDb = "openDb";
            public const string DeleteRecord = "deleteRecord";
            public const string DeleteRecords = "deleteRecords";
            public const string GetRecordById = "getRecordById";
            public const string ClearStore = "clearStore";
            public const string GetRecordByIndex = "getRecordByIndex";
            public const string GetAllRecordsByIndex = "getAllRecordsByIndex";
            public const string GetDbInfo = "getDbInfo";
        }

        private readonly IndexedDbDatabase _database;
        private readonly IJSRuntime _jsRuntime;
        private const string InteropPrefix = "TimeGhost.IndexedDbManager";
        private bool _isOpen;

        /// <summary>
        /// A notification event that is raised when an action is completed
        /// </summary>
        public event EventHandler<IndexedDbNotificationArgs> ActionCompleted;

        public IndexedDbManager(IJSRuntime jsRuntime)
        {
            _jsRuntime = jsRuntime;
            _database = new TDatabase();
            _database.OnConfiguring();
        }

        public List<IndexedDbObjectStore> ObjectStores => _database.ObjectStores;
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

            RaiseNotification(IndexedDbActionOutCome.Successful, result);
        }

        /// <summary>
        /// Deletes the database corresponding to the dbName passed in
        /// </summary>
        /// <param name="dbName">The name of database to delete</param>
        /// <returns></returns>
        public async Task DeleteDb(string dbName)
        {
            if (string.IsNullOrEmpty(dbName))
            {
                throw new ArgumentException("dbName cannot be null or empty", nameof(dbName));
            }
            var result = await CallJavascript<string>(DbFunctions.DeleteDb, dbName);

            RaiseNotification(IndexedDbActionOutCome.Successful, result);
        }

        public async Task GetCurrentDbState()
        {
            await EnsureDbOpen();

            var result = await CallJavascript<IndexedDbInformation>(DbFunctions.GetDbInfo, _database.Name);

            if (result.Version > _database.Version)
            {
                _database.Version = result.Version;

                var currentStores = _database.ObjectStores.Select(s => s.Name);

                foreach (var storeName in result.ObjectStoreNames)
                {
                    if (!currentStores.Contains(storeName))
                    {
                        _database.ObjectStores.Add(new IndexedDbObjectStore { Name = storeName });
                    }
                }
            }
        }

        /// <summary>
        /// This function provides the means to add a store to an existing database,
        /// </summary>
        /// <param name="storeSchema"></param>
        /// <returns></returns>
        public async Task AddNewStore(IndexedDbObjectStore storeSchema)
        {
            if (storeSchema == null)
            {
                return;
            }

            if (_database.ObjectStores.Any(s => s.Name == storeSchema.Name))
            {
                return;
            }

            _database.ObjectStores.Add(storeSchema);
            _database.Version += 1;

            var result = await CallJavascript<string>(DbFunctions.OpenDb, _database, new { Instance = DotNetObjectReference.Create(this), MethodName = "Callback" });
            _isOpen = true;

            RaiseNotification(IndexedDbActionOutCome.Successful, $"new store {storeSchema.Name} added");
        }

        /// <summary>
        /// Adds a new record/object to the specified store
        /// </summary>
        /// <param name="storeName"></param>
        /// <param name="data"></param>
        /// <typeparam name="T"></typeparam>
        /// <returns></returns>
        public async Task AddRecord<T>(string storeName, T data)
        {
            await EnsureDbOpen();
            try
            {
                var result = await CallJavascript<string>(DbFunctions.AddRecord, storeName, data);
                RaiseNotification(IndexedDbActionOutCome.Successful, result);
            }
            catch (JSException e)
            {
                RaiseNotification(IndexedDbActionOutCome.Failed, e.Message);
            }
        }

        /// <summary>
        /// Add an array of new record/object in one transaction to the specified store
        /// </summary>
        /// <param name="storeName"></param>
        /// <param name="data"></param>
        /// <typeparam name="T"></typeparam>
        /// <returns></returns>
        public async Task AddRecords<T>(string storeName, T[] data)
        {
            await EnsureDbOpen();
            try
            {
                var result = await CallJavascript<string>(DbFunctions.AddRecords, storeName, data);
                RaiseNotification(IndexedDbActionOutCome.Successful, result);
            }
            catch (JSException e)
            {
                RaiseNotification(IndexedDbActionOutCome.Failed, e.Message);
            }
        }

        /// <summary>
        /// Updates and existing record
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="recordToUpdate">An instance of StoreRecord with the store name and the record to update</param>
        /// <returns></returns>
        public async Task UpdateRecord<T>(string storeName, T data)
        {
            await EnsureDbOpen();
            try
            {
                var result = await CallJavascript<string>(DbFunctions.UpdateRecord, storeName, data);
                RaiseNotification(IndexedDbActionOutCome.Successful, result);
            }
            catch (JSException jse)
            {
                RaiseNotification(IndexedDbActionOutCome.Failed, jse.Message);
            }
        }

        public async Task UpdateRecords<T>(string storeName, T[] data)
        {
            await EnsureDbOpen();
            try
            {
                var result = await CallJavascript<string>(DbFunctions.UpdateRecords, storeName, data);
                RaiseNotification(IndexedDbActionOutCome.Successful, result);
            }
            catch (JSException jse)
            {
                RaiseNotification(IndexedDbActionOutCome.Failed, jse.Message);
            }
        }

        /// <summary>
        /// Gets all of the records in a given store.
        /// </summary>
        /// <typeparam name="TResult"></typeparam>
        /// <param name="storeName">The name of the store from which to retrieve the records</param>
        /// <returns></returns>
        public async Task<List<TResult>> GetRecords<TResult>(string storeName)
        {
            await EnsureDbOpen();
            try
            {
                var results = await CallJavascript<List<TResult>>(DbFunctions.GetRecords, storeName);

                RaiseNotification(IndexedDbActionOutCome.Successful, $"Retrieved {results.Count} records from {storeName}");

                return results;
            }
            catch (JSException jse)
            {
                RaiseNotification(IndexedDbActionOutCome.Failed, jse.Message);
                return default;
            }

        }

        /// <summary>
        /// Retrieve a record by id
        /// </summary>
        /// <typeparam name="TInput"></typeparam>
        /// <typeparam name="TResult"></typeparam>
        /// <param name="storeName">The name of the  store to retrieve the record from</param>
        /// <param name="id">the id of the record</param>
        /// <returns></returns>
        public async Task<TResult> GetRecordById<TInput, TResult>(string storeName, TInput id)
        {
            await EnsureDbOpen();

            var data = new { Storename = storeName, Id = id };
            try
            {
                var record = await CallJavascript<TResult>(DbFunctions.GetRecordById, storeName, id);

                return record;
            }
            catch (JSException jse)
            {
                RaiseNotification(IndexedDbActionOutCome.Failed, jse.Message);
                return default;
            }
        }

        /// <summary>
        /// Deletes a record from the store based on the id
        /// </summary>
        /// <typeparam name="TInput"></typeparam>
        /// <param name="storeName"></param>
        /// <param name="id"></param>
        /// <returns></returns>
        public async Task DeleteRecord<TInput>(string storeName, TInput id)
        {
            await EnsureDbOpen();
            try
            {
                var result = await CallJavascript<string>(DbFunctions.DeleteRecord, storeName, id);
                RaiseNotification(IndexedDbActionOutCome.Successful, result);
            }
            catch (JSException jse)
            {
                RaiseNotification(IndexedDbActionOutCome.Failed, jse.Message);
            }
        }

        /// <summary>
        /// Delete multiple records from the store based on the id
        /// </summary>
        /// <param name="storeName"></param>
        /// <param name="id"></param>
        /// <typeparam name="TInput"></typeparam>
        /// <returns></returns>
        public async Task DeleteRecords<TInput>(string storeName, TInput[] ids)
        {
            await EnsureDbOpen();
            try
            {
                var result = await CallJavascript<string>(DbFunctions.DeleteRecords, storeName, ids);
                RaiseNotification(IndexedDbActionOutCome.Successful, result);
            }
            catch (JSException jse)
            {
                RaiseNotification(IndexedDbActionOutCome.Failed, jse.Message);
            }
        }

        /// <summary>
        /// Clears all of the records from a given store.
        /// </summary>
        /// <param name="storeName">The name of the store to clear the records from</param>
        /// <returns></returns>
        public async Task ClearStore(string storeName)
        {
            if (string.IsNullOrEmpty(storeName))
            {
                throw new ArgumentException("Parameter cannot be null or empty", nameof(storeName));
            }

            try
            {
                var result =  await CallJavascript<string, string>(DbFunctions.ClearStore, storeName);
                RaiseNotification(IndexedDbActionOutCome.Successful, result);
            }
            catch (JSException jse)
            {
                RaiseNotification(IndexedDbActionOutCome.Failed, jse.Message);

            }

        }

        /// <summary>
        /// Returns the first record that matches a query against a given index
        /// </summary>
        /// <typeparam name="TInput"></typeparam>
        /// <typeparam name="TResult"></typeparam>
        /// <param name="searchQuery">an instance of StoreIndexQuery</param>
        /// <returns></returns>
        public async Task<TResult> GetRecordByIndex<TInput, TResult>(string storeName, string indexName, TInput queryValue)
        {
            await EnsureDbOpen();

            try
            {
                var result = await CallJavascript<TResult>(DbFunctions.GetRecordByIndex, storeName, indexName, queryValue);
                return result;
            }
            catch (JSException jse)
            {
                RaiseNotification(IndexedDbActionOutCome.Failed, jse.Message);
                return default;
            }
        }

        /// <summary>
        /// Gets all of the records that match a given query in the specified index.
        /// </summary>
        /// <typeparam name="TInput"></typeparam>
        /// <typeparam name="TResult"></typeparam>
        /// <param name="searchQuery"></param>
        /// <returns></returns>
        public async Task<List<TResult>> GetAllRecordsByIndex<TInput, TResult>(string storeName, string indexName, TInput queryValue)
        {
            await EnsureDbOpen();
            try
            {
                var results = await CallJavascript<List<TResult>>(DbFunctions.GetAllRecordsByIndex, storeName, indexName, queryValue);
                RaiseNotification(IndexedDbActionOutCome.Successful,
                    $"Retrieved {results.Count} records, for {queryValue} on index {indexName}");
                return results;
            }
            catch (JSException jse)
            {
                RaiseNotification(IndexedDbActionOutCome.Failed, jse.Message);
                return default;
            }
        }

        private async Task<TResult> CallJavascript<TData, TResult>(string functionName, TData data)
        {
            return await _jsRuntime.InvokeAsync<TResult>($"{InteropPrefix}.{functionName}", data);
        }

        private async Task<TResult> CallJavascript<TResult>(string functionName, params object[] args)
        {
            return await _jsRuntime.InvokeAsync<TResult>($"{InteropPrefix}.{functionName}", args);
        }

        private async Task EnsureDbOpen()
        {
            if (!_isOpen) await OpenDb();
        }

        private void RaiseNotification(IndexedDbActionOutCome outcome, string message)
        {
            ActionCompleted?.Invoke(this, new IndexedDbNotificationArgs { Outcome = outcome, Message = message });
        }
    }
}
