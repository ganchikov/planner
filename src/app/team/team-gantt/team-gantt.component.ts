import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import 'dhtmlx-gantt';
import { TeamGanttDataService } from '../team-gantt-data.service';

@Component({
  selector: 'app-team-gantt',
  templateUrl: './team-gantt.component.html',
  styleUrls: ['./team-gantt.component.css'],
  styles: [
    `:host {
      display: block;
      height: 600px;
      position: relative;
      width: 100%
    }`],
    template: `<div #gantt_here style='width: 100%; height: 100%;'></div>`
})
export class TeamGanttComponent implements OnInit {

  @ViewChild('gantt_here') ganttContainer: ElementRef;

  constructor(private ganttData: TeamGanttDataService) { }

  ngOnInit() {
    gantt.init(this.ganttContainer.nativeElement);
    this.ganttData.getGanttTeamData(items => {
      gantt.parse({tasks: items, links: []});
    });

  }

}
