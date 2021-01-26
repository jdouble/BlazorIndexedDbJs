
namespace BlazorIndexedDbJs
{
    public class IDBDatabaseInformation
    {
        public int Version { get; set; }
        public string[] ObjectStoreNames { get; set; } = default!;
    }
}
