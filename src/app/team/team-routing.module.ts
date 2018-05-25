import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {TeamViewComponent} from './team-view/team-view.component';
import {TeamTreeViewComponent} from './team-tree-view/team-tree-view.component';
import {TeamDetailsComponent} from './team-details/team-detals.component';


const appRoutes: Routes = [
  {path: 'team', component: TeamViewComponent},
  {path: 'team-tree', component: TeamTreeViewComponent},
  {path: 'team/:id', component: TeamDetailsComponent}
];

@NgModule({
  imports: [
    RouterModule.forChild(appRoutes)
  ],
  declarations: []
})
export class TeamRoutingModule { }
