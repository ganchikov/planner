import { Component, OnInit, OnChanges, SimpleChanges, ElementRef, ViewChild, Input } from '@angular/core';
import 'dhtmlx-gantt';
import { TeamGanttDataService } from '../team-gantt-data.service';

export enum ScaleMode {
  Day = 0,
  Week = 1,
  Month = 2
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
    }`],
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

  ngOnInit() {
    gantt.init(this.ganttContainer.nativeElement, this.rangeDates[0], this.rangeDates[1]);
    this._isInitialized = true;
    this.configureChart();
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
    this.setScaleMode(ScaleMode.Day);
  }

  weekScaleTemplate(date: Date) {
    const dateToStr = gantt.date.date_to_str('%d %M');
    const endDate = gantt.date.add(gantt.date.add(date, 1, 'week'), -1, 'day');
    return dateToStr(date) + ' - ' + dateToStr(endDate);
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
