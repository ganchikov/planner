import { Component, OnInit, OnChanges, SimpleChanges, ElementRef, ViewChild, Input } from '@angular/core';
import 'dhtmlx-gantt';
import {} from '@types/dhtmlxgantt';
import * as moment from 'moment';
import { TeamGanttDataService} from '../team-gantt-data.service';
import {GanttItem} from '../../common/ganttitem';

export enum ScaleMode {
  Day = 0,
  Week = 1,
  Month = 2
}

class Duration {
  constructor(
    public offset: number,
    public duration: number) {}
}

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
    }
    `],
    template: `<div #gantt_here style='width: 100%; height: 100%;'></div>`
})
export class TeamGanttComponent implements OnInit, OnChanges {

  @ViewChild('gantt_here') ganttContainer: ElementRef;

  @Input()
  scaleMode: ScaleMode;

  @Input()
  rangeDates: Date[];

  private _isInitialized = false;

  constructor(private ganttData: TeamGanttDataService) { }

  static renderComplexTask(task: GanttItem): string {
    if (!task.is_complex) {return ''; }
    const absences: GanttItem[] = task.GetValue('absences') as GanttItem[];
    const durations: Duration[] = [];
    let min_date: Date;
    let max_date: Date;

    for (const absence of absences) {
      if (moment(absence.start_date).isBefore(min_date)) {min_date = absence.start_date; }
      if (moment(absence.end_date).isAfter(max_date)) {max_date = absence.end_date; }
      const offset: number = moment(absence.start_date).diff(moment(min_date), 'days');
      const duration: number = moment(absence.end_date).diff(moment(absence.start_date), 'days');
      durations.push(new Duration(offset, duration));
    }

    const total_duration: number = moment(max_date).diff(moment(min_date), 'days');
    let taskHTML = '';
    for (const duration of durations) {
      duration.offset = Math.round(duration.offset * 100 / total_duration);
      duration.duration = Math.round(duration.duration * 100 / total_duration);
      taskHTML += `<div class='member_row_style' style='left:${duration.offset}%; width:${duration.duration}%;'>`;
    }
    return taskHTML;
  }


  ngOnInit() {
    this.configureChart();
    gantt.init(this.ganttContainer.nativeElement, this.rangeDates[0], this.rangeDates[1]);
    this._isInitialized = true;
    this.ganttData.getGanttTeamData(items => {
      gantt.parse({data: items, links: []});
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    for (const propName in changes) {
      if (this._isInitialized) {
        switch (propName) {
          case 'rangeDates':
            gantt.config.start_date = this.rangeDates[0];
            gantt.config.end_date = this.rangeDates[1];
            gantt.render();
            break;
          case 'scaleMode':
            this.setScaleMode(this.scaleMode);
            gantt.render();
        }
      }
    }
  }

  configureChart() {
    gantt.config.columns = [
      {name: 'text', label: 'Item', tree: true, width: 180},
      {name: 'start_date', label: 'From', width: 110},
      {name: 'end_date', label: 'To', width: 110},
      {name: 'confirmed', label: 'Confirmed',
        template: function(obj) {return obj.confirmed === undefined ? '' : obj.confirmed; }
      }
    ];
    gantt.config.min_column_width = 50;
    gantt.config.show_unscheduled = true;
    gantt.templates.task_row_class = this.memberTaskClassTemplate;
    this.setScaleMode(ScaleMode.Day);
  }

  memberTaskClassTemplate(start: Date, end: Date, task: GanttItem): string {
    if (task.is_complex) {
      const str = TeamGanttComponent.renderComplexTask(task);
      return str;
    } else {
      return '';
    }
  }

  weekScaleTemplate(date: Date) {
    const weekNum = moment(date).isoWeek();
    return 'WW' + weekNum;
  }

  setScaleMode(scaleMode: ScaleMode) {
    switch (scaleMode) {
      case ScaleMode.Day:
        gantt.config.scale_unit = 'day';
        gantt.config.step = 1;
        gantt.config.date_scale = '%d %M';
        gantt.templates.date_scale = null;
        gantt.config.scale_height = 50;
        gantt.config.subscales = [
          {unit: 'week', step: 1, template: this.weekScaleTemplate},
          {unit: 'month', step: 1, date: '%F, %Y'}
        ];
        break;
      case ScaleMode.Week:
        gantt.config.scale_unit = 'week';
        gantt.config.step = 1;
        gantt.templates.date_scale = this.weekScaleTemplate;
        gantt.config.scale_height = 50;
        gantt.config.subscales = [
            {unit: 'month', step: 1, date: '%F, %Y'}
        ];
        break;
      case ScaleMode.Month:
        gantt.config.scale_unit = 'month';
        gantt.config.date_scale = '%F, %Y';
        gantt.templates.date_scale = null;
        gantt.config.scale_height = 50;
        gantt.config.subscales = [];
    }
  }

}
