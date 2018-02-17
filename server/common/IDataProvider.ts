import {DataItem} from './DataItem';

export interface IDataProvider {
   Collection: string;
   Connect(callback: () => void): void;
   ReadItem<T> (key: any, success: (item: DataItem) => void, failure: (err: any) => void);
   ReadItems<T> (success: (items: DataItem[]) => void, fail: (err: any) => void );
   InsertItem<T> (item: T, success: (item: DataItem) => void, failure: (err: any) => void);
   InsertItems<T> (items: T[], success: (items: DataItem[]) => void, error: (err: any) => void);
   UpdateItem<T> (item: T, success: (item: DataItem) => void, failure: (err: any) => void);
   DeleteItem<T> (item: T, success: (item: DataItem) => void, failure: (err: any) => void);
}
