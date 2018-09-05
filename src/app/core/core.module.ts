import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HTTP_INTERCEPTORS} from '@angular/common/http';

import {
  AppVerService,
  AuthGuardService,
  AuthService,
  Logger,
  ScopeGuardService,
  BaseApiService,
} from '@app/core/services';

import {
  CallbackComponent,
  LandingComponent,
  LoginComponent,
  LogoutComponent,
  MasterPageModule,
  NotAuthorizedComponent,
  PageNotFoundComponent } from './components';
import { RequestInterceptor } from './interceptors/request.interceptor';
import { CoreRoutingModule } from './core-routing.module';
import { PrimeControlsModule } from './primecontrols.module';

@NgModule({
  imports: [
    CommonModule,
    PrimeControlsModule,
    CoreRoutingModule
  ],
  declarations: [
    CallbackComponent,
    LandingComponent,
    LoginComponent,
    LogoutComponent,
    NotAuthorizedComponent,
    PageNotFoundComponent
  ],
  providers: [
    AppVerService,
    AuthGuardService,
    AuthService,
    Logger,
    ScopeGuardService,
    BaseApiService,
    {provide: HTTP_INTERCEPTORS, useClass: RequestInterceptor, multi: true}
  ],
  exports: [
    MasterPageModule
  ]
})
export class CoreModule { }
