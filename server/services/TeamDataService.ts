import {IDataProvider} from '../common/IDataProvider';
import {Team} from '../../common/models';
import {ConsoleLogger} from '../../common/Logger';

export class TeamDataService {
    private _logger: ConsoleLogger = new ConsoleLogger('TeamDataService', true);

    constructor(private _dataprovider: IDataProvider) {
        _dataprovider.Collection = 'teams';
        _dataprovider.Connect(() => {
            this._logger.Log('connected');
        });
    }

    public Close() {
        this._dataprovider.Disconnect();
    }

    public GetTeam(id: number, success: (teamItem: Team) => void, error: (err) => void) {
        this._dataprovider.ReadItem(id, item => {
            const teamItem: Team = item.GetTypedItem<Team>(Team);
            this._logger.Log('Retreved item id: ' + teamItem._id);
            success(teamItem);
        }, err => {
            this._logger.Log(err);
            error(err);
        });
    }

    public GetTeams(success: (teamItems: Team[]) => void, error: (err) => void) {
        this._dataprovider.ReadItems(items => {
            const resultItems: Team[] = [];
            if (items) {
                items.forEach(item => {
                    resultItems.push(item.GetTypedItem<Team>(Team));
                });
                this._logger.Log('Retrieved items count: ' + items.length);
            }
            success(resultItems);
        }, err => {
            this._logger.Log(err);
            error(err);
        });
    }

    public InsertTeam(item: Team, success: (resitem: Team) => void, error: (err) => void) {

        this._dataprovider.InsertItem<Team>(item, resultItem => {
            success(resultItem as Team);
            this._logger.Log('Inserted item with id: ' + (resultItem as Team)._id);
        }, err => {
            error(err);
        });
    }

    public InsertTeams(items: Team[], success: (resitems: Team[]) => void, error: (err) => void) {
        this._dataprovider.InsertItems<Team>(items, resultItems => {
            success(resultItems as Team[]);
            this._logger.Log('Inserted items count: ' + resultItems.length);
        }, err => {
            error(err);
        });
    }

    public Disconnect() {
        this._dataprovider.Disconnect();
    }

}
