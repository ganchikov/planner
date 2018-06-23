import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

import {TeamGanttDataService} from './team-gantt-data.service';
import { TeamGanttRoutingModule } from './team-gantt-routing.module';
import { TeamGanttComponent } from './team-gantt/team-gantt.component';
import { TeamGanttViewComponent } from './team-gantt-view/team-gantt-view.component';
import { PrimeControlsModule } from '../common/primecontrols.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    PrimeControlsModule,
    TeamGanttRoutingModule
  ],
  declarations: [
    TeamGanttComponent,
    TeamGanttViewComponent
  ],
  providers: [
    TeamGanttDataService
  ]
})
export class TeamGanttModule { }
