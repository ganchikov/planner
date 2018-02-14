export class KeyValuePair {
    public key: string;
    public value: any;
    constructor(key: string, value: any) {
        this.key = key; this.value = value;
    }

}

export class DataItem {
    private _fields: KeyValuePair[] = [];

    constructor(initializator: Object) {
        for (const prop of Object.keys(initializator)) {
            this.SetValue(prop, initializator[prop]);
        }
    }

    public GetValue(key: string): KeyValuePair {
        return this._fields.find(item => item.key === key);
    }

    public SetValue(key: string, value: any) {
        const item: KeyValuePair = this._fields.find(i => i.key === key);
        if (item) {item.value = value; } else {this._fields.push(new KeyValuePair(key, value)); }
    }

    public GetTypedItem<T>(item: {new (): T; }): T {
        const itm: T = new item();
        this._fields.forEach(element => {
            itm[element.key] = element.value;
        });
        return itm;
    }

    public GetObject(): Object {
        const resObj = new Object;
        this._fields.forEach(val => {
            if (val.key !== '_id') {
                resObj[val.key] = val.value;
            }
        });
        return resObj;
    }
}


