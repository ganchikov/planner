import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router/src/directives/router_link';
import { AuthService } from '@app/core/services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  title = 'Planner';

  constructor(private authService: AuthService) {
    authService.handleAuth0();
  }

  ngOnInit() {
  }
}
