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
                        KeyPath = "firstName"
                    },
                    new IDBIndex
                    {
                        Name="lastName",
                        KeyPath = "lastName"
                    },
                    new IDBIndex
                    {
                        Name="fullname",
                        MultiKeyPath = new string[] { "firstName", "lastName" }
                    }
                }
            });
        }
    }
}