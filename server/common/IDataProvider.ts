import {DataItem} from '../../common/DataItem';

export interface IDataProvider {
   Collection: string;
   Connect(callback: () => void): void;
   Disconnect(): void;
   ReadItem<T extends DataItem> (key: any, success: (item: T) => void, failure: (err: any) => void);
   ReadItems<T extends DataItem> (success: (items: T[]) => void, fail: (err: any) => void );
   InsertItem<T extends DataItem> (item: T, success: (item: T) => void, failure: (err: any) => void);
   InsertItems<T extends DataItem> (items: T[], success: (items: T[]) => void, error: (err: any) => void);
   UpdateItem<T extends DataItem> (item: T, success: (item: T) => void, failure: (err: any) => void);
   DeleteItem<T extends DataItem> (item: T, success: (item: T) => void, failure: (err: any) => void);
}
