import { IndexedDbManager } from './indexedDbBlazor';

namespace IndexDb {
    const timeghostExtensions: string = 'BlazorIndexedDbJs';
    const extensionObject = {
        IDBManager: new IndexedDbManager()
    };

    export function initialise(): void {
        if (typeof window !== 'undefined' && !window[timeghostExtensions]) {
            window[timeghostExtensions] = {
                ...extensionObject
            };
        } else {
            window[timeghostExtensions] = {
                ...window[timeghostExtensions],
                ...extensionObject
            };
        }

    }
}

IndexDb.initialise();