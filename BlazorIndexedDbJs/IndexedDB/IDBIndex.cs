namespace BlazorIndexedDbJs
{
    /// <summary>
    /// Defines an Index for a given object store.
    /// </summary>
    public class IDBIndex
    {
        /// <summary>
        /// The name of the index.
        /// </summary>
        public string Name { get; init; } = "";

        /// <summary>
        /// the identifier for the property in the object/record that is saved and is to be indexed.
        /// can be multiple properties separated by comma
        /// if null will default to index name
        /// </summary>
        public string? KeyPath { get; init; }

        /// <summary>
        /// Affects how the index behaves when the result of evaluating the index's key path yields an array.
        /// If true, there is one record in the index for each item in an array of keys.
        /// If false, then there is one record for each key that is an array.
        /// </summary>
        /// <value></value>
        public bool MultiEntry { get; init; }

        /// <summary>
        /// Only use for indexes
        /// If true, this index does not allow duplicate values for a key.
        /// </summary>
        public bool Unique { get; init; }

        /// <summary>
        /// Only use if you are defining a primary key such as "id"
        /// If true, the object store has a key generator. Defaults to false.
        /// </summary>
        public bool AutoIncrement { get; init; }
    }
}
