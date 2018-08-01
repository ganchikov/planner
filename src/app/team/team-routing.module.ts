import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {TeamViewComponent} from './team-view/team-view.component';
import {TeamTreeViewComponent} from './team-tree-view/team-tree-view.component';
import {TeamDetailsComponent} from './team-details/team-detals.component';
import {ScopeGuardService as ScopeGuard} from '../common/services/scope-guard.service';
import {Scopes} from '../common/constants/scopes';

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
