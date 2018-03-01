export class KeyValuePair {
    public key: string;
    public value: any;
    constructor(key: string, value: any) {
        this.key = key; this.value = value;
    }

}

export interface IConstructor<T> {
    new(...args: any[]): T;
}

export class DataItem {
    private _fields: KeyValuePair[] = [];

    constructor(initializator: Object) {
        if (initializator) {
            for (const prop of Object.keys(initializator)) {
               this.SetValue(prop, initializator[prop]);
            }
        }
    }

    public GetValue(key: string): any | undefined {
        const val: KeyValuePair = this._fields.find(item => item.key === key);
        return val ? val.value : undefined;
    }

    private getKVPair(key: string): KeyValuePair | undefined {
        return this._fields.find(item => item.key === key);
    }

    public SetValue<T>(key: string, value: T) {
        const kvp = this.getKVPair(key);
        if (kvp) {kvp.value = value; } else {this._fields.push(new KeyValuePair(key, value)); }
    }

    public GetTypedItem<T>(type: IConstructor<T>): T {
        const itm: T = new type(this.GetObject());
        // this._fields.forEach(element => {
        //     itm[element.key] = element.value;
        // });
        return itm;
    }

    public GetObject(): Object {
        const resObj = new Object;
        this._fields.forEach(val => {
            if (val.value instanceof Array) {
                const objColl: Object[] = [];
                (val.value as Array<any>).forEach(itm => {
                    if (itm instanceof DataItem) {
                        const resItm: Object = (itm as DataItem).GetObject();
                        objColl.push(resItm);
                    } else {
                        objColl.push(itm);
                    }
                });
                resObj[val.key] = objColl;
            } else {
                resObj[val.key] = val.value;
            }
        });
        return resObj;
    }

    public GetItemAndFlatChildren(): DataItem[] {
        return this.GetTypedItemAndFlatChildren<DataItem>(DataItem);
    }

    public GetTypedItemAndFlatChildren<T>(type: IConstructor<T>): T[] {
        const results: T[] = [];
        results.push(this.GetTypedItem<T>(type));
        for (const kvp of this._fields) {
            if (kvp.value instanceof Array) {
                kvp.value.forEach(val => {
                    if (val instanceof DataItem) {
                        results.push(...val.GetTypedItemAndFlatChildren<T>(type));
                    }
                });
            } else if (kvp.value instanceof DataItem) {
                results.push(kvp.value.GetTypedItem<T>(type));
            }
        }
        return results;
    }
}


