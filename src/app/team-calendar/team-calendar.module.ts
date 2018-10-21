import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { PrimeControlsModule } from '@app/core/primecontrols.module';
import { TeamCalendarComponent } from './team-calendar/team-calendar.component';
import { TeamCalendarViewComponent } from './team-calendar-view/team-calendar-view.component';
import { TeamCalendarRoutingModule } from './team-calendar-routing.module';
import { TeamsApiService, AbsencesApiService, TeamsCalendarApiService } from '@app/backend-api';
import { TeamCalendarService } from './team-calendar.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    PrimeControlsModule,
    TeamCalendarRoutingModule
  ],
  providers: [
    AbsencesApiService,
    TeamsCalendarApiService,
    TeamCalendarService
  ],
  declarations: [
    TeamCalendarComponent,
    TeamCalendarViewComponent
  ]
})
export class TeamCalendarModule { }
