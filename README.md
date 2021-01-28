![build Actions Status](https://github.com/kattunga/BlazorIndexedDbJs/workflows/build/badge.svg)

[![Nuget](https://img.shields.io/nuget/v/BlazorIndexedDbJs?style=flat-square)](https://www.nuget.org/packages/BlazorIndexedDbJs/)

# BlazorIndexedDbJs

This is a [Blazor](https://dotnet.microsoft.com/apps/aspnet/web-apps/blazor) library for accessing IndexedDB, it uses Jake Archibald's [idb library](https://github.com/jakearchibald/idb) for handling access to [IndexedDB API](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API).

It tries to implement IndexedDB API with same classes and function names when possible, so you can use public [documentation](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API)

## Functions
Click on function title to go to oficial documentation

#### IndexedDB API functions
[`IDBFactory.open()`](https://developer.mozilla.org/en-us/docs/Web/API/IDBFactory/open)
```CSharp
public async Task Open();
```

[`IDBFactory.deleteDatabase()`](https://developer.mozilla.org/en-us/docs/Web/API/IDBFactory/deleteDatabase)
```CSharp
public async Task DeleteDatabase();
```

[`IDBDatabase.createObjectStore()`](https://developer.mozilla.org/en-US/docs/Web/API/IDBDatabase/createObjectStore)
```CSharp
public async Task CreateObjectStore(IDBObjectStore objectStore);
```

[`IDBObjectStore.add()`](https://developer.mozilla.org/en-US/docs/Web/API/IDBObjectStore/add)
```CSharp
public async Task Add<TData>(string storeName, TData data);
public async Task Add<TData, TKey>(string storeName, TData data, TKey key);
```

[`IDBObjectStore.put()`](https://developer.mozilla.org/en-US/docs/Web/API/IDBObjectStore/put)
```CSharp
public async Task Put<TData>(string storeName, TData data);
public async Task Put<TData, TKey>(string storeName, TData data, TKey key);
```

[`IDBObjectStore.delete()`](https://developer.mozilla.org/en-US/docs/Web/API/IDBObjectStore/delete)
```CSharp
public async Task Delete<TKey>(string storeName, TKey key);
```

[`IDBObjectStore.clear()`](https://developer.mozilla.org/en-US/docs/Web/API/IDBObjectStore/clear)
```CSharp
public async Task ClearStore(string storeName);
```

[`IDBObjectStore.count()`](https://developer.mozilla.org/en-US/docs/Web/API/IDBObjectStore/count)
```CSharp
public async Task<int> Count(string storeName);
public async Task<int> Count<TKey>(string storeName, TKey key);
public async Task<int> Count<TKey>(string storeName, IDBKeyRange<TKey> key);
```

[`IDBObjectStore.get()`](https://developer.mozilla.org/en-US/docs/Web/API/IDBObjectStore/get)
```CSharp
public async Task<TResult?> Get<TKey, TResult>(string storeName, TKey key);
```

[`IDBObjectStore.getAll()`](https://developer.mozilla.org/en-US/docs/Web/API/IDBObjectStore/getAll)
```CSharp
public async Task<List<TResult>> GetAll<TResult>(string storeName, int? count = null);
public async Task<List<TResult>> GetAll<TKey, TResult>(string storeName, TKey key, int? count = null);
public async Task<List<TResult>> GetAll<TKey, TResult>(string storeName, IDBKeyRange<TKey> key, int? count = null);
public async Task<List<TResult>> GetAll<TKey, TResult>(string storeName, TKey[] key);
```

[`IDBObjectStore.getAllKeys()`](https://developer.mozilla.org/en-US/docs/Web/API/IDBObjectStore/getAllKeys)
```CSharp
public async Task<List<TResult>> GetAllKeys<TResult>(string storeName, int? count = null);
public async Task<List<TResult>> GetAllKeys<TKey, TResult>(string storeName, TKey key, int? count = null);
public async Task<List<TResult>> GetAllKeys<TKey, TResult>(string storeName, IDBKeyRange<TKey> key, int? count = null);
public async Task<List<TResult>> GetAllKeys<TKey, TResult>(string storeName, TKey[] key);
```

[`IDBIndex.count()`](https://developer.mozilla.org/en-US/docs/Web/API/IDBIndex/count)
```CSharp
public async Task<int> CountFromIndex(string storeName, string indexName);
public async Task<int> CountFromIndex<TKey>(string storeName, string indexName, TKey key);
public async Task<int> CountFromIndex<TKey>(string storeName, string indexName, IDBKeyRange<TKey> key);
```

[`IDBIndex.get()`](https://developer.mozilla.org/en-US/docs/Web/API/IDBIndex/get)
```CSharp
public async Task<TResult> GetFromIndex<TKey, TResult>(string storeName, string indexName, TKey queryValue);
```

[`IDBIndex.getAll()`](https://developer.mozilla.org/en-US/docs/Web/API/IDBIndex/getAll)
```CSharp
public async Task<List<TResult>> GetAllFromIndex<TResult>(string storeName, string indexName, int? count = null);
public async Task<List<TResult>> GetAllFromIndex<TKey, TResult>(string storeName, string indexName, TKey key, int? count = null);
public async Task<List<TResult>> GetAllFromIndex<TKey, TResult>(string storeName, string indexName, IDBKeyRange<TKey> key, int? count = null);
public async Task<List<TResult>> GetAllFromIndex<TKey, TResult>(string storeName, string indexName, TKey[] key);
```

[`IDBIndex.getKey()`](https://developer.mozilla.org/en-US/docs/Web/API/IDBIndex/getKey)
```CSharp
public async Task<TResult> GetKeyFromIndex<TKey, TResult>(string storeName, string indexName, TKey queryValue);
```

[`IDBIndex.getAllKeys()`](https://developer.mozilla.org/en-US/docs/Web/API/IDBIndex/getAllKeys)
```CSharp
public async Task<List<TResult>> GetAllKeysFromIndex<TResult>(string storeName, string indexName, int? count = null);
public async Task<List<TResult>> GetAllKeysFromIndex<TKey, TResult>(string storeName, string indexName, TKey key, int? count = null);
public async Task<List<TResult>> GetAllKeysFromIndex<TKey, TResult>(string storeName, string indexName, IDBKeyRange<TKey> key, int? count = null);
public async Task<List<TResult>> GetAllKeysFromIndex<TKey, TResult>(string storeName, string indexName, TKey[] key);
```

#### IDBObjectStore Batch functions
```CSharp
public async Task BatchAdd<TData>(string storeName, TData[] data);
public async Task BatchPut<TData>(string storeName, TData[] data);
public async Task BatchDelete<TKey>(string storeName, TKey[] key);
```

#### Advanced query functions
```CSharp
public async Task<List<TResult>> Query<TResult>(string storeName, string filter, int? count = null, int? skip = null);
public async Task<List<TResult>> QueryFromIndex<TResult>(string storeName, string indexName, string filter, int? count = null, int? skip = null);
```

## Demo

Check simple Blazor WASM PWA demo in Demos [BlazorIndexedDbJsClientDemo](https://github.com/kattunga/BlazorIndexedDbJs/tree/master/Demos/BlazorIndexedDbJsClientDemo)

## Using the library

### requires
NET 5.0 or newer

### 1. Install NuGet package

```
Install-Package BlazorIndexedDbJs
```

or

```
dotnet add package BlazorIndexedDbJs
```

### 2. Refence to BlazorIndexedDb.js library

For blazor wasm, in `wwwroot\index.html`
```html
...
<body>
    ...
    <script src="_framework/blazor.webassembly.js"></script>

    <script src="_content/BlazorIndexedDbJs/BlazorIndexedDb.js"></script>
</body>
```

For blazor server, in `Pages/_Host.cshtml`
```html
...
<body>
    ...
    <script src="_framework/blazor.server.js"></script>

    <script src="_content/BlazorIndexedDbJs/BlazorIndexedDb.js"></script>
</body>
```

### 3. create a database definition

```CSharp
using System.Collections.Generic;
using Microsoft.JSInterop;
using BlazorIndexedDbJs;

namespace BlazorIndexedDbJsClientDemo.Data
{
    public class TheFactoryDb: IDBManager
    {
        public TheFactoryDb(IJSRuntime jsRuntime): base(jsRuntime) {}

        public const string Employees = "Employees";

        protected override void OnConfiguring(IDBDatabase database)
        {
            database.Name = "TheFactory";
            database.Version = 1;

            database.ObjectStores.Add(new IDBObjectStore
            {
                Name = Employees,
                PrimaryKey = new IDBIndex
                {
                    Name = "id",
                    KeyPath = "id",
                    AutoIncrement = true
                },
                Indexes = new List<IDBIndex>
                {
                    new IDBIndex
                    {
                        Name="firstName",
                        KeyPath = "firstName",
                    },
                    new IDBIndex
                    {
                        Name="lastName",
                        KeyPath = "lastName",
                    },
                    new IDBIndex
                    {
                        Name="fullname",
                        KeyPath = "firstName","lastName"
                    }
                }
            });
        }
    }
}
```

#### Step 1 - define the database
To define the database we need to first give it a name and set its version. IndexedDB uses the version to determine whether it needs to update the database. For example if you decide to add a new store then increment the version to ensure that the store is added to the database.

#### Step 2 - Add a store(table) to the database
In IndexedDB an ObjectStore is equivalent to a table. To create an ObjectStore we create a new ```IDBObjectStore``` and add it to the collection of IDBObjectStores.

Within the ```IDBObjectStore``` we define the name, the primary index key and optionally a set of foreign key indexes if required.

The ```IDBIndex``` is used to define the primary key and any foreign keys that are required. It has the following properties:

* Name - the name of the index
* KeyPath - the identifier for the property in the saved object/record that is to be indexed
* Unique - defines whether the key value must be unique
* Auto - determines whether the index value should be generated by IndexedDB.

In the example above for the "Employees" store the primary key is explicitly set to the keypath "id" and we want it automatically generated by IndexedDB. In the "Outbox" store the primary key just has ```Auto = true``` set. IndexedDB is left to handle the rest.


### 4. add scoped service IDBManager for database

For blazor wasm, in `startup.cs`
```CSharp
    public class Program
    {
        public static async Task Main(string[] args)
        {
            var builder = WebAssemblyHostBuilder.CreateDefault(args);
            builder.RootComponents.Add<App>("#app");

            builder.Services.AddScoped(sp => new HttpClient { BaseAddress = new Uri(builder.HostEnvironment.BaseAddress) });

            builder.Services.AddScoped<TheFactoryDb>();

            await builder.Build().RunAsync();
        }
    }
```

For blazor server, in `program.cs`
```CSharp
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddRazorPages();
            services.AddServerSideBlazor();
            services.AddSingleton<WeatherForecastService>();

            services.AddScoped<TheFactoryDb>();
        }
```


## Examples

For the following examples we are going to assume that we have Person class which is defined as follows:

```CSharp
 public class Person
    {
        public long? Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }

    }
```
And the data store name is "Employees"


### Accessing IDBManager

To use IndexedDB in a component or page first inject the IDBManager instance.

```CSharp
@inject TheFactoryDb theFactoryDb
```

### Getting all records from a store
```CSharp
var people = await theFactoryDb.GetAll<Person>("Employees");
```

### Get one record by Id
```CSharp
var person = await theFactoryDb.Get<long, Person>("Employees", id);
```

### Query a IDBObjectStore using a filter expression
The filter expression is the body of a function that receives de parameter `obj` than hadle each record of ObjectStore and
must return true/false to indicate if record should be included in result set.

```CSharp
var people = await theFactoryDb.Query<Person>(TheFactoryDb.Employees, "if (obj.firstName.toLowerCase().includes('per')) return obj;");
```

### getting one record using an index
```CSharp
var person = await theFactoryDb.GetFromIndex<string, Person>("Employees", "firstName", "John");
```

### Getting all records from an index
```CSharp
var people = await theFactoryDb.GetAllFromIndex<string, Person>("Employees", "firstName", "John");
```

### Adding a record to an IDBObjectStore
```CSharp
var newPerson = new Person() {
    FirstName = "John",
    LastName = "Doe"
};

await theFactoryDb.Add("Employees", newPerson);
```

### Updating a record
```
await theFactoryDb.Put<Person>("Employees", recordToUpdate)
```

### Deleting a record
```
await theFactoryDb.Delete<int>("Employees", id)
```

### Clear all records from a store
```
await theFactoryDb.ClearStore("Employees")
```

### Deleting a Database
```
await theFactoryDb.DeleteDb()
```

### Adding a new IDBObjectStore dynamically

If you have occasion to what to add a store when the program is up and running. The following

```CSharp
var newObjectStore = new IDBObjectStore()
    {
        Name = NewStoreName,
        PrimaryKey = new IDBIndex { Name = "id", KeyPath = "id", Auto = true },
    };

await theFactoryDb.AddNewStore(newObjectStore);
```

What this will do is, if the store doesn't already exist, is increment the database version number and add the store to the database.

