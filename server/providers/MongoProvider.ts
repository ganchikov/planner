import {DataItem} from '../../common/DataItem';
import * as assert from 'assert';
import { MongoClient, Db, Collection, ObjectId} from 'mongodb';
import {IDataProvider} from '../common/IDataProvider';

export class MongoProvider implements IDataProvider {
    // private _url = 'mongodb://localhost:27017';
    // private _dbName = 'heroesdb';
    // private _collectionName = 'heroes';
    private _countersCollectionName = 'counters';

    private dbClient: MongoClient;
    private db: Db;
    private activeCollection: Collection<any>;

    constructor(private _url: string = 'mongodb://localhost:27017',
                private _dbName: string = 'sampledb',
                private _collectionName: string = 'samples',
                private _countersKeyName: string = 'samples_counter') {

    }


    private checkConnection(callback: () => void) {
        if (!this.dbClient) {this.Connect(callback); } else {callback(); }
    }

    public get Collection(): string {
        return this._collectionName;
    }

    public set Collection(name: string) {
        this._collectionName = name;
        this._countersKeyName = name + '_counter';
        if (this.dbClient) {this.activeCollection = this.db.collection(this._collectionName); }
    }

    public Connect(callback: () => void) {
        const that = this;
        MongoClient.connect(this._url, function(err, client) {
            assert.equal(null, err);
            that.dbClient = client;
            that.db = client.db(that._dbName);
            that.activeCollection = client.db(that._dbName).collection(that._collectionName);
            callback();
        });
    }
    public ReadItem<T extends DataItem> (key: any, success: (item: T) => void, error: (err: any) => void) {
        this.checkConnection(() => {
            this.activeCollection.findOne({id: key})
            .then(foundItem => {
                if (foundItem) {
                    success(new DataItem(foundItem) as T);
                } else {
                    error(null);
                }
            })
            .catch(err => {
                error(err);
            });
        });
    }

    public ReadItems<T extends DataItem> (success: (items: T[]) => void, error: (err: any) => void) {
        this.checkConnection(() => {
            this.activeCollection.find().toArray()
            .then(foundItems => {
                const resultSet: T[] = [];
                foundItems.forEach(element => {
                    resultSet.push(new DataItem(element) as T);
                });
                success(resultSet);
            })
            .catch(err => {
                error(err);
            });
        });
    }

    InsertItem<T extends DataItem> (item: T, success: (item: T) => void, error: (err: any) => void) {
        this.checkConnection(() => {
            this.db.collection(this._countersCollectionName).findOneAndUpdate(
                {'_id': this._countersKeyName}, {$inc: {'sequence_val': 1}}, {upsert: true, returnOriginal: false}
            )
            .then(incremental_result => {
                item.SetValue('id', incremental_result.value.sequence_val);
                this.activeCollection.insertOne(item.GetObject())
                .then(result => {
                    item.SetValue('_id', result.ops[0]._id);

                    success(item);
                })
                .catch(err => {
                    error(err);
                });
            })
            .catch(err => {
                error(err);
            });
        });
    }

    InsertItems<T extends DataItem> (items: T[], success: (items: T[]) => void, error: (err: any) => void) {
        this.checkConnection(() => {
            this.db.collection(this._countersCollectionName).findOneAndUpdate(
                {'_id': this._countersKeyName}, {$inc: {'sequence_val': items.length}}, {upsert: true, returnOriginal: false}
            )
            .then(incremental_result => {
                const resObjects: Object[] = [];
                let sequence_val = incremental_result.value.sequence_val - items.length;
                for (const item of items) {
                    item.SetValue('id', sequence_val);
                    sequence_val++;
                    resObjects.push(item.GetObject());
                }
                this.activeCollection.insertMany(resObjects).then(insItems => {
                    let i = 0;
                    for (const insItm of insItems.ops) {
                        items[i].SetValue('_id', insItm.ops[0]._id);
                        i++;
                    }
                    success(items);
                })
                .catch(err => {
                    error(err);
                });
            }).catch(err => {
                error(err);
            });
        });
    }

    UpdateItem<T extends DataItem> (item: T, success: (item: T) => void, error: (err: any) => void) {
        this.checkConnection(() => {
            this.activeCollection.updateOne({'_id' : new ObjectId(item.GetValue('_id'))},
            {$set : item.GetObject()}).then(() => success(item))
            .catch(err => {
                error(err);
            });
        });
    }

    DeleteItem<T extends DataItem> (item: T, success: (item: T) => void, error: (err: any) => void) {
        this.checkConnection(() => {
            this.activeCollection.deleteOne({'_id': new ObjectId(item.GetValue('_id'))}).then(() =>
                success(item)
            )
            .catch(err => {
              error(err);
            });
        });
    }

    Disconnect() {
        if (this.dbClient) {
            this.dbClient.close();
        }
    }
}
