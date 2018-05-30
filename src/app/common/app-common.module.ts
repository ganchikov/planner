import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

import {HTTP_INTERCEPTORS} from '@angular/common/http';

import { CommonRoutingModule } from './app-common-routing.module';
import {CallbackComponent} from './components/callback/callback.component';
import {LoginComponent} from './components/login/login.component';
import {LogoutComponent} from './components/logout/logout.component';
import {PageNotFoundComponent} from './components/pagenotfound/pagenotfound.component';
import { PrimeControlsModule } from './primecontrols.module';
import {MasterPageModule} from './components/master/master-page.module';
import {AuthService} from './services/auth.service';
import {Logger} from './services/logger.service';
import { RequestInterceptor } from './interceptors/request.interceptor';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    PrimeControlsModule,
    CommonRoutingModule,
    MasterPageModule
  ],
  declarations: [
    CallbackComponent,
    LoginComponent,
    LogoutComponent,
    PageNotFoundComponent
  ],
  providers: [
    AuthService,
    Logger,
    {provide: HTTP_INTERCEPTORS, useClass: RequestInterceptor, multi: true}
  ],
  exports: [
    MasterPageModule
  ]
})
export class AppCommonModule { }
