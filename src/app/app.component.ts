import { Component, OnInit } from '@angular/core';
import {MenubarModule} from 'primeng/menubar';
import {MenuItem} from 'primeng/api';
import { RouterLink } from '@angular/router/src/directives/router_link';
import { AuthService } from './shared/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  title = 'Planner';
  menuitems: MenuItem[];

  constructor(private authService: AuthService) {
    authService.handleAuth0();
  }

  public logout() {
    this.authService.logout();
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
