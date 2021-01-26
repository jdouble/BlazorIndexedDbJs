using System.Collections.Generic;

namespace BlazorIndexedDbJs
{
    /// <summary>
    /// Defines a store to add to database
    /// </summary>
    public class IDBObjectStore
    {
        /// <summary>
        /// The name for the store
        /// </summary>
        public string Name { get; set; } = "";

        /// <summary>
        /// Defines the primary key to use. If not defined automatically creates a primary that is
        /// set to true for auto increment, and has the name and path of "id"
       /// </summary>
        public IDBIndex? PrimaryKey { get; set; }

        /// <summary>
        /// Provides a set of additional indexes if required.
        /// </summary>
        public List<IDBIndex> Indexes { get; set; } = new List<IDBIndex>();
    }
}
