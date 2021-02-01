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