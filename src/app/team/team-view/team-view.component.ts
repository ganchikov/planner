import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import {TableModule} from 'primeng/table';

import { TeamDataService } from '../team-data.service';
import {Team} from '../../common/models/team';
// import * as $ from 'jquery';

@Component({
  selector: 'app-team-view',
  templateUrl: './team-view.component.html',
  styleUrls: ['./team-view.component.css']
})
export class TeamViewComponent implements OnInit, AfterViewInit {

  teams: Team[];
  cols: any[];

  constructor(private teamService: TeamDataService) {
   }

  ngOnInit() {
    this.initColumns();
    this.teamService.getTeamData(teams => this.teams = teams);
  }

  initColumns() {
    this.cols = [
      {field: 'id', header: 'Id'},
      {field: 'name', header: 'Name'},
      {field: 'from', header: 'From'},
      {field: 'to', header: 'To'},
      {field: 'type', header: 'Type'},
      {field: 'confirmed', header: 'Confirmed'}
    ];
  }

  ngAfterViewInit(): void {
  }


}
