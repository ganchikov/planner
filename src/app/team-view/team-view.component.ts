import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import {jqxGridComponent} from 'jqwidgets-scripts/jqwidgets-ts/angular_jqxgrid';
import { TeamDataService } from '../services/team-data.service';
import {Team} from '../../../common/models';
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
export class MainViewComponent implements OnInit, AfterViewInit {

@ViewChild('gridRef') grid: jqxGridComponent;

  get team() {
    return DataHolder.selectedTeam;
  }

  teamsDataSource =
  {
        datatype: 'json',
        datafields: [
            {name: '_id'},
            {name: 'id'},
            {name: 'name'}
        ],
        localdata: DataHolder.teams
  };

  settings = {
    width: 850,
    editable: true,
    columnsresize: true,
    selectionmode: 'multiplecellsadvanced',
    columns: [
        {
            text: 'Id', datafield: 'id', width: 250, columngroup: 'TeamDetails'
        },
        {
            text: 'Name', datafield: 'name', columngroup: 'TeamDetails',
            cellsalign: 'right', align: 'right', width: 200
        } // ,
        // {
        //     text: 'Has members', columngroup: 'TeamDetails',
        //     datafield: 'HasMembers', align: 'right', cellsalign: 'right', cellsformat: 'c2', width: 200
        // }
      ],
    columngroups: [ { text: 'Team Details', align: 'center', name: 'TeamDetails' } ],
    source: undefined,
    rowdetails: true,
    initrowdetails: this.initRowDetails,
    rowdetailstemplate: { rowdetails: "<div id='grid' style='margin: 10px;'></div>", rowdetailsheight: 220, rowdetailshidden: true }
    };

    initRowDetails (index: number, parentElement: any, gridElement: Object, record: any) {
        const id = record.uid.toString();
        const grid = $($(parentElement).children()[0]);
        const membersDataSource = {
            datatype: 'json',
            datafields: [
                {name: 'id'},
                {name: 'name'},
                {name: 'dateStart'},
                {name: 'dateEnd'}
            ],
            localdata: DataHolder.teams.find(item => item._id === record._id)
          };
        DataHolder.selectedTeam = DataHolder.teams.find(item => item._id === record._id);
        if (grid) {
            grid.jqxGrid({
                source: new jqx.dataAdapter(membersDataSource),
                width: 700, height: 300,
                columns: [
                    { text: 'Id', datafield: 'id', width: 200 },
                    { text: 'Name', datafield: 'name', width: 200 },
                    { text: 'Date Start', datafield: 'dateStart', width: 150 },
                    { text: 'Date End', datafield: 'dateEnd', width: 150 }
                 ]
            });
        }
    }

//   cellsrenderer (row, columnfield, value, defaulthtml, columnproperties, rowdata) {
//         if (value < 20) {
//             return '<span style="margin: 4px; float: ' + columnproperties.cellsalign + '; color: #ff0000;">' + value + '</span>';
//         } else {
//             return '<span style="margin: 4px; float: ' + columnproperties.cellsalign + '; color: #008000;">' + value + '</span>';
//         }
//     }

  constructor(private teamService: TeamDataService) {
   }

  ngOnInit() {
    this.teamService.getTeamData().subscribe(teams => {
        this.teamsDataSource.localdata = teams;
        DataHolder.teams = teams;
        this.settings.source = new jqx.dataAdapter(this.teamsDataSource, {
             beforeLoadComplete: function(loadedRecords: any[], originalRecords: any[]) {
                 return loadedRecords;
             }
        });
        this.grid.setOptions(this.settings);
    }, error => {

    }, () => {

    });
  }

  ngAfterViewInit(): void {
    this.grid.createComponent(this.settings);
  }


}
