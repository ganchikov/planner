import { Component, OnInit } from '@angular/core';
import {MenubarModule} from 'primeng/menubar';
import {MenuItem} from 'primeng/api';
import { RouterLink } from '@angular/router/src/directives/router_link';
import { AuthService } from './services/auth.service';

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

  ngOnInit() {
    this.menuitems = [
      {
        label: 'Teams',
        icon: 'fa-users',
        routerLink: ['/team']
      },
      {
        label: 'Tasks',
        icon: 'fa-tasks',
        routerLink: ['/prime-test']
      },
      {
        label: 'Login',
        icon: 'fa-sign-in',
        command: (event) => {
          this.authService.loginAuth0();
        }
      },
      {
        label: 'Logout',
        icon: 'fa-sign-out',
        command: (event) => {
          this.authService.logout();
        }
      }
    ];

  }
}
