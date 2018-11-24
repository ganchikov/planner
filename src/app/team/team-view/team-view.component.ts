import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import {TableModule} from 'primeng/table';

import { TeamsApiService } from '@app/backend-api';
import { TeamDataService } from '@app/team/team-data.service';

import {Team} from '@app/common/models';
import { TeamDetailsComponent } from './../team-details/team-detals.component';

// import * as $ from 'jquery';

@Component({
  selector: 'app-team-view',
  templateUrl: './team-view.component.html',
  styleUrls: ['./team-view.component.css']
})
export class TeamViewComponent implements OnInit, AfterViewInit {

  teams: Team[] = [];

  selectedTeam: Team;

  cols: any[];

  @ViewChild(TeamDetailsComponent)
  private teamDetailsComponent: TeamDetailsComponent;

  constructor(private teamsApi: TeamsApiService) {
   }

  ngOnInit() {
    this.initColumns();
    this.teamsApi.getAllTeams().subscribe(itm => {
      this.teams.push(...itm);
    }, err => {

    });
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

  onMenuClick(event: any) {
    switch (event) {
      case 'new_team':
        this.addNewTeam();
        break;
      case 'new_member':
    }
  }

  addNewTeam() {
    this.teamDetailsComponent.header = 'New Team';
    this.teamDetailsComponent.team = new Team({});
    this.teamDetailsComponent.visible = true;
  }

  onTeamSaved(team: Team) {
    this.teamsApi.insertTeam(team).subscribe(insertedTeam => {
      this.teams.push(insertedTeam as Team);
    }, err => {
    });
  }

}
