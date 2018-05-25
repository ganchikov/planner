import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TeamGanttViewComponent} from './team-gantt-view/team-gantt-view.component';


const appRoutes: Routes = [
  {path: 'team-gantt', component: TeamGanttViewComponent},
];

@NgModule({
  imports: [
    RouterModule.forChild(appRoutes)
  ],
  declarations: []
})
export class TeamGanttRoutingModule { }
