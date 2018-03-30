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

class IDMapper {
  constructor(public temp_id: string, public perm_id: string) {}
}

let thisComponentRef: TeamGanttComponent;

const idMap: Array<IDMapper> = new Array();


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
        template: function(obj) {
          return obj.confirmed === undefined ? '' : obj.confirmed; 
        }
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
      {name: 'confirmed',   height: 22, map_to: 'confirmed', type: 'select', options: [
        {key: true, label: 'yes'},
        {key: false, label: 'no'}
      ]},
      {name: 'time',        height: 22, map_to: 'auto', type: 'time'}
    ];
    gantt.locale.labels['section_absence_type'] = 'Absence Type';
    gantt.locale.labels['section_confirmed'] = 'Confirmed';


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
    gantt.attachEvent('onGridHeaderClick', this.onGridHeaderClick);
    gantt.attachEvent('onTaskClick', this.onTaskClick);
    gantt.attachEvent('onTaskDblClick', this.onTaskDblClick);
    gantt.attachEvent('onLightboxSave', this.onLightboxSave);
    gantt.attachEvent('onAfterTaskAdd', this.onAfterTaskAdd);
    gantt.attachEvent('onAfterTaskUpdate', this.onAfterTaskUpdate);
    gantt.attachEvent('onTaskIdChange', this.onTaskIdChange);

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

  onGridHeaderClick(name: string, e: Event) {
    if (name === 'add') {
      gantt.message('not implemented');
      return false;
    }
  }

  onTaskClick(id: string, e: Event) {
    if (e.srcElement.className === 'gantt_add') {
      const item: TeamGanttItem = gantt.getTask(id);
      if (item && item.model_type === ModelType.person) {
        return true;
      }
    } else if (e.srcElement.className === 'gantt_tree_icon gantt_close' || e.srcElement.className === 'gantt_tree_icon gantt_open') {
      return true;
    } else if (gantt.getTask(id)['model_type'] === ModelType.absence) {
      return true;
    } else {
      return false;
    }
  }

  onTaskDblClick(id: string, e: Event) {
    if (!id) {return false; }
    const itm = idMap.find(map => map.temp_id === id);
    if (itm) {id = itm.perm_id; }
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
    newTask['model_type'] = newGanttItem.model_type = ModelType.absence;
    const parentGanttItem: TeamGanttItem = gantt.getTask(gantt.getParent(id));
    thisComponentRef.ganttData.insertAbsence(newGanttItem, parentGanttItem, (insertedItem, error) => {
      if (error) {
        gantt.message({type: 'error', text: error});
      } else {
        gantt.changeTaskId(id, insertedItem.id);
        idMap.push(new IDMapper(id.toString(), insertedItem.id.toString()));
        parentGanttItem.absences.push(insertedItem);
        gantt.updateTask(parentGanttItem.id.toString());
        gantt.refreshTask(insertedItem.id);
      }
    });
    return true;
  }

  onTaskIdChange(old_id: string, new_id: string) {
    console.log(`id changed from ${old_id} to ${new_id}`);
    // const item: TeamGanttItem = gantt.getTask(old_id);
    // item.id = Number.parseInt(new_id);
  }

  onAfterTaskUpdate(id: string, updatedTask: Object) {
    if (updatedTask['model_type'] !== ModelType.absence) {return true;}
    const itm = idMap.find(map => map.temp_id === id);
    if (itm) {id = itm.perm_id; }
    let updatedGanttTask: TeamGanttItem;
    if (updatedTask instanceof TeamGanttItem) {
      updatedGanttTask = updatedTask as TeamGanttItem;
    } else {
      updatedGanttTask = new TeamGanttItem(updatedTask);
    }
    const parentGanttItem: TeamGanttItem = gantt.getTask(gantt.getParent(id));
    thisComponentRef.ganttData.updateAbsence(updatedGanttTask, error => {
      if (error) {
        gantt.message({type: 'error', text: error});
      } else {
        if (parentGanttItem.absences) {
            parentGanttItem.absences.splice(parentGanttItem.absences.findIndex(item => item.id === updatedGanttTask.id),
              1);
            parentGanttItem.absences.push(updatedGanttTask);
          gantt.updateTask(parentGanttItem.id.toString());
        }
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
