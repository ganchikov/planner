import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

import {TeamGanttDataService} from '@app/team-gantt/team-gantt-data.service';
import { TeamGanttRoutingModule } from '@app/team-gantt/team-gantt-routing.module';
import { TeamGanttComponent } from '@app/team-gantt/team-gantt/team-gantt.component';
import { TeamGanttViewComponent } from '@app/team-gantt/team-gantt-view/team-gantt-view.component';
import { PrimeControlsModule } from '@app/core/primecontrols.module';

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
