import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TeamGanttViewComponent} from './team-gantt-view/team-gantt-view.component';
import { ScopeGuardService as ScopeGuard} from '../common/services/scope-guard.service';
import {Scopes} from '../common/constants/scopes';


const appRoutes: Routes = [
  {path: 'team-gantt',
    component: TeamGanttViewComponent,
    canActivate: [ScopeGuard],
    data: {
      expectedScopes: [
      ]
    }
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(appRoutes)
  ],
  declarations: []
})
export class TeamGanttRoutingModule { }
