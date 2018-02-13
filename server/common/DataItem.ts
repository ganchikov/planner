export class KeyValuePair {
    public key: string;
    public value: any;
    constructor(key: string, value: any) {
        this.key = key; this.value = value;
    }

}

export class DataItem {
    private _fields: KeyValuePair[] = [];

    constructor(properties?: string[], data?: any[]) {
        let i = 0;
        if (!properties) {return;}
        properties.forEach(element => {
            this._fields.push(new KeyValuePair(element, data ? data.length > i ? data[i] : null : null ));
            i++;
        });
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
}


