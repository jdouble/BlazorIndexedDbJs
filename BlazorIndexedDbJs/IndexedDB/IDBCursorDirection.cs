namespace BlazorIndexedDbJs
{
    /// <summary>
    /// Defines the direction of traversal for the cursor.
    /// </summary>
    public enum IDBCursorDirection
    {
        /// <summary>
        /// This direction causes the cursor to be opened at the start of the source.
        /// </summary>
        Next,
        /// <summary>
        /// This direction causes the cursor to be opened at the start of the source. For every key with duplicate values, only the first record is yielded.
        /// </summary>
        NextUnique,
        /// <summary>
        /// This direction causes the cursor to be opened at the end of the source.
        /// </summary>
        Previous,
        /// <summary>
        /// This direction causes the cursor to be opened at the end of the source. For every key with duplicate values, only the first record is yielded.
        /// </summary>
        PreviousUnique
    }
}
