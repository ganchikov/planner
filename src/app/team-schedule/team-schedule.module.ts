import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { PrimeControlsModule } from '@app/core/primecontrols.module';
import { TeamScheduleComponent } from '@app/team-schedule/team-schedule/team-schedule.component';
import { TeamScheduleViewComponent } from '@app/team-schedule/team-schedule-view/team-schedule-view.component';
import { TeamScheduleDataService } from '@app/team-schedule/team-schedule-data.service';
import { TeamScheduleRoutingModule } from '@app/team-schedule/team-schedule-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    PrimeControlsModule,
    TeamScheduleRoutingModule
  ],
  declarations: [
    TeamScheduleComponent,
    TeamScheduleViewComponent
  ],
  providers: [
    TeamScheduleDataService
  ]
})
export class TeamScheduleModule { }
