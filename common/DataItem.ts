export class KeyValuePair {
    public key: string;
    public value: any;
    constructor(key: string, value: any) {
        this.key = key; this.value = value;
    }

}

interface IConstructor<T> {
    new(...args: any[]): T;
}

export class DataItem {
    private _fields: KeyValuePair[] = [];

    constructor(initializator: Object) {
        if (initializator) {
            for (const src_prop of Object.keys(initializator)) {
                const dst_props: string[] = this.getProperties(this);
                // const dst_props: string[] = [];
                for (const dst_prop of dst_props) {
                    if (src_prop === dst_prop) {
                            this.SetValue(dst_prop, initializator[src_prop]);
                    }
               }
            }
        }
    }

    private isProperty(obj: Object, name: string): boolean {
        const desc = Object.getOwnPropertyDescriptor(obj, name);
        return desc.get || desc.set ? true : false;
    }

    private getProperties(instance: DataItem): string[] {
        const props: string[] = [];
        let proto: DataItem = instance;
        while (proto.__proto__.constructor.name !== 'Object') {
            for (const prop of Object.getOwnPropertyNames(proto)) {
                if (prop !== 'constructor' && this.isProperty(proto, prop)) {
                    props.push(prop);
                }
            }
            proto = Object.getPrototypeOf(proto);
        }


        // if (proto['constructor'].name !== 'DataItem' && proto['constructor'].name !== 'Object') {
        //     const keys: string[] = Object.keys(proto);
        //     for (const key of keys) {
        //         if (key !== 'constructor') {
        //             keys.push(key);
        //         }
        //     }
        //     keys.push(...this.getKeys(proto));
        //     return keys;
        // }
        return props;
    }

    public GetValue(key: string): any | undefined {
        const val: KeyValuePair = this._fields.find(item => item.key === key);
        return val ? val.value : undefined;
    }

    private getKVPair(key: string): KeyValuePair | undefined {
        return this._fields.find(item => item.key === key);
    }

    public SetValue<T>(key: string, value: T): DataItem {
        const kvp = this.getKVPair(key);
        if (kvp) {kvp.value = value; } else {this._fields.push(new KeyValuePair(key, value)); }
        return this;
    }

    public GetTypedItem<T>(type: IConstructor<T>): T {
        const itm: T = new type(this.GetObject());
        return itm;
    }

    public GetObject(nochildren = false): Object {
        const resObj = new Object;
        for (const field of this._fields) {
            if (field.value instanceof Array && !nochildren) {
                const objColl: Object[] = [];
                for (const item of (field.value as Array<any>)) {
                    if (item instanceof DataItem) {
                        const resItm: Object = (item as DataItem).GetObject();
                        objColl.push(resItm);
                    } else {
                        objColl.push(item);
                    }
                }
                resObj[field.key] = objColl;
            } else if (!(field.value instanceof Array) && !(field.value instanceof DataItem)) {
                resObj[field.key] = field.value;
            }
        }
        return resObj;
    }

    public GetItemAndFlatChildren(): DataItem[] {
        return this.GetTypedItemAndFlatChildren<DataItem>(DataItem);
    }

    public GetTypedItemAndFlatChildren<T>(type: IConstructor<T>): T[] {
        const results: T[] = [];
        const itm =  this.GetTypedItem<T>(type);
        results.push(itm);
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


