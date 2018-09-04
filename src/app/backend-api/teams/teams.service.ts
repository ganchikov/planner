import { Injectable } from '@angular/core';
import { ServerApiService } from '@app/core/services';
import { Observable } from 'rxjs';
import { Team } from '@app/common/models';

@Injectable()
export class TeamsService {

  constructor(public api: ServerApiService) {

  }

  private mapper = (item): Team => {
    return new Team(item);
  }

  getAllTeams(): Observable<Team[]> {
    return this.api.runGetRequest<Team>('teams',
      this.mapper, 'getAllTeams'
    );
  }
}
