import { Component, OnInit, OnChanges, SimpleChanges, ElementRef, ViewChild, Input, Renderer2, Inject} from '@angular/core';
import {DOCUMENT} from '@angular/platform-browser';
import {} from '@types/dhtmlxgantt';
import 'dhtmlx-gantt';
import * as moment from 'moment';


import {ModelType, AbsenceType} from '@app/common/enums';
import { AuthService } from '@app/core/services';

import {ScaleMode} from '../enums/scale-mode';
import {IDMapper} from '../models/id-mapper';
import {CalendarItem} from '../models/calendar-item';
import { TeamCalendarService } from '../team-calendar.service';

let thisComponentRef: TeamCalendarComponent;

const idMap: Array<IDMapper> = new Array();

@Component({
  selector: 'app-team-calendar',
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
export class TeamCalendarComponent implements OnInit, OnChanges {

  @ViewChild('gantt_here') ganttContainer: ElementRef;

  @Input()
  scaleMode: ScaleMode;

  @Input()
  rangeDates: Date[] = [];

  private isInitialized = false;

  constructor(
    private calendar: TeamCalendarService,
    private renderer: Renderer2,
    private elementRef: ElementRef,
    private auth: AuthService,
    @Inject(DOCUMENT) private document
  ) {
    thisComponentRef = this;
  }

  ngOnInit() {
    this.configureChart();
    gantt.init(this.ganttContainer.nativeElement, this.rangeDates[0], this.rangeDates[1]);
    this.isInitialized = true;


    this.calendar.getTeamCalendar().subscribe(items => {
      gantt.parse({data: items, links: []});
    }, err => {
      gantt.message({type: 'error', text: err});
    });

    const script = this.renderer.createElement('script');
    script['type'] = 'application/javascript';
    script['text'] = this.renderJavaScriptCode();
    this.renderer.appendChild(this.document['body'], script);
  }

  ngOnChanges(changes: SimpleChanges) {
    for (const propName in changes) {
      if (this.isInitialized) {
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

  renderComplexTask(task: CalendarItem): string {
    if (!task.has_absences) {return ''; }
    class Duration {
      constructor(
        public offset: number,
        public duration: number) {}
    }
    const absences: CalendarItem[] = task.GetValue('absences') as CalendarItem[];
    const durations: Duration[] = [];
    let min_date: Date = absences[0].start_date;
    let max_date: Date = absences[0].end_date;

    absences.sort((a, b) => {
      if (a.start_date > b.start_date) {return 1; } else if (a.start_date < b.start_date) {return -1; }
      return 0;
    });
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

  renderJavaScriptCode() {
    return `
      function deleteItem(id) {
        gantt.confirm({text: 'Delete absence?', ok: 'Yes', cancel: 'No', callback: function(result) {
          if (result) { gantt.deleteTask(id);}
        }});
      }
      function insertItem(parentId) {
        const parentItem = gantt.getTask(parentId);
        const newItemText = parentItem.text + ' vacation';
        const startDate = new Date(Date.now());
        const startDateStr = (startDate.getDay()+1) + '-' + (startDate.getMonth()+1) + '-' + startDate.getFullYear();
        gantt.createTask({text: newItemText, start_date: startDateStr, duration: 7},parentId);
      }
    `;
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
    const colHeader = '<div class="gantt_grid_head_cell gantt_grid_head_add" onclick="gantt.createTask()"></div>';
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
      {name: 'buttons', label: colHeader, width: 35, template: this.colContentTemplate}
    ];
    gantt.config.lightbox.sections = [
      {name: 'absence_type', height: 22, map_to: 'absence_type', type: 'select', options: [
        {key: 'vacation', label: 'vacation'},
        {key: 'day off', label: 'day off'},
        {key: 'sick leave', label: 'sick leave'},
      ]},
      {name: 'description', height: 38, map_to: 'text', type: 'textarea', focus: true},
      {name: 'confirmed',   height: 22, map_to: 'confirmed', type: 'select', options: [
        {key: 'true', label: 'yes'},
        {key: 'false', label: 'no'}
      ]},
      {name: 'time',        height: 22, map_to: 'auto', type: 'time'}
    ];
    gantt.locale.labels['section_absence_type'] = 'Absence Type';
    gantt.locale.labels['section_confirmed'] = 'Confirmed';


    gantt.config.grid_resize = true;
    gantt.config.grid_width = 400;
    gantt.config.keep_grid_width = false;
    gantt.config.min_column_width = 50;
    gantt.config.show_unscheduled = true;
    gantt.config.scroll_on_click = true;
    gantt.templates.task_class = this.memberTaskClassTemplate;
    gantt.templates.task_text = this.memberTaskTextTemplate;
    gantt.templates.grid_row_class = this.interactiveTaskClassTemplate;
    gantt.attachEvent('onTaskLoading', this.onTaskLoading);
    gantt.attachEvent('onGridHeaderClick', this.onGridHeaderClick);
    gantt.attachEvent('onTaskClick', this.onTaskClick);
    gantt.attachEvent('onTaskDblClick', this.onTaskDblClick);
    gantt.attachEvent('onAfterTaskAdd', this.onAfterTaskAdd);
    gantt.attachEvent('onAfterTaskUpdate', this.onAfterTaskUpdate);
    gantt.attachEvent('onBeforeTaskDelete', this.onBeforeTaskDelete);
    gantt.attachEvent('onAfterTaskDelete', this.onAfterTaskDelete);

    this.setScaleMode(ScaleMode.Day);

  }

  onTaskLoading(task: CalendarItem) {
    if (task.model_type === ModelType.absence) {
      task['editable'] = true;
    } else {
      task['editable'] = false;
    }
    return true;
  }

  onGridHeaderClick(name: string, e: Event) {
    if (name === 'add') {
      gantt.message('this function is not implemented');
      return false;
    }
  }

  onTaskClick(id: string, e: Event) {
    if (e.srcElement.className === 'gantt_add') {
      const item: CalendarItem = gantt.getTask(id);
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
    const item: CalendarItem = gantt.getTask(id);
    if (item.model_type === ModelType.absence) {
      return true;
    } else {
      return false;
    }
  }

  onAfterTaskAdd(id: string, newTask: Object) {
    const newGanttItem: CalendarItem = new CalendarItem(newTask);
    newTask['model_type'] = newGanttItem.model_type = ModelType.absence;
    const parentGanttItem: CalendarItem = gantt.getTask(gantt.getParent(id));
    newGanttItem.person = parentGanttItem._id;
    thisComponentRef.calendar.insertAbsence(newGanttItem).subscribe(
      insertedItem => {
        const newId = insertedItem.id;
        gantt.changeTaskId(id, newId);
        idMap.push(new IDMapper(id.toString(), newId.toString()));
        // parentGanttItem.absences.push(insertedItem);
        gantt.updateTask(parentGanttItem.id.toString());
        gantt.refreshTask(newId);
      }, err => {
        gantt.message({type: 'error', text: err});
      }
    );
    return true;
  }

  onAfterTaskUpdate(id: string, updatedTask: Object) {
    if (updatedTask['model_type'] !== ModelType.absence) {return true; }
    const itm = idMap.find(map => map.temp_id === id);
    if (itm) {id = itm.perm_id; }
    let updatedGanttTask: CalendarItem;
    if (updatedTask instanceof CalendarItem) {
      updatedGanttTask = updatedTask as CalendarItem;
    } else {
      updatedGanttTask = new CalendarItem(updatedTask);
    }
    const parentGanttItem: CalendarItem = gantt.getTask(gantt.getParent(id));
    thisComponentRef.calendar.updateAbsence(updatedGanttTask).subscribe(
      result => {
        if (parentGanttItem.absences) {
          parentGanttItem.absences.splice(parentGanttItem.absences.findIndex(item => item.id === updatedGanttTask.id),
              1);
          parentGanttItem.absences.push(result);
          gantt.updateTask(parentGanttItem.id.toString());
        }
      }, error => {
        gantt.message({type: 'error', text: error});
      }
    );
  }

  onBeforeTaskDelete(id: string, deletedItem: CalendarItem) {
    const parentGanttItem: CalendarItem = gantt.getTask(gantt.getParent(id));
    parentGanttItem.absences.splice(parentGanttItem.absences.findIndex(item => item.id === deletedItem.id),
    1);
  }

  onAfterTaskDelete(id: string, deletedItem: CalendarItem) {
    if (deletedItem._id) {
      thisComponentRef.calendar.deleteAbsence(deletedItem).subscribe(
        error => {
          gantt.message({type: 'error', text: error});
        }
      );
    }
  }

  // Gantt templates

  memberTaskClassTemplate(start: Date, end: Date, task: CalendarItem): string {
    if (task.model_type === ModelType.person) {
      return 'complex_gantt_bar';
    } else if (task.model_type === ModelType.absence) {
      switch (task.absence_type) {
        case AbsenceType.dayoff:
          return 'dayff_gantt_bar';
        case AbsenceType.sickleave:
          return 'sickleave_gantt_bar';
        case AbsenceType.vacation:
          if (String(task.confirmed) === 'true' || task.confirmed === true) {
            return 'confirmed_vacation_gantt_bar';
          } else {
            return 'unconfirmed_vacation_gantt_bar';
          }
      }
    }
  }

  memberTaskTextTemplate(start: Date, end: Date, task: CalendarItem): string {
    if (task.model_type === ModelType.person) {
      const str = thisComponentRef.renderComplexTask(task);
      return str;
    } else {
      return '';
    }
  }

  interactiveTaskClassTemplate(start: Date, end: Date, task: CalendarItem): string {
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

  colContentTemplate (task: CalendarItem) {
    let css: string;
    switch (task.model_type) {
      case ModelType.team:
        css = '';
        break;
      case ModelType.person:
        css = `<i class="fa gantt_button_grid gantt_grid_add fa-plus fa-lg" onClick="insertItem(${task.id})"></i>`;
        break;
      case ModelType.absence:
        css = `<i id="btn" class="fa gantt_button_grid gantt_grid_delete fa-times fa-lg" onClick="deleteItem(${task.id.toString()})"></i>`;
        break;
      default:
        css = '';
    }
    return css;
  }


}
