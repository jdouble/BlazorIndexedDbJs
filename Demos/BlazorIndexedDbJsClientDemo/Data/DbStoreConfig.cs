using System.Collections.Generic;
using BlazorIndexedDbJs;

namespace BlazorIndexedDbJsClientDemo.Data
{
    public static class DbStoreConfig
    {
        public const string Employees = "Employees";

        public static void Config(DbStore dbStore)
        {
            dbStore.DbName = "TheFactory";
            dbStore.Version = 1;

            dbStore.Stores.Add(new StoreSchema
            {
                Name = Employees,
                PrimaryKey = new IndexSpec { Name = "id", KeyPath = "id", Auto = true },
                Indexes = new List<IndexSpec>
                {
                    new IndexSpec{Name="firstName", KeyPath = "firstName", Auto=false},
                    new IndexSpec{Name="lastName", KeyPath = "lastName", Auto=false}
                }
            });
        }
    }
}