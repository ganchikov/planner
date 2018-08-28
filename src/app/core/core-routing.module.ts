import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {
  CallbackComponent,
  LoginComponent,
  LogoutComponent,
  PageNotFoundComponent,
  NotAuthorizedComponent,
  LandingComponent
} from '@app/core/components';

const appRoutes: Routes = [
  {path: '', component: LandingComponent},
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
export class CoreRoutingModule { }
