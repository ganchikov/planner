import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { CommonModule } from '@angular/common';

import {PrimeTestComponent} from './prime-test/prime-test.component';
import {PageNotFoundComponent} from './pagenotfound/pagenotfound.component';
import {LoginComponent} from './login/login.component';

const appRoutes: Routes = [
  {path: 'prime-test', component: PrimeTestComponent},
  {path: '', redirectTo: '/team', pathMatch: 'full'},
  {path: 'login', component: LoginComponent}
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
