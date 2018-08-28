import { Component, OnInit } from '@angular/core';
import {AuthService} from '@app/core/services';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.loginAuth0();
  }

}
