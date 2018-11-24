import { TeamsApiService } from '@app/backend-api';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

import {TeamDataService} from './team-data.service';

import { TeamRoutingModule } from './team-routing.module';
import {TeamViewComponent} from './team-view/team-view.component';
import {TeamTreeViewComponent} from './team-tree-view/team-tree-view.component';
import { TeamDetailsComponent } from './team-details/team-detals.component';
import { PrimeControlsModule } from '@app/core/primecontrols.module';
import { TeamMenuComponent } from './team-menu/team-menu.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    PrimeControlsModule,
    TeamRoutingModule
  ],
  declarations: [
    TeamViewComponent,
    TeamTreeViewComponent,
    TeamDetailsComponent,
    TeamMenuComponent,
  ],
  providers: [
    TeamsApiService,
    TeamDataService
  ]
})
export class TeamModule { }
