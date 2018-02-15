import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import {jqxGridComponent} from 'jqwidgets-scripts/jqwidgets-ts/angular_jqxgrid';
import { TeamDataService } from '../services/team-data.service';
import {Team} from '../../../common/models';

@Component({
  selector: 'app-team-view',
  templateUrl: './team-view.component.html',
  styleUrls: ['./team-view.component.css']
})
export class MainViewComponent implements OnInit, AfterViewInit {

@ViewChild('gridRef') grid: jqxGridComponent;

  teamsDataSource =
  {
        datatype: 'json',
        datafields: [
            // { name: 'Id', type: 'int' },
            {name: 'id'},
            { name: 'name'}
        ],
        localdata: undefined
  };

  membersDataSource = {
    datatype: 'json',
    datafields: [
        {name: 'id'},
        {name: 'name'},
        {name: 'dateStart'},
        {name: 'dateEnd'}
    ],
    localdata: undefined
  }

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
    source: undefined
    };

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
