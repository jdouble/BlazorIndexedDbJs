using System.Collections.Generic;
using Microsoft.JSInterop;
using BlazorIndexedDbJs;

namespace BlazorIndexedDbJsClientDemo.Data
{
    public class TheFactoryDb: IndexedDbManager
    {
        public TheFactoryDb(IJSRuntime jsRuntime): base(jsRuntime) {}

        public const string Employees = "Employees";

        protected override void OnConfiguring(IndexedDbDatabase database)
        {
            database.Name = "TheFactory";
            database.Version = 1;

            database.ObjectStores.Add(new IndexedDbObjectStore
            {
                Name = Employees,
                PrimaryKey = new IndexedDbIndex
                {
                    Name = "id",
                    KeyPath = "id",
                    Auto = true
                },
                Indexes = new List<IndexedDbIndex>
                {
                    new IndexedDbIndex
                    {
                        Name="firstName",
                        KeyPath = "firstName",
                        Auto=false
                    },
                    new IndexedDbIndex
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