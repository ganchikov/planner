import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { CommonModule } from '@angular/common';

import {PageNotFoundComponent} from './shared/components/pagenotfound/pagenotfound.component';
import {LoginComponent} from './shared/components/login/login.component';
import {CallbackComponent} from './shared/components/callback/callback.component';

const appRoutes: Routes = [
  {path: '', redirectTo: '/team', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'callback', component: CallbackComponent},
  {path: '**', component: PageNotFoundComponent},
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
