export class ObjectParser {
    static Parse(srcObj: Object, dstObj: Object) {
        for (const prop in srcObj) {
            if (srcObj.hasOwnProperty(prop) && dstObj.hasOwnProperty(prop)) {
                dstObj[prop] = srcObj[prop];
            }
        }
    }
}
