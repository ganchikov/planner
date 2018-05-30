import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {CallbackComponent} from './components/callback/callback.component';
import {LoginComponent} from './components/login/login.component';
import {LogoutComponent} from './components/logout/logout.component';
import {PageNotFoundComponent} from './components/pagenotfound/pagenotfound.component';
import { NotAuthorizedComponent } from './components/not-authorized/not-authorized.component';
import { LandingComponent } from './components/landing/landing.component';


const appRoutes: Routes = [
  {path '', component: LandingComponent}
  {path: 'callback', component: CallbackComponent},
  {path: 'login', component: LoginComponent},
  {path: 'logout', component: LogoutComponent},
  {path: '401', component: NotAuthorizedComponent},
  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [
    RouterModule.forChild(appRoutes)
  ],
  declarations: []
})
export class CommonRoutingModule { }
