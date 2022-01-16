![build Actions Status](https://github.com/kattunga/BlazorIndexedDbJs/workflows/build/badge.svg)

[![Nuget](https://img.shields.io/nuget/v/BlazorIndexedDbJs?style=flat-square)](https://www.nuget.org/packages/BlazorIndexedDbJs/)

# [BlazorIndexedDbJs](https://github.com/kattunga/BlazorIndexedDbJs)

This is a [Blazor](https://dotnet.microsoft.com/apps/aspnet/web-apps/blazor) library for accessing IndexedDB, it uses Jake Archibald's [idb library](https://github.com/jakearchibald/idb) for handling access to [IndexedDB API](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API).

It tries to implement IndexedDB API with same classes and function names when possible, so you can use public [documentation](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API)

This library was originally a fork from [William Tulloch](https://github.com/wtulloch) library [Blazor.IndexedDB](https://github.com/wtulloch/Blazor.IndexedDB).

**ATTENTION Current 2.3.x versions are development versions, it can suffer major changes between minor version, 2.4.x versions will be considered stable.**

## API

#### [IDBDatabase](https://developer.mozilla.org/en-US/docs/Web/API/IDBDatabase)

**Properties**

##### [name](https://developer.mozilla.org/en-US/docs/Web/API/IDBDatabase/name)
```CSharp
public string Name
```

##### [version](https://developer.mozilla.org/en-US/docs/Web/API/IDBDatabase/version)
```CSharp
public int Version
```

##### [objectStoreNames](https://developer.mozilla.org/en-US/docs/Web/API/IDBDatabase/objectStoreNames)
```CSharp
public List<string> ObjectStoreNames
```

##### [objectStores]()
```CSharp
public IList<IDBObjectStore> ObjectStores
```

**Constructor**
```CSharp
public IDBDatabase(IJSRuntime jsRuntime)
```

**Methods**

##### [open()]()
```CSharp
public async Task Open();
```

##### [deleteDatabase()]()
```CSharp
public async Task DeleteDatabase();
```

##### [objectStore()]()
```CSharp
public IDBObjectStore ObjectStore(string storeName);
```

#### [IDBObjectStore](https://developer.mozilla.org/en-US/docs/Web/API/IDBObjectStore)

**Properties**

##### [name](https://developer.mozilla.org/en-US/docs/Web/API/IDBObjectStore/name)
```CSharp
public string Name
```

##### [keyPath](https://developer.mozilla.org/en-US/docs/Web/API/IDBObjectStore/keyPath)
```CSharp
public string? KeyPath
```

##### [autoIncrement](https://developer.mozilla.org/en-US/docs/Web/API/IDBObjectStore/autoIncrement)
```CSharp
public bool AutoIncrement
```

##### [Indexes]()
```CSharp
public IList<IDBIndex> Indexes
```

##### [IDBDatabase]()
```CSharp
public IDBDatabase IDBDatabase
```

**Constructor**

```CSharp
public IDBObjectStore(IDBDatabase idbDatabase);
```

**Methods**

##### [add()](https://developer.mozilla.org/en-US/docs/Web/API/IDBObjectStore/add)
```CSharp
public async Task Add<TData>(TData data);
public async Task Add<TData, TKey>(TData data, TKey key);
```

##### [put()](https://developer.mozilla.org/en-US/docs/Web/API/IDBObjectStore/put)
```CSharp
public async Task Put<TData>(TData data);
public async Task Put<TData, TKey>(TData data, TKey key);
```

##### [delete()](https://developer.mozilla.org/en-US/docs/Web/API/IDBObjectStore/delete)
```CSharp
public async Task Delete<TKey>(TKey key);
```

##### [clear()](https://developer.mozilla.org/en-US/docs/Web/API/IDBObjectStore/clear)
```CSharp
public async Task ClearStore();
```

##### [Batch (add/put/delete) functions]()
```CSharp
public async Task BatchAdd<TData>(TData[] data);
public async Task BatchPut<TData>(TData[] data);
public async Task BatchDelete<TKey>(TKey[] key);
```

##### [count()](https://developer.mozilla.org/en-US/docs/Web/API/IDBObjectStore/count)
```CSharp
public async Task<int> Count();
public async Task<int> Count<TKey>(TKey key);
public async Task<int> Count<TKey>(IDBKeyRange<TKey> key);
```

##### [get()](https://developer.mozilla.org/en-US/docs/Web/API/IDBObjectStore/get)
```CSharp
public async Task<TResult?> Get<TKey, TResult>(TKey key);
```

##### [getAll()](https://developer.mozilla.org/en-US/docs/Web/API/IDBObjectStore/getAll)
```CSharp
public async Task<List<TResult>> GetAll<TResult>(int? count = null);
public async Task<List<TResult>> GetAll<TKey, TResult>(TKey key, int? count = null);
public async Task<List<TResult>> GetAll<TKey, TResult>(IDBKeyRange<TKey> key, int? count = null);
public async Task<List<TResult>> GetAll<TKey, TResult>(TKey[] key);
```

##### [getAllKeys()](https://developer.mozilla.org/en-US/docs/Web/API/IDBObjectStore/getAllKeys)
```CSharp
public async Task<List<TResult>> GetAllKeys<TResult>(int? count = null);
public async Task<List<TResult>> GetAllKeys<TKey, TResult>(TKey key, int? count = null);
public async Task<List<TResult>> GetAllKeys<TKey, TResult>(IDBKeyRange<TKey> key, int? count = null);
public async Task<List<TResult>> GetAllKeys<TKey, TResult>(TKey[] key);
```

##### [Query](#advanced-query-functions)
```CSharp
public async Task<List<TResult>> Query<TResult>(string filter, int? count = null, int? skip = null, IDBCursorDirection? cursorDirection = IDBCursorDirection.Next);
public async Task<List<TResult>> Query<TKey, TResult>(string filter, TKey key, int? count = null, int? skip = null, IDBCursorDirection? cursorDirection = IDBCursorDirection.Next);
public async Task<List<TResult>> Query<TKey, TResult>(string filter, IDBKeyRange<TKey> key, int? count = null, int? skip = null, IDBCursorDirection? cursorDirection = IDBCursorDirection.Next)
```

#### [IDBIndex](https://developer.mozilla.org/en-US/docs/Web/API/IDBIndex)

**Properties**

##### [name](https://developer.mozilla.org/en-US/docs/Web/API/IDBIndex/name)
```CSharp
public string Name
```

##### [keyPath](https://developer.mozilla.org/en-US/docs/Web/API/IDBIndex/keyPath)
```CSharp
public string KeyPath
```

##### [multiEntry](https://developer.mozilla.org/en-US/docs/Web/API/IDBIndex/multiEntry)
```CSharp
public bool MultiEntry
```

##### [unique](https://developer.mozilla.org/en-US/docs/Web/API/IDBIndex/unique)
```CSharp
public bool Unique
```

##### [objectStore](https://developer.mozilla.org/en-US/docs/Web/API/IDBIndex/objectStore)
```CSharp
public IDBObjectStore ObjectStore
```

**Constructor**
```CSharp
public IDBIndex(IDBObjectStore idbStore, string name, string keyPath, bool multiEntry = false, bool unique = false);
```

**Methods**

##### [count()](https://developer.mozilla.org/en-US/docs/Web/API/IDBIndex/count)
```CSharp
public async Task<int> Count(string indexName);
public async Task<int> Count<TKey>(TKey key);
public async Task<int> Count<TKey>(IDBKeyRange<TKey> key);
```

##### [get()](https://developer.mozilla.org/en-US/docs/Web/API/IDBIndex/get)
```CSharp
public async Task<TResult> Get<TKey, TResult>(TKey queryValue);
```

##### [getAll()](https://developer.mozilla.org/en-US/docs/Web/API/IDBIndex/getAll)
```CSharp
public async Task<List<TResult>> GetAll<TResult>(int? count = null);
public async Task<List<TResult>> GetAll<TKey, TResult>(TKey key, int? count = null);
public async Task<List<TResult>> GetAll<TKey, TResult>(IDBKeyRange<TKey> key, int? count = null);
public async Task<List<TResult>> GetAll<TKey, TResult>(TKey[] key);
```

##### [getKey()](https://developer.mozilla.org/en-US/docs/Web/API/IDBIndex/getKey)
```CSharp
public async Task<TResult> GetKey<TKey, TResult>(TKey queryValue);
```

##### [getAllKeys()](https://developer.mozilla.org/en-US/docs/Web/API/IDBIndex/getAllKeys)
```CSharp
public async Task<List<TResult>> GetAllKeys<TResult>(int? count = null);
public async Task<List<TResult>> GetAllKeys<TKey, TResult>(TKey key, int? count = null);
public async Task<List<TResult>> GetAllKeys<TKey, TResult>(IDBKeyRange<TKey> key, int? count = null);
public async Task<List<TResult>> GetAllKeys<TKey, TResult>(TKey[] key);
```

##### [Query](#advanced-query-functions)
```CSharp
public async Task<List<TResult>> Query<TResult>(string filter, int? count = null, int? skip = null, IDBCursorDirection? cursorDirection = IDBCursorDirection.Next);
public async Task<List<TResult>> Query<TKey, TResult>(string filter, TKey key, int? count = null, int? skip = null, IDBCursorDirection? cursorDirection = IDBCursorDirection.Next);
public async Task<List<TResult>> Query<TKey, TResult>(string filter, IDBKeyRange<TKey> key, int? count = null, int? skip = null, IDBCursorDirection? cursorDirection = IDBCursorDirection.Next)
```

#### [IDBCursorDirection](https://developer.mozilla.org/en-US/docs/Web/API/IDBCursor/direction)

##### [Enum](https://w3c.github.io/IndexedDB/#enumdef-idbcursordirection)

```CSharp
{
Next
NextUnique,
Previous,
PreviousUnique
}
```

## Advanced query functions

The filter expression is the body of a function that receives de parameter `obj` than handle each record of ObjectStore.
The function must return an Object of type TResult, that will be included in the ```List<TResult>``` result and can be one of the following options:
* the same object
* a new object
* an array of new objects (unwind)
* undefined (record is not included in result)

for example, return a list of objects that contains the world `"per"` in property `firstName` ordered using index `lastName`.
```CSharp
List<Person> result = await theFactoryDb.Store("people").Index("lastName").Query<Person>(
    "if (obj.firstName.toLowerCase().includes('per')) return obj;"
);
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

Although it is not mandatory, because ObjectStores and Indexes can be accessed by name, it is preferable to define the database schema using classes, this facilitates refactoring and detecting errors at compile time.

Without classes
```CSharp
var people = await theFactoryDb.Store("Employees").Index("firstName").GetAll<Person>();
```

With classes
```CSharp
var people = await theFactoryDb.Employees.FirstName.GetAll<Person>();
```

Example of schema using classes:

`Data/TheFactoryDb.cs`
```CSharp
using System.Collections.Generic;
using Microsoft.JSInterop;
using BlazorIndexedDbJs;

namespace BlazorIndexedDbJsClientDemo.Data
{
    public class Employees: IDBObjectStore
    {
        public IDBIndex FirstName { get; }
        public IDBIndex LastName { get; }
        public IDBIndex FullName { get; }

        public Employees(IDBDatabase database): base(database)
        {
            Name = "Employees";
            KeyPath = "id";
            AutoIncrement = true;

            FirstName = new IDBIndex(this, "firstName", "firstName");
            LastName = new IDBIndex(this, "lastName", "lastName");
            FullName = new IDBIndex(this, "fullName", "firstName,lastName");
        }
    }

    public class TheFactoryDb: IDBDatabase
    {
        public Employees Employees { get; }

        public TheFactoryDb(IJSRuntime jsRuntime): base(jsRuntime)
        {
            Name = "TheFactory";
            Version = 1;

            Employees = new Employees(this);
        }
    }
}
```

### 4. Add a scoped service for each IDBDatabase

For blazor wasm, in `program.cs`
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

For blazor server, in `startup.cs`
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


### Accessing IDBDatabase

To use IndexedDB in a component or page, first inject the IDBDatabase instance.

```CSharp
@inject TheFactoryDb theFactoryDb
```

### Open database
This will create the database if it not exists and will upgrade schema to new version if it is older.
```CSharp
await theFactoryDb.Open()
```

### Getting all records from a store
```CSharp
var people = await theFactoryDb.Employees.GetAll<Person>();
```

### Get one record by Id
```CSharp
var person = await theFactoryDb.Employees.Get<long, Person>(id);
```

### Getting one record using an index
```CSharp
var person = await theFactoryDb.Employees.FirstName.Get<string, Person>("John");
```

### Getting all records from an index
```CSharp
var people = await theFactoryDb.Employees.FirstName.GetAll<string, Person>("John");
```

### Adding a record to an IDBObjectStore
```CSharp
var newPerson = new Person() {
    FirstName = "John",
    LastName = "Doe"
};

await theFactoryDb.Employees.Add(newPerson);
```

### Updating a record
```CSharp
await theFactoryDb.Employees.Put<Person>(recordToUpdate)
```

### Deleting a record
```CSharp
await theFactoryDb.Employees.Delete<int>(id)
```

### Clear all records from a store
```CSharp
await theFactoryDb.Employees.Clear()
```

### Deleting the database
```CSharp
await theFactoryDb.DeleteDb()
```
