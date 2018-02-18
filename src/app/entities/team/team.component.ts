import { Component, OnInit, Input } from '@angular/core';


import {ButtonModule} from 'primeng/button';
import {InputTextModule} from 'primeng/inputtext';
import {SelectItem} from 'primeng/api';

import {Team} from '../../../../common/models';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})
export class TeamComponent implements OnInit {

  constructor() { }

  private _team: Team;

  get team() {
    return this._team;
  }

  @Input()
  set team(team: Team) {
    this._team = team;
  }

  get members() {
      if (this._team && this._team.members) {
        const items: SelectItem[] = this._team.members.map<SelectItem>((member, index, members): SelectItem => {
          const val: SelectItem = {label: member.name,
            value: {id: member._id,
                    name: member.name,
                    dateStart: member.dateStart,
                    dateEnd: member.dateEnd}};
          return val;
        });
        return items;
      } else {
        return null;
      }
  }

  ngOnInit() {
      this.team = new Team();
  }

}
