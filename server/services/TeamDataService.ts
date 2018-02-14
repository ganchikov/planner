import {IDataProvider} from '../common/IDataProvider';
import {Team} from '../../common/models';
import {ConsoleLogger} from '../common/Logger';

export class TeamDataService {
    private _logger: ConsoleLogger = new ConsoleLogger('TeamDataService', true);

    constructor(private _dataprovider: IDataProvider) {
        _dataprovider.Connect(() => {
            this._logger.Log('connected');
        });
    }

    public GetTeam(id: number, success: (teamItem: Team) => void, error: (err) => void) {
        this._dataprovider.ReadItem<Team>(id, item => {
            const teamItem: Team = item.GetTypedItem(Team);
            this._logger.Log('Retreved item id: ' + teamItem._id);
            success(teamItem);
        }, err => {
            this._logger.Log(err);
            error(err);
        });
    }

    public GetTeams(success: (teamItems: Team[]) => void, error: (err) => void) {
        this._dataprovider.ReadItems<Team>(items => {
            const resultItems: Team[] = [];
            items.forEach(item => {
                resultItems.push(item.GetTypedItem<Team>(Team));
            });
            this._logger.Log('Retrieved items count: ' + items.length);
            success(resultItems);
        }, err => {
            this._logger.Log(err);
            error(err);
        });

    }

}
