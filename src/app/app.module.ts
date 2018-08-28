import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import {HTTP_INTERCEPTORS} from '@angular/common/http';

import {MenuItem} from 'primeng/api';

import { AppComponent } from '@app/app.component';
import {AppRoutingModule} from '@app/app-routing.module';
import {TeamModule} from '@app/team/team.module';
import { TeamGanttModule } from '@app/team-gantt/team-gantt.module';
import {TeamScheduleModule} from '@app/team-schedule/team-schedule.module';
import {PrimeControlsModule} from '@app/core/primecontrols.module';
import {CoreModule} from '@app/core/core.module';
import { RequestInterceptor } from '@app/core/interceptors/request.interceptor';




@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    PrimeControlsModule,
    TeamModule,
    TeamGanttModule,
    TeamScheduleModule,
    AppRoutingModule,
    CoreModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: RequestInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
