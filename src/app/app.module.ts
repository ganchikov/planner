import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import {MenuItem} from 'primeng/api';


import {TeamModule} from './team/team.module';
import {AppRoutingModule} from './app-routing.module';
import {PrimeControlsModule} from './primecontrols.module';
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
    BrowserAnimationsModule,
    PrimeControlsModule,
    TeamModule,
    AppRoutingModule
  ],
  providers: [LoggerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
