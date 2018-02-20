import {DataItem} from '../common/DataItem';
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
    public ReadItem (key: any, success: (item: DataItem) => void, error: (err: any) => void) {
        this.checkConnection(() => {
            this.activeCollection.findOne({id: key})
            .then(foundItem => {
                if (foundItem) {
                    success(new DataItem(foundItem));
                } else {
                    error(null);
                }
            })
            .catch(err => {
                error(err);
            });
        });
    }

    public ReadItems (success: (items: DataItem[]) => void, error: (err: any) => void) {
        this.checkConnection(() => {
            this.activeCollection.find().toArray()
            .then(foundItems => {
                const resultSet: DataItem[] = [];
                foundItems.forEach(element => {
                    resultSet.push(new DataItem(element));
                });
                success(resultSet);
            })
            .catch(err => {
                error(err);
            });
        });
    }

    InsertItem<T> (item: T, success: (item: DataItem) => void, error: (err: any) => void) {
        this.checkConnection(() => {
            this.db.collection(this._countersCollectionName).findOneAndUpdate(
                {'_id': this._countersKeyName}, {$inc: {'sequence_val': 1}}, {upsert: true, returnOriginal: false}
            )
            .then(incremental_result => {
                const resultItem = new DataItem(item);
                resultItem.SetValue('id', incremental_result.value.sequence_val);
                this.activeCollection.insertOne(resultItem.GetObject())
                .then(result => {
                    resultItem.SetValue('_id', result.ops[0]._id);

                    success(resultItem);
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

    InsertItems<T> (items: T[], success: (items: DataItem[]) => void, error: (err: any) => void) {
        this.checkConnection(() => {
            this.db.collection(this._countersCollectionName).findOneAndUpdate(
                {'_id': this._countersKeyName}, {$inc: {'sequence_val': items.length}}, {upsert: true, returnOriginal: false}
            )
            .then(incremental_result => {
                const resultItems: DataItem[] = [];
                const resObjects: Object[] = [];
                let sequence_val = incremental_result.value.sequence_val - items.length;
                for (const item of items) {
                    const resultItem = new DataItem(item);
                    resultItem.SetValue('id', sequence_val);
                    resultItems.push(resultItem);
                    resObjects.push(resultItem.GetObject());
                    sequence_val++;
                }
                this.activeCollection.insertMany(resObjects).then(insItems => {
                    let i = 0;
                    for (const insItm of insItems) {
                        resultItems[i].SetValue('_id', insItm.ops[0]._id);
                        i++;
                    }
                    success(resultItems);
                })
                .catch(err => {
                    error(err);
                });
            }).catch(err => {
                error(err);
            });
        });
    }

    UpdateItem<T> (item: T, success: (item: DataItem) => void, error: (err: any) => void) {
        this.checkConnection(() => {
            const dataItem = new DataItem(item);
            this.activeCollection.updateOne({'_id' : new ObjectId(dataItem.GetValue('_id'))},
            {$set : dataItem.GetObject()}).then(success(dataItem))
            .catch(err => {
                error(err);
            });
        });
    }

    DeleteItem<T> (item: T, success: (item: DataItem) => void, error: (err: any) => void) {
        this.checkConnection(() => {
            const dataItem = new DataItem(item);
            this.activeCollection.deleteOne({'_id': new ObjectId(dataItem.GetValue('_id'))}).then(
                success(dataItem)
            )
            .catch(err => {
              error(err);
            });
        });
    }
}
