import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';

import {jqxGridComponent} from 'jqwidgets-scripts/jqwidgets-ts/angular_jqxgrid';

import { AppComponent } from './app.component';
import { MainViewComponent } from './team-view/team-view.component';
import {TeamDataService} from './services/team-data.service';
import {LoggerService} from './services/logger.service';


@NgModule({
  declarations: [
    AppComponent,
    jqxGridComponent,
    MainViewComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [TeamDataService, LoggerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
