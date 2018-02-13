import { Component, OnInit } from '@angular/core';
import {jqxGridComponent} from 'jqwidgets-scripts/jqwidgets-ts/angular_jqxgrid';
import { TeamDataService } from '../services/team-data.service';

@Component({
  selector: 'app-team-view',
  templateUrl: './team-view.component.html',
  styleUrls: ['./team-view.component.css']
})
export class MainViewComponent implements OnInit {

  source =
    {
        datatype: 'xml',
        datafields: [
            { name: 'ProductName', type: 'string' },
            { name: 'QuantityPerUnit', type: 'int' },
            { name: 'UnitPrice', type: 'float' },
            { name: 'UnitsInStock', type: 'float' },
            { name: 'Discontinued', type: 'bool' }
        ],
        root: 'Products',
        record: 'Product',
        id: 'ProductID',
        url: '../sampledata/products.xml'
    };

  dataAdapter = new jqx.dataAdapter(this.source);

  columns: any[] =
  [
    {
        text: 'Product Name', columngroup: 'ProductDetails',
        datafield: 'ProductName', width: 250
    },
    {
        text: 'Quantity per Unit', columngroup: 'ProductDetails',
        datafield: 'QuantityPerUnit', cellsalign: 'right', align: 'right', width: 200
    },
    {
        text: 'Unit Price', columngroup: 'ProductDetails',
        datafield: 'UnitPrice', align: 'right', cellsalign: 'right', cellsformat: 'c2', width: 200
    },
    {
        text: 'Units In Stock', datafield: 'UnitsInStock', cellsalign: 'right', cellsrenderer: this.cellsrenderer, width: 100
    },
    {
        text: 'Discontinued', columntype: 'checkbox', datafield: 'Discontinued'
    }
  ];

  columngroups: any[] = [ { text: 'Product Details', align: 'center', name: 'ProductDetails' } ];

  cellsrenderer (row, columnfield, value, defaulthtml, columnproperties, rowdata) {
        if (value < 20) {
            return '<span style="margin: 4px; float: ' + columnproperties.cellsalign + '; color: #ff0000;">' + value + '</span>';
        } else {
            return '<span style="margin: 4px; float: ' + columnproperties.cellsalign + '; color: #008000;">' + value + '</span>';
        }
    }

  constructor(teamService: TeamDataService) {
   }

  ngOnInit() {
  }

}
