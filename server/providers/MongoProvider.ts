import {KeyValuePair, DataItem} from '../common/DataItem';
import * as assert from 'assert';
import { MongoClient, Db, Collection, ObjectId} from 'mongodb';
import {IDataProvider} from '../common/IDataProvider';

export class MongoProvider implements IDataProvider {
    private _url = 'mongodb://localhost:27017';
    private _dbName = 'heroesdb';
    private _collectionName = 'heroes';
    private _countersCollectionName = 'counters';

    private dbClient: MongoClient;
    private db: Db;
    private activeCollection: Collection<any>;
    private checkConnection(callback: () => void) {
        if (!this.dbClient) {this.Connect(callback); } else {callback(); }
    }

    public Connect(callback: () => void) {
        const that = this;
        MongoClient.connect(this._url, function(err, client) {
            assert.equal(null, err);
            console.log('Successfully connected');
            that.dbClient = client;
            that.db = client.db(that._dbName);
            that.activeCollection = client.db(that._dbName).collection(that._collectionName);
            callback();
        });
    }
    public ReadItem<T> (key: any, success: (item: DataItem) => void, error: (err: any) => void) {
        this.checkConnection(() => {
            this.activeCollection.findOne({id: key})
            .then(foundItem => {
                if (foundItem) {
                    const obj: Object = foundItem;
                    const resultItem: DataItem = new DataItem();
                    for (const prop of Object.keys(obj)) {
                        resultItem.SetValue(prop, obj[prop]);
                    }
                    success(resultItem);
                } else {
                    fail(null);
                }
            })
            .catch(err => {
                error(err);
            });
        });
    }

    public ReadItems<T>(success: (items: DataItem[]) => void, error: (err: any) => void) {
        
    }
}

