![build Actions Status](https://github.com/kattunga/BlazorIndexedDbJs/workflows/build/badge.svg)

[![Nuget](https://img.shields.io/nuget/v/BlazorIndexedDbJs?style=flat-square)](https://www.nuget.org/packages/BlazorIndexedDbJs/)

# BlazorIndexedDbJs

This is a [Blazor](https://dotnet.microsoft.com/apps/aspnet/web-apps/blazor) library for accessing IndexedDB and uses Jake Archibald's [idb library](https://github.com/jakearchibald/idb) for handling access to IndexedDB on the JavaScript side.

[IndexedDB API](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API)

This are the IndexedDB implemented api functions:
```CSharp
public async Task OpenDb();
public async Task DeleteDb();

public async Task<TResult?> Get<TKey, TResult>(string storeName, TKey key);

public async Task<List<TResult>> GetAll<TResult>(string storeName, int? count = null);
public async Task<List<TResult>> GetAll<TKey, TResult>(string storeName, TKey key, int? count = null);
public async Task<List<TResult>> GetAll<TKey, TResult>(string storeName, TKey[] key);
public async Task<List<TResult>> GetAll<TKey, TResult>(string storeName, IDBKeyRange<TKey> key, int? count = null);

public async Task<int> Count(string storeName);
public async Task<int> Count<TKey>(string storeName, TKey key);
public async Task<int> Count<TKey>(string storeName, IDBKeyRange<TKey> key);

public async Task<TResult> GetFromIndex<TKey, TResult>(string storeName, string indexName, TKey queryValue);

public async Task<List<TResult>> GetAllFromIndex<TResult>(string storeName, string indexName, int? count = null);
public async Task<List<TResult>> GetAllFromIndex<TKey, TResult>(string storeName, string indexName, TKey key, int? count = null);
public async Task<List<TResult>> GetAllFromIndex<TKey, TResult>(string storeName, string indexName, TKey[] key);
public async Task<List<TResult>> GetAllFromIndex<TKey, TResult>(string storeName, string indexName, IDBKeyRange<TKey> key, int? count = null);

public async Task<int> CountFromIndex(string storeName, string indexName);
public async Task<int> CountFromIndex<TKey>(string storeName, string indexName, TKey key);
public async Task<int> CountFromIndex<TKey>(string storeName, string indexName, IDBKeyRange<TKey> key);

public async Task Add<TData>(string storeName, TData data);
public async Task Add<TData, TKey>(string storeName, TData data, TKey key);

public async Task Put<TData>(string storeName, TData data);
public async Task Put<TData, TKey>(string storeName, TData data, TKey key);

public async Task Delete<TKey>(string storeName, TKey key);

public async Task BatchAdd<TData>(string storeName, TData[] data);
public async Task BatchPut<TData>(string storeName, TData[] data);
public async Task BatchDelete<TKey>(string storeName, TKey[] key);

public async Task ClearStore(string storeName);

public async Task CreateObjectStore(IDBObjectStore objectStore);
```

### todo

at the moment does not support aggregate keys.


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

### 2. Refence to indexedDb.Blazor.js library

For blazor wasm, in `wwwroot\index.html`
```html
...
<body>
    ...
    <script src="_framework/blazor.webassembly.js"></script>

    <!-- if you need to scan as soon as the app start, add this before _framework/blazor.webassembly.js -->
    <script src="_content/BlazorIndexedDbJs/indexedDb.Blazor.js"></script>
</body>
```

For blazor server, in `Pages/_Host.cshtml`
```html
...
<body>
    ...
    <script src="_framework/blazor.server.js"></script>    

    <!-- if you need to scan as soon as the app start, add this before _framework/blazor.server.js -->
    <script src="_content/BlazorIndexedDbJs/indexedDb.Blazor.js"></script>
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
                    Auto = true
                },
                Indexes = new List<IDBIndex>
                {
                    new IDBIndex
                    {
                        Name="firstName",
                        KeyPath = "firstName",
                        Auto=false
                    },
                    new IDBIndex
                    {
                        Name="lastName",
                        KeyPath = "lastName",
                        Auto=false
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


### 4. add scoped IDBManager for database

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


## Using IDBManager

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

### Adding a record to an IDBObjectStore store

Assuming we have a new instance of our sample ```Person``` class, to add to the "Employees" ObjectStore doing the following:

```CSharp
await theFactoryDb.Add("Employees", NewPerson);
```

### Getting all records from a store

```CSharp
var people = await theFactoryDb.GetRecords<Person>("Employees");
```
 
### Get record by Id
To get a record using the id can be done as follows:

```CSharp
var person = await theFactoryDb.GetRecordById<long, Person>("Employees", id);
```

### getting a record using the index

To find a record using an index

```CSharp
var person = await theFactoryDb.GetRecordByIndex<string, Person>("Employees", "firstName", "John");
```

By default IndexedDB only returns the first record found that matches the query. If you want to get all of the records that match the query value use the following:

```CSharp
var people = await theFactoryDb.GetRecordByIndex<string, Person>("Employees", "firstName", "John");
```

### Updating a record

```
await theFactoryDb.UpdateRecord<Person>("Employees", recordToUpdate)
```

### Deleting a record

```
await theFactoryDb.UpdateRecord<int>("Employees", id)
```

### Clear all records from a store

```
await theFactoryDb.ClearStore("Employees")
```

### Deleting a Database

```
await theFactoryDb.DeleteDb()
```

### Adding a new store dynamically

If you have occasion to what to add a store when the program is up and running. The following

```CSharp
var newObjectStore = new IndexedDbObjectStore
    {
        Name = NewStoreName,
        PrimaryKey = new IndexedDbIndex { Name = "id", KeyPath = "id", Auto = true },
    };

await theFactoryDb.AddNewStore(newObjectStore);
```

What this will do is, if the store doesn't already exist, is increment the database version number and add the store to the database.


## Change Logs

### 2021-01-25

* New library name as this is a fork of the original library
* Upgrade to net 5.0
* batch operations insert/update/delete
* class StoreRecord deleted to support batch operations
* complete classnames refactor

### 2020-01-08

* Major refactor to properly support inclusion of the Javascript file from the library as a static asset. Rewrote as a Razor library and consolidated the Javascript project into the main library project.
* Now supports both client and server-side Blazor projects.

### 2019-12-30

* Change when setting up primary index to use keyPath property rather than name (thanks Fabian Fleischer)


### 2019-10-07

* Updated to .NET Core 3.0 (thanks Tony Hild)

### 2019-09-13

* Updated to Blazor 3.0.0 preview 9 (thanks Edgars Šults)

* Updated the JavaScript interop class to use new the approach for static content (thanks dieterdp)

### 2019-08-21

* Updated to Blazor 3.0.0 preview 8

### 2019-08-15

 * Updated to Blazor 3.0.0 preview 7.
 * Added means to add a new store dynamically.
 * Added function to get current version and store names of the underlying IndexedDB.
 * Minor changes.

### 2019-06-25

* Upgraded to Blazor 3.0.0 preview 6.

### 2019-04-21

* Upgraded to Blazor 0.9.0-preview3-19154-02 (thanks Behnam Emamian).
