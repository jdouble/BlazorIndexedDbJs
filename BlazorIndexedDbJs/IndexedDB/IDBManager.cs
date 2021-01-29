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
            public const string Open = "open";
            public const string DeleteDatabase = "deleteDatabase";
            public const string GetDbInfo = "getDbInfo";
        }

        private readonly IJSRuntime _jsRuntime;
        private const string InteropPrefix = "BlazorIndexedDbJs.IDBManager";
        private bool _isOpen;
        private List<IDBObjectStore> _objectStores = new List<IDBObjectStore>();

        public string Name { get; init; } = "";
        public int Version { get; set; }
        public List<IDBObjectStore> ObjectStores => _objectStores;

        public List<string> ObjectStoreNames
        {
            get
            {
                return _objectStores.Select(s => s.Name).ToList();
            }
        }

        public IDBManager(IJSRuntime jsRuntime)
        {
            _jsRuntime = jsRuntime;
        }

        /// <summary>
        /// Opens the IndexedDB defined in the DbDatabase. Under the covers will create the database if it does not exist
        /// and create the stores defined in DbDatabase.
        /// </summary>
        /// <returns></returns>
        public async Task Open()
        {
            var dbdef = IDBSchema.GetDatabaseDef(Name, Version, _objectStores);
            var result = await CallJavascript<string>(DbFunctions.Open, dbdef);
            _isOpen = true;
            await GetCurrentDbState();
        }

        /// <summary>
        /// Deletes the database corresponding to the dbName passed in
        /// </summary>
        /// <param name="dbName">The name of database to delete</param>
        /// <returns></returns>
        public async Task DeleteDatabase()
        {
            var result = await CallJavascript<string>(DbFunctions.DeleteDatabase, Name);
            _isOpen = false;
        }

        private async Task GetCurrentDbState()
        {
            await EnsureIsOpen();
            var result = await CallJavascript<IDBDatabaseInformation>(DbFunctions.GetDbInfo, Name);
            if (result.Version > Version)
            {
                Version = result.Version;
                var currentStores = ObjectStoreNames;
                foreach (var storeName in result.ObjectStoreNames)
                {
                    if (!currentStores.Contains(storeName))
                    {
                        _objectStores.Add(new IDBObjectStore(this) { Name = storeName });
                    }
                }
            }
        }

        /// <summary>
        /// get ObjectSore by name
        /// </summary>
        /// <param name="name"></param>
        /// <returns></returns>
        public IDBObjectStore ObjectStore(string storeName)
        {
            var store = _objectStores.Find(s => s.Name == storeName);
            if (store == null)
            {
                throw new IDBException($"Store {storeName} does not exists");
            }
            return store;
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

            if (_objectStores.Any(s => s.Name == objectStore.Name))
            {
                return;
            }
            _objectStores.Add(objectStore);
            Version += 1;

            var dbdef = IDBSchema.GetDatabaseDef(Name, Version, _objectStores);
            var result = await CallJavascript<string>(DbFunctions.Open, dbdef, new { Instance = DotNetObjectReference.Create(this), MethodName = "Callback" });
            _isOpen = true;
        }

        public async Task ConsoleLog(params object[] args)
        {
            try
            {
                await _jsRuntime.InvokeVoidAsync("console.log", args);
            }
            catch (JSException e)
            {
                throw new IDBException(e.Message);
            }
        }

        public async Task<TResult> CallJavascript<TResult>(string functionName, params object?[] args)
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

        public async Task EnsureIsOpen()
        {
            if (!_isOpen) await Open();
        }
    }
}
