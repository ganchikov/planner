import { Component, OnInit, OnChanges, SimpleChanges, ElementRef, ViewChild, Input } from '@angular/core';
import 'dhtmlx-gantt';
import {} from '@types/dhtmlxgantt';
import * as moment from 'moment';
import { TeamGanttDataService} from '../team-gantt-data.service';
import {TeamGanttItem} from '../../common/ganttitem';
import { Team, ModelType } from '../../../../common/models';

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

let thisComponentRef: TeamGanttComponent;

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

  constructor(private ganttData: TeamGanttDataService) {
    thisComponentRef = this;
  }

  static renderComplexTask(task: TeamGanttItem): string {
    if (!task.is_complex) {return ''; }
    const absences: TeamGanttItem[] = task.GetValue('absences') as TeamGanttItem[];
    const durations: Duration[] = [];
    let min_date: Date = absences[0].start_date;
    let max_date: Date = absences[0].end_date;


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
      duration.offset =  duration.offset * 100 / total_duration;
      duration.duration = duration.duration * 100 / total_duration;
      taskHTML += `<div class='gantt_task_line' style='left:${duration.offset}%; ` +
                        `width:${duration.duration}%; height: 15px; margin-top: 7.5px;'></div>`;
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

  configureChart() {
    gantt.config['layout'] = {
      css: 'gantt_container',
      rows: [
        {
          cols: [
            {
              view: 'grid',
              scrollY: 'scrollVer',
              scrollable: true
            },
            { resizer: true, width: 1 },
            {
              view: 'timeline',
              scrollY: 'scrollVer',
              scrollX: 'scrollHor',
              scrollable: true
            },
            {
              view: 'scrollbar',
              id: 'scrollVer'
            }
          ]
        },
        {view: 'scrollbar', id: 'scrollHor', height: 20}
      ]
    };
    gantt.config.columns = [
      {name: 'text', label: 'Item', tree: true, width: 200},
      {name: 'start_date', label: 'From', width: 115},
      {name: 'end_date', label: 'To', width: 115},
      {name: 'confirmed', label: 'Confirmed',
        template: function(obj) {return obj.confirmed === undefined ? '' : obj.confirmed; }
      },
      {name: 'add', label: '', width: 44}
    ];
    gantt.config.lightbox.sections = [
      {name: 'absence_type', height: 22, map_to: 'absence_type', type: 'select', options: [
        {key: 'vacation', label: 'vacation'},
        {key: 'day off', label: 'day off'},
        {key: 'sick leave', label: 'sick leave'},
      ]},
      {name: 'description', height: 38, map_to: 'text', type: 'textarea', focus: true},
      {name: 'time',        height: 38, map_to: 'auto', type: 'time'}
    ];
    gantt.locale.labels['section_absence_type'] = 'Absence Type';

    gantt.config.grid_resize = true;
    gantt.config.grid_width = 400;
    // gantt.config.min_grid_column_width = 100;
    gantt.config.keep_grid_width = false;
    gantt.config.min_column_width = 50;
    gantt.config.show_unscheduled = true;
    gantt.config.scroll_on_click = true;
    // gantt.config.readonly = true;
    gantt.templates.task_class = this.memberTaskClassTemplate;
    gantt.templates.task_text = this.memberTaskTextTemplate;
    gantt.templates.grid_row_class = this.interactiveTaskClassTemplate;
    gantt.attachEvent('onTaskLoading', this.onTaskLoading);
    // gantt.attachEvent('onTaskCreated', this.onTaskCreated);
    gantt.attachEvent('onTaskClick', this.onTaskClick);
    gantt.attachEvent('onTaskDblClick', this.onTaskDblClick);
    gantt.attachEvent('onLightboxSave', this.onLightboxSave);
    gantt.attachEvent('onAfterTaskAdd', this.onAfterTaskAdd);
    gantt.attachEvent('onAfterTaskUpdate', this.onAfterTaskUpdate);

    this.setScaleMode(ScaleMode.Day);
  }

  onTaskLoading(task: TeamGanttItem) {

    if (task.model_type === ModelType.absence) {
      task['editable'] = true;
    } else {
      task['editable'] = false;
    }
    return true;
  }

  // onTaskCreated(task: TeamGanttItem) {
  //   if (task.hasOwnProperty('parent')) {
  //   const parent_item: TeamGanttItem = gantt.getTask(task['parent']);
  //     if (parent_item.is_complex) {
  //       return true;
  //     } else {
  //       return false;
  //     }
  //   } else {
  //     return true;
  //   }
  // }

  onTaskClick(id: string, e: Event) {
    if (e.srcElement.className === 'gantt_add') {
      const item: TeamGanttItem = gantt.getTask(id);
      if (item && item.model_type === ModelType.person) {
        gantt.createTask({absence_type: 'vacation',
                                        text: 'vacation for ' + item.text}, item.id.toString());
      }
    } else {
      return true;
    }
  }

  onTaskDblClick(id: string, e: Event) {
    const item: TeamGanttItem = gantt.getTask(id);
    if (item.model_type === ModelType.absence) {
      return true;
    } else {
      return false;
    }
  }

  onLightboxSave(id: string, item: TeamGanttItem, is_new: boolean) {
    // const taskObj = gantt.getTask(id);
    // const ganttItem: TeamGanttItem = item;
    // const parentGanttItem: TeamGanttItem = gantt.getTask(gantt.getParent(id));
    // const parentTeamGanttItem: TeamGanttItem = gantt.getTask(parentGanttItem.parent_id.toString()) as TeamGanttItem;
    // if (is_new) {
    //   thisComponentRef.ganttData.insertAbsence(ganttItem, parentGanttItem, (insertedItem, error) => {
    //     if (error) {
    //       gantt.message({type: 'error', text: error});
    //     } else {
    //       gantt.deleteTask(id);
    //       gantt.createTask(insertedItem, parentGanttItem.id.toString());
    //       gantt.updateTask(parentTeamGanttItem.id.toString());
    //       gantt.hideLightbox();
    //       gantt.refreshData();
    //     }
    //   });
    // } else {
    //   thisComponentRef.ganttData.updateAbsence(ganttItem, (error) => {
    //     if (error) {
    //       gantt.message({type: 'error', text: error});
    //     } else {
    //       gantt.updateTask(ganttItem.id.toString());
    //       gantt.updateTask(parentTeamGanttItem.id.toString());
    //       gantt.hideLightbox();
    //       // gantt.refreshTask(ganttItem.id);
    //       gantt.render();
    //     }
    //   });
    // }
    return true;
  }

  onAfterTaskAdd(id: string, newTask: Object) {
    const newGanttItem: TeamGanttItem = new TeamGanttItem(newTask);
    newGanttItem.model_type = ModelType.absence;
    const parentGanttItem: TeamGanttItem = gantt.getTask(gantt.getParent(id));
    thisComponentRef.ganttData.insertAbsence(newGanttItem, parentGanttItem, (insertedItem, error) => {
      if (error) {
        gantt.message({type: 'error', text: error});
      } else {
        gantt.deleteTask(id);
        gantt.addTask(insertedItem, parentGanttItem.id.toString());
        gantt.refreshData();
        return false;
      }
    });
  }

  onAfterTaskUpdate(id: string, updatedTask: TeamGanttItem) {
    const personGanttItem: TeamGanttItem = gantt.getTask(gantt.getParent(id));
    thisComponentRef.ganttData.updateAbsence(updatedTask, error => {
      if (error) {
        gantt.message({type: 'error', text: error});
      } else {
        // gantt.updateTask(ganttItem.id.toString());
        gantt.updateTask(personGanttItem.id.toString());
        // gantt.hideLightbox();
        // gantt.refreshTask(ganttItem.id);
        gantt.render();
      }
    });
  }


  memberTaskClassTemplate(start: Date, end: Date, task: TeamGanttItem): string {
    if (task.model_type === ModelType.person) {
      return 'complex_gantt_bar';
    }
  }

  memberTaskTextTemplate(start: Date, end: Date, task: TeamGanttItem): string {
    if (task.model_type === ModelType.person) {
      const str = TeamGanttComponent.renderComplexTask(task);
      return str;
    } else {
      return '';
    }
  }

  interactiveTaskClassTemplate(start: Date, end: Date, task: TeamGanttItem): string {
    if (task.model_type === ModelType.person) {
      return '';
    } else {
      return 'not_interactive_task';
    }
  }

  weekScaleTemplate(date: Date) {
    const weekNum = moment(date).isoWeek();
    return 'WW' + weekNum;
  }

}
