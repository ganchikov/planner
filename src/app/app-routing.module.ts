import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { CommonModule } from '@angular/common';

import {PrimeTestComponent} from './prime-test/prime-test.component';
import {PageNotFoundComponent} from './pagenotfound/pagenotfound.component';

const appRoutes: Routes = [
  {path: 'prime-test', component: PrimeTestComponent},
  {path: '', redirectTo: '/team', pathMatch: 'full'},
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
