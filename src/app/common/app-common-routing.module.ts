import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {CallbackComponent} from './components/callback/callback.component';
import {LoginComponent} from './components/login/login.component';
import {LogoutComponent} from './components/logout/logout.component';
import {PageNotFoundComponent} from './components/pagenotfound/pagenotfound.component';


const appRoutes: Routes = [
  {path: 'callback', component: CallbackComponent},
  {path: 'login', component: LoginComponent},
  {path: 'logout', component: LogoutComponent},
  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [
    RouterModule.forChild(appRoutes)
  ],
  declarations: []
})
export class CommonRoutingModule { }
