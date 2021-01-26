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