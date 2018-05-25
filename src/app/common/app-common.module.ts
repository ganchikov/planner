import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

import { CommonRoutingModule } from './app-common-routing.module';
import {CallbackComponent} from './components/callback/callback.component';
import {LoginComponent} from './components/login/login.component';
import {LogoutComponent} from './components/logout/logout.component';
import {PageNotFoundComponent} from './components/pagenotfound/pagenotfound.component';
import { PrimeControlsModule } from './primecontrols.module';
import {AuthService} from './services/auth.service';
import {Logger} from './services/logger.service';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    PrimeControlsModule,
    CommonRoutingModule
  ],
  declarations: [
    CallbackComponent,
    LoginComponent,
    LogoutComponent,
    PageNotFoundComponent
  ],
  providers: [
    AuthService,
    Logger
  ]
})
export class AppCommonModule { }
