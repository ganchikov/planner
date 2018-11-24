import { Injectable } from '@angular/core';
import { BaseApiService } from '@app/core/services';
import { Observable } from 'rxjs';
import { Team } from '@app/common/models';
import { IApiService } from '@app/common/interfaces';

@Injectable()
export class TeamsApiService implements IApiService<Team> {

  route = 'teams';

  constructor(public api: BaseApiService) {
  }

  mapper = (item): Team => {
    return new Team(item);
  }

  getAllTeams(): Observable<Team[]> {
    return this.api.doGetRequest<Team>(this.route,
      this.mapper, 'getAllTeams'
    );
  }

  insertTeam(item: Team): Observable<{}|Team> {
    return this.api.doPostRequest<Team>(this.route, item, this.mapper, 'insertTeam');
  }

}
