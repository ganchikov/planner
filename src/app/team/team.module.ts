import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

import {TreeNode} from 'primeng/api';

import {TeamDataService} from './team-data.service';
import {TeamGanttDataService} from './team-gantt-data.service';
import { LoggerService } from '../services/logger.service';


import {PrimeControlsModule} from '../primecontrols.module';
import { TeamRoutingModule } from './team-routing.module';
import {TeamViewComponent} from './team-view/team-view.component';
import {TeamTreeViewComponent} from './team-tree-view/team-tree-view.component';
import { TeamDetailsComponent } from './team-details/team-detals.component';
import { TeamGanttComponent } from './team-gantt/team-gantt.component';
import { TeamGanttViewComponent } from './team-gantt-view/team-gantt-view.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    FormsModule,
    PrimeControlsModule,
    TeamRoutingModule
  ],
  declarations: [
    TeamViewComponent,
    TeamTreeViewComponent,
    TeamDetailsComponent,
    TeamGanttComponent,
    TeamGanttViewComponent
  ],
  providers: [
    TeamDataService, TeamGanttDataService, LoggerService
  ]
})
export class TeamModule { }
