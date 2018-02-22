import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {ButtonModule} from 'primeng/button';
import {InputTextModule} from 'primeng/inputtext';
import {ListboxModule} from 'primeng/listbox';
import {TableModule} from 'primeng/table';
import {TreeTableModule} from 'primeng/treetable';
import {TreeNode} from 'primeng/api';

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
    ButtonModule,
    InputTextModule,
    ListboxModule,
    TableModule,
    TreeTableModule,
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
