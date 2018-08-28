import { Component, OnInit, OnChanges, SimpleChanges, ElementRef, ViewChild, Input, Renderer2, Inject} from '@angular/core';
import {DOCUMENT} from '@angular/platform-browser';

import 'dhtmlx-gantt';
import * as moment from 'moment';

import { TeamScheduleDataService} from '@app/team-schedule/team-schedule-data.service';
import {TeamScheduleItem} from '@app/team-schedule/models/team-schedule-item';
import {Team} from '@app/common/models';
import {ModelType} from '@app/common/enums/model-type';
import {AbsenceType} from '@app/common/enums/absence-type';
import { AuthService } from '@app/core/services';
import { Scopes } from '@app/common/constants/scopes';

@Component({
  selector: 'app-team-schedule',
  templateUrl: './team-schedule.component.html',
  styleUrls: ['./team-schedule.component.css']
})
export class TeamScheduleComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
