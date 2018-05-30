import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router/src/directives/router_link';
import { AuthService } from './common/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  title = 'Planner';
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
  }
}
