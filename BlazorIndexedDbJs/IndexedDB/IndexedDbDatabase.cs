﻿using System.Collections.Generic;

namespace BlazorIndexedDbJs
{
    /// <summary>
    /// Used to define the database and associated stores
    /// </summary>
    public class IndexedDbDatabase
    {

        /// <summary>
        /// Name of the database to create
        /// </summary>
        public string Name { get; set; }
        /// <summary>
        /// the version of the database. Increment the value when adding a new store.
        /// </summary>
        public int Version { get; set; }
        /// <summary>
        /// A list of store schemas used to create the database stores.
        /// </summary>
        public List<IndexedDbObjectStore> ObjectStores { get; } = new List<IndexedDbObjectStore>();

        public virtual void OnConfiguring()
        {

        }
    }
}
