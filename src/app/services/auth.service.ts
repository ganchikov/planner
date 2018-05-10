import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { AppConfig } from '../app.config';
import {Router} from '@angular/router';
import {Observable} from 'rxjs/rx';
import {filter} from 'rxjs/operators';
import * as auth0 from 'auth0-js';


@Injectable()
export class AuthService {

  private url: string = AppConfig.settings.apiServer.url;

  private auth0 = new auth0.WebAuth({
    clientID: AppConfig.settings.auth0.clientID,
    domain: AppConfig.settings.auth0.domain,
    responseType: 'token id_token',
    audience: AppConfig.settings.auth0.audience,
    redirectUri: AppConfig.settings.auth0.redirectUri,
    scope: 'openid profile read:all write:all'
  });

  constructor(private http: HttpClient, private router: Router) {
  }

  public login(email: string, password: string ) {
    // this is just the HTTP call,
    // we still need to handle the reception of the token
    return this.http.post (this.url.concat('authorize'), {email, password}).shareReplay();
  }

  public loginAuth0() {
    this.auth0.authorize();
  }

  public handleAuth0() {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        window.location.hash = '';
        this.setSession(authResult);
        this.router.navigate(['/']);
      } else if (err) {
        this.router.navigate(['/error']);
        console.log(err);
      }
    });
  }

  private setSession(authResult) {
    // Set the time that the Access Token will expire at
    const expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('expires_at', expiresAt);
  }

  public logout() {
    // Remove tokens and expiry time from localStorage
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    // Go back to the home route
    this.router.navigate(['/logout']);
  }

  public isAuthenticated(): boolean {
    // Check whether the current time is past the
    // Access Token's expiry time
    const expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    return new Date().getTime() < expiresAt;
  }

}
