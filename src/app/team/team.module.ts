import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {ButtonModule} from 'primeng/button';
import {InputTextModule} from 'primeng/inputtext';
import {ListboxModule} from 'primeng/listbox';
import {TableModule} from 'primeng/table';

import {TeamViewComponent} from './team-view/team-view.component';
import {TeamDataService} from './team-data.service';
import { LoggerService } from '../services/logger.service';
import { TeamRoutingModule } from './team-routing.module';
import { TeamDetailsComponent } from './team-details/team-detals.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    FormsModule,
    ButtonModule,
    InputTextModule,
    ListboxModule,
    TableModule,
    TeamRoutingModule
  ],
  declarations: [
    TeamViewComponent,
    TeamDetailsComponent
  ],
  providers: [
    TeamDataService, LoggerService
  ]
})
export class TeamModule { }
