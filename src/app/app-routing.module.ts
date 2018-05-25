import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { CommonModule } from '@angular/common';

const appRoutes: Routes = [
  {path: '', redirectTo: '/team', pathMatch: 'full'}
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
