import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { ScopeGuardService as ScopeGuard} from '@app/core/services';
import {Scopes} from '@app/common/constants/scopes';
import { TeamCalendarViewComponent } from './team-calendar-view/team-calendar-view.component';


const appRoutes: Routes = [
  {path: 'team-calendar',
    component: TeamCalendarViewComponent,
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
export class TeamCalendarRoutingModule { }
