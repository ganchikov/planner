import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { PrimeControlsModule } from '@app/core/primecontrols.module';
import { TeamScheduleComponent } from '@app/team-schedule/team-schedule/team-schedule.component';
import { TeamScheduleViewComponent } from '@app/team-schedule/team-schedule-view/team-schedule-view.component';
import { TeamScheduleRoutingModule } from '@app/team-schedule/team-schedule-routing.module';
import {TeamsApiService, AbsencesApiService} from '@app/backend-api';
import { TeamScheduleService } from './schedule.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    PrimeControlsModule,
    TeamScheduleRoutingModule
  ],
  providers: [
    TeamsApiService,
    AbsencesApiService,
    TeamScheduleService
  ],
  declarations: [
    TeamScheduleComponent,
    TeamScheduleViewComponent
  ]
})
export class TeamScheduleModule { }
