import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {ButtonModule} from 'primeng/button';
import {InputTextModule} from 'primeng/inputtext';
import {MenubarModule} from 'primeng/menubar';
import {MenuItem} from 'primeng/api';


import {TeamModule} from './team/team.module';
import {AppRoutingModule} from './app-routing.module';
import { AppComponent } from './app.component';
import {LoggerService} from './services/logger.service';
import { PrimeTestComponent } from './prime-test/prime-test.component';
import { PageNotFoundComponent } from './pagenotfound/pagenotfound.component';


@NgModule({
  declarations: [
    AppComponent,
    PrimeTestComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    ButtonModule,
    InputTextModule,
    MenubarModule,
    TeamModule,
    AppRoutingModule
  ],
  providers: [LoggerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
