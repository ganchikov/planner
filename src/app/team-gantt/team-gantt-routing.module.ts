import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TeamGanttViewComponent} from '@app/team-gantt/team-gantt-view/team-gantt-view.component';
import { ScopeGuardService as ScopeGuard} from '@app/core/services';
import {Scopes} from '@app/common/constants/scopes';


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
