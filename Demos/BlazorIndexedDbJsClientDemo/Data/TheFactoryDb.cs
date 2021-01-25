using System.Collections.Generic;
using Microsoft.JSInterop;
using BlazorIndexedDbJs;

namespace BlazorIndexedDbJsClientDemo.Data
{
    public class TheFactoryDb: IndexedDbDatabase
    {
        public const string Employees = "Employees";

        public override void OnConfiguring()
        {
            Name = "TheFactory";
            Version = 1;

            ObjectStores.Add(new IndexedDbObjectStore
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