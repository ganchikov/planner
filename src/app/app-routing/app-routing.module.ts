import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { CommonModule } from '@angular/common';

import {MainViewComponent as TeamViewComponent} from '../team-view/team-view.component';
import {PrimeTestComponent} from '../prime-test/prime-test.component';
import {TeamComponent} from '../entities/team/team.component';
import {PageNotFoundComponent} from '../pagenotfound/pagenotfound.component';

const appRoutes: Routes = [
  {path: 'teams', component: TeamViewComponent},
  {path: 'prime-test', component: PrimeTestComponent},
  {path: 'teams/:id', component: TeamComponent},
  {path: '', redirectTo: '/teams', pathMatch: 'full'},
  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes, {enableTracing: true})
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
