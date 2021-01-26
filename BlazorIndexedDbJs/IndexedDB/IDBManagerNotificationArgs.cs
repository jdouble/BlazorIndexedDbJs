using System;

namespace BlazorIndexedDbJs
{

    public class IDBManagerNotificationArgs : EventArgs
    {
        public string Operation { get; }
        public string ObjectStore { get; }
        public string Message { get; }

        public IDBManagerNotificationArgs(string operation, string objectStore, string message)
        {
            Operation = operation;
            ObjectStore = objectStore;
            Message = message;
        }
    }
}