import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {TeamViewComponent} from '@app/team/team-view/team-view.component';
import {TeamTreeViewComponent} from '@app/team/team-tree-view/team-tree-view.component';
import {TeamDetailsComponent} from '@app/team/team-details/team-detals.component';
import {ScopeGuardService as ScopeGuard} from '@app/core/services';
import {Scopes} from '@app/common/constants/scopes';

const appRoutes: Routes = [
  {path: 'team', component: TeamViewComponent, canActivate: [ScopeGuard], data: {expectedScopes: [
  ]}},
  {path: 'team-tree', component: TeamTreeViewComponent, canActivate: [ScopeGuard], data: {expectedScopes: [
  ]}},
  {path: 'team/:id', component: TeamDetailsComponent, canActivate: [ScopeGuard], data: {expectedScopes: [
  ]}}
];

@NgModule({
  imports: [
    RouterModule.forChild(appRoutes)
  ],
  declarations: []
})
export class TeamRoutingModule { }
