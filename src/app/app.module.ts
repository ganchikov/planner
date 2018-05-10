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
import {LoggerService} from './services/logger.service';
import { PrimeTestComponent } from './prime-test/prime-test.component';
import { PageNotFoundComponent } from './pagenotfound/pagenotfound.component';
import {LoginComponent} from './login/login.component';
import { AuthService } from './services/auth.service';
import { CallbackComponent } from './callback/callback.component';
import { RequestInterceptor } from './request.interceptor';


@NgModule({
  declarations: [
    AppComponent,
    PrimeTestComponent,
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
