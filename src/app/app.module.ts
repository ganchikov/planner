import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import {HTTP_INTERCEPTORS} from '@angular/common/http';

import {MenuItem} from 'primeng/api';

import {TeamModule} from './team/team.module';
import {AppRoutingModule} from './app-routing.module';
import {PrimeControlsModule} from './primecontrols.module';
import { AppComponent } from './app.component';
import {LoggerService} from './shared/services/logger.service';
import { PageNotFoundComponent } from './shared/components/pagenotfound/pagenotfound.component';
import {LoginComponent} from './shared/components/login/login.component';
import { AuthService } from './shared/services/auth.service';
import { CallbackComponent } from './shared/components/callback/callback.component';
import { RequestInterceptor } from './request.interceptor';
import { TeamGanttModule } from './team-gantt/team-gantt.module';


@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    LoginComponent,
    CallbackComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    PrimeControlsModule,
    TeamModule,
    TeamGanttModule,
    AppRoutingModule
  ],
  providers: [
    LoggerService,
    AuthService,
    {provide: HTTP_INTERCEPTORS, useClass: RequestInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
