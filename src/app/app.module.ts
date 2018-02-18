import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

import {jqxGridComponent} from 'jqwidgets-scripts/jqwidgets-ts/angular_jqxgrid';

import {ButtonModule} from 'primeng/button';
import {InputTextModule} from 'primeng/inputtext';
import {ListboxModule} from 'primeng/listbox';

import {AppRoutingModule} from './app-routing/app-routing.module';
import { AppComponent } from './app.component';
import { MainViewComponent } from './team-view/team-view.component';
import {TeamDataService} from './services/team-data.service';
import {LoggerService} from './services/logger.service';
import { PrimeTestComponent } from './prime-test/prime-test.component';
import { TeamComponent } from './entities/team/team.component';
import { PageNotFoundComponent } from './pagenotfound/pagenotfound.component';


@NgModule({
  declarations: [
    AppComponent,
    jqxGridComponent,
    MainViewComponent,
    PrimeTestComponent,
    TeamComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    ButtonModule,
    InputTextModule,
    ListboxModule
  ],
  providers: [TeamDataService, LoggerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
