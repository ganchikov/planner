import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import {jqxGridComponent} from 'jqwidgets-scripts/jqwidgets-ts/angular_jqxgrid';
import { TeamDataService } from '../team-data.service';
import {Team} from '../../../../common/models';
// import * as $ from 'jquery';

class DataHolder {
    public static teams: Team[] = [];
    public static selectedTeam: Team | undefined;
}

@Component({
  selector: 'app-team-view',
  templateUrl: './team-view.component.html',
  styleUrls: ['./team-view.component.css']
})
export class TeamViewComponent implements OnInit, AfterViewInit {

@ViewChild('gridRef') grid: jqxGridComponent;

  get team() {
    return DataHolder.selectedTeam;
  }

  constructor(private teamService: TeamDataService) {
   }

  ngOnInit() {
    this.teamService.getTeamData().subscribe(teams => {
        DataHolder.teams = teams;
    }, error => {

    }, () => {

    });
  }

  ngAfterViewInit(): void {
  }


}
