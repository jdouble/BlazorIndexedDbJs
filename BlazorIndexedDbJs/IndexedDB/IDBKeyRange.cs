namespace BlazorIndexedDbJs
{
    public class IDBKeyRange<TKey>
    {
        public TKey? Lower {get; set;}
        public TKey? Upper {get; set;}
        public bool LowerOpen {get; set;}
        public bool UpperOpen {get; set;}
    }
}