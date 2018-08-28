import { Component, OnInit } from '@angular/core';
import { AuthService } from '@app/core/services';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {

  profile: any;

  constructor(private auth: AuthService) { }

  ngOnInit() {
    if (!this.auth.isAuthenticated()) {
      this.auth.loginAuth0();
      return;
    }

    if (this.auth.userProfile) {
      this.profile = this.auth.userProfile;
    } else {
      this.auth.getProfile((err, profile) => {
        this.profile = profile;
      });
    }
  }

}
