export class ObjectParser {
    static Parse(srcObj: Object, tgtObj: Object): Object {
        if (srcObj instanceof Array) {
            const dstArr: Object[] = [];
            for (const itm of srcObj) {
                const dstObj: Object = new Object();
                this._copyAllProps(itm, dstObj);
                dstArr.push(dstObj);
            }
            return dstArr;
        } else {
            this._copyMatchingProps(srcObj, tgtObj);
            return tgtObj;
        }
    }

    private static _copyMatchingProps(srcObj: Object, dstObj: Object) {
        for (const prop in srcObj) {
            if (srcObj.hasOwnProperty(prop) && dstObj.hasOwnProperty(prop)) {
                dstObj[prop] = srcObj[prop];
            }
        }
    }

    private static _copyAllProps(srcObj: Object, dstObj: Object) {
        for (const prop in srcObj) {
            if (srcObj.hasOwnProperty(prop)) {
                dstObj[prop] = srcObj[prop];
            }
        }
    }

    // // unused method, may be deleted
    // private static _copyKeys(srcObj: Object, dstObj: Object) {
    //     for (const key of Object.keys(srcObj)) {
    //         if (!dstObj.hasOwnProperty(key)) {
    //             Object.defineProperty(dstObj, key, {});
    //         }
    //     }
    // }
}
