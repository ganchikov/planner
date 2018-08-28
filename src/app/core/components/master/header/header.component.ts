import { Component, OnInit, Input } from '@angular/core';
import {MenuItem} from 'primeng/api';
import { AuthService } from '@app/core/services';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  public menuitems: MenuItem[];

  constructor(public authService: AuthService) {
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

  public logout() {
    this.authService.logout();
  }

  public login() {
    this.authService.loginAuth0();
  }
}
