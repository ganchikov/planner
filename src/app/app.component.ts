import { Component, OnInit } from '@angular/core';
import {MenubarModule} from 'primeng/menubar';
import {MenuItem} from 'primeng/api';
import { RouterLink } from '@angular/router/src/directives/router_link';
import { AuthService } from './common/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  title = 'Planner';
  menuitems: MenuItem[];
  isAuthenticated = false;

  constructor(private authService: AuthService) {
    this.authService.onAuthenticatedStateChange.subscribe((isAutenticated) => {
      this.isAuthenticated = isAutenticated;
    });
    authService.handleAuth0();
  }

  public logout() {
    this.authService.logout();
    this.isAuthenticated = false;
  }

  public login() {
    this.authService.loginAuth0();
    this.isAuthenticated = true;
  }

  ngOnInit() {
    this.menuitems = [
      {
        label: 'Teams',
        icon: 'fa-users',
        routerLink: ['/team']
      },
      {
        label: 'Time',
        icon: 'fa-calendar',
        routerLink: ['/team-gantt']
      },
      {
        label: 'Tasks',
        icon: 'fa-tasks',
        routerLink: ['/prime-test']
      }
    ];

  }
}
