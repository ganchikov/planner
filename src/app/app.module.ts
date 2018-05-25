import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import {HTTP_INTERCEPTORS} from '@angular/common/http';

import {MenuItem} from 'primeng/api';

import { AppComponent } from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {TeamModule} from './team/team.module';
import { TeamGanttModule } from './team-gantt/team-gantt.module';
import {PrimeControlsModule} from './common/primecontrols.module';
import {AppCommonModule} from './common/app-common.module';
import { RequestInterceptor } from './common/interceptors/request.interceptor';



@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    PrimeControlsModule,
    TeamModule,
    TeamGanttModule,
    AppRoutingModule,
    AppCommonModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: RequestInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
