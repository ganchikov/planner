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

interface IPropertiesMap {
    map: IPropertyMapPair[];
}

interface IPropertyMapPair {
    from_field: string;
    to_field: string;
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
        while (proto['__proto__'].constructor.name !== 'Object') {
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

    public GetTypedItem<T>(type: IConstructor<T>, propsMap?: IPropertiesMap): T {
        const itm: T = new type(this.GetObject(false, propsMap));
        return itm;
    }

    public GetObject(nochildren = false, propsMap?: IPropertiesMap): Object {
        const resObj = new Object;
        for (const field of this._fields) {
            let propMap;
            if (propsMap) {
                propMap = propsMap.map.find(prop => prop.from_field === field.key);
            }
            const to_field = propMap ? propMap.to_field : field.key;

            if (field.value instanceof Array && !nochildren) {
                const objColl: Object[] = [];
                for (const item of (field.value as Array<any>)) {
                    if (item instanceof DataItem) {
                        const resItm: Object = (item as DataItem).GetObject(false, propsMap);
                        objColl.push(resItm);
                    } else {
                        objColl.push(item);
                    }
                }
                resObj[to_field] = objColl;
            } else if (!(field.value instanceof Array) && !(field.value instanceof DataItem)) {
                resObj[to_field] = field.value;
            }
        }
        return resObj;
    }

    public GetItemAndFlatChildren(): DataItem[] {
        return this.GetTypedItemAndFlatChildren<DataItem>(DataItem);
    }

    public GetTypedItemAndFlatChildren<T>(type: IConstructor<T>, propsMap?: IPropertiesMap): T[] {
        const results: T[] = [];
        const itm =  this.GetTypedItem<T>(type, propsMap);
        results.push(itm);
        for (const kvp of this._fields) {
            if (kvp.value instanceof Array) {
                kvp.value.forEach(val => {
                    if (val instanceof DataItem) {
                        results.push(...val.GetTypedItemAndFlatChildren<T>(type, propsMap));
                    }
                });
            } else if (kvp.value instanceof DataItem) {
                results.push(kvp.value.GetTypedItem<T>(type, propsMap));
            }
        }
        return results;
    }
}


