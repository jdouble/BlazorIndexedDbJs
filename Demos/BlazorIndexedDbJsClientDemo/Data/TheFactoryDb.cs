using System.Collections.Generic;
using Microsoft.JSInterop;
using BlazorIndexedDbJs;

namespace BlazorIndexedDbJsClientDemo.Data
{
    public class Employees: IDBObjectStore
    {
        // this is optional, you can access the index using function
        // store.index("indexname")
        public IDBIndex FirstName { get; }
        public IDBIndex LastName { get; }
        public IDBIndex FullName { get; }

        public Employees(IDBManager manager): base(manager)
        {
            Name = "Employees";
            KeyPath = "id";
            AutoIncrement = true;

            FirstName = AddIndex("firstName", "firstName");
            LastName = AddIndex("lastName", "lastName");
            FullName = AddIndex("fullName", "firstName,lastName");
        }
    }

    public class TheFactoryDb: IDBManager
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