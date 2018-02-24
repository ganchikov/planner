import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

import {TreeNode} from 'primeng/api';

import {PrimeControlsModule} from '../primecontrols.module';
import { TeamRoutingModule } from './team-routing.module';
import {TeamViewComponent} from './team-view/team-view.component';
import {TeamTreeViewComponent} from './team-tree-view/team-tree-view.component';
import { TeamDetailsComponent } from './team-details/team-detals.component';
import {TeamDataService} from './team-data.service';
import { LoggerService } from '../services/logger.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    FormsModule,
    PrimeControlsModule,
    TeamRoutingModule
  ],
  declarations: [
    TeamViewComponent,
    TeamTreeViewComponent,
    TeamDetailsComponent
  ],
  providers: [
    TeamDataService, LoggerService
  ]
})
export class TeamModule { }
