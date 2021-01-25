using System;

namespace BlazorIndexedDbJs
{

    public class IndexedDbNotificationArgs : EventArgs
    {
        public IndexedDbActionOutCome Outcome { get; set; }
        public string Message { get; set; }
    }

    public enum IndexedDbActionOutCome
    {
        Successful = 0,
        Failed = 1,
        Deleted = 2
    }
}