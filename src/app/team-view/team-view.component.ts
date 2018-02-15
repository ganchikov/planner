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

  // teamData: Team[] = [];
  // data: Object[] = [{id: 1, name: 'Alpha'}, {id: 2, name: 'Beta'}, {id: 3, name: 'Gamma'}];

  source =
  {
        datatype: 'json',
        datafields: [
            // { name: 'Id', type: 'int' },
            {name: 'id'},
            { name: 'name'} // ,
            // { name: 'HasMembers', type: 'bool' },
        ],
        localdata: undefined
        // localdata: this.teamData
  };

  columns: any[] =
  [
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
  ];

  columngroups: any[] = [ { text: 'Team Details', align: 'center', name: 'TeamDetails' } ];

  settings = {
    width: 850,
    editable: true,
    columnsresize: true,
    selectionmode: 'multiplecellsadvanced',
    columns: this.columns,
    columngroups: this.columngroups,
    // source: new jqx.dataAdapter(this.source)
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
       
        this.source.localdata = teams;
        this.settings.source = new jqx.dataAdapter(this.source, {
             beforeLoadComplete: function(loadedRecords: any[], originalRecords: any[]) {
                 return loadedRecords;
             }
        });
        // this.grid.createComponent(this.settings);
        this.grid.setOptions(this.settings);
        //this.grid.refreshdata();
    }, error => {

    }, () => {

    });
  }

  
  ngAfterViewInit(): void {
    // const that = this;
    this.grid.createComponent(this.settings);
  }


}
