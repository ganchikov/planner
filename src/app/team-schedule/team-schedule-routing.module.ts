import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { ScopeGuardService as ScopeGuard} from '@app/core/services';
import {Scopes} from '@app/common/constants/scopes';
import { TeamScheduleViewComponent } from '@app/team-schedule/team-schedule-view/team-schedule-view.component';


const appRoutes: Routes = [
  {path: 'team-schedule',
    component: TeamScheduleViewComponent,
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
export class TeamScheduleRoutingModule { }
