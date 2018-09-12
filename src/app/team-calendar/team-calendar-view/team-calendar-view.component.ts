import { Component, OnInit } from '@angular/core';
import {SelectItem} from 'primeng/api';
import {ScaleMode} from '../enums/scale-mode';

@Component({
  selector: 'app-team-calendar-view',
  templateUrl: './team-calendar-view.component.html',
  styleUrls: ['./team-calendar-view.component.css']
})
export class TeamCalendarViewComponent implements OnInit {

  rangeDates: Date[] = [];

  scaleModeOptions: SelectItem[] = [
    {label: 'Day', value: 0},
    {label: 'Week', value: 1},
    {label: 'Month', value: 2}
  ];
  // 0 - day, 1 - week, 2 - month
  scaleMode: ScaleMode = ScaleMode.Day;

  constructor() { }

  ngOnInit() {
    this.rangeDates[0] = new Date((new Date(Date.now())).getFullYear(), 0, 1);
    this.rangeDates[1] = new Date((new Date(Date.now())).getFullYear(), 11, 31);
  }

}
