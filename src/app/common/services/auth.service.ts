import { Logger } from './logger.service';

import {shareReplay, filter} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

import {Router} from '@angular/router';
import {Observable} from 'rxjs';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import * as auth0 from 'auth0-js';
import { AppConfig } from '../../app.config';
import {Scopes} from '../constants/scopes';

@Injectable()
export class AuthService {

  private url: string = AppConfig.settings.apiServer.url;

  private requestedScopes: string = AppConfig.settings.auth0.scope.concat(' ', Object.entries(Scopes).map(
    entry => Object.entries(entry[1])
  ).map(
      items => items.map(
        item => item[1]
      ).join(' ')
    ).join(' '));

  private auth0 = new auth0.WebAuth({
    clientID: AppConfig.settings.auth0.clientID,
    domain: AppConfig.settings.auth0.domain,
    responseType: AppConfig.settings.auth0.responseType,
    audience: AppConfig.settings.auth0.audience,
    redirectUri: AppConfig.settings.enableHttps ? AppConfig.settings.auth0.redirectHttpsUri : AppConfig.settings.auth0.redirectUri,
    scope: this.requestedScopes
  });

  public userProfile: any;

  private isAuthenticatedEventSource = new BehaviorSubject<boolean>(false);
  public onAuthenticatedStateChange = this.isAuthenticatedEventSource.asObservable();

  constructor(private http: HttpClient, private router: Router, private logger: Logger) {
  }

  private authenticateOnServer() {
    // this is just the HTTP call,
    // we still need to handle the reception of the token
    const id_token = localStorage.getItem('id_token');
    return this.http.post (this.url.concat('authenticate'), {id_token}).pipe(shareReplay());
  }

  public loginAuth0() {
    this.auth0.authorize();
    // send authenticated event to subscribers
    this.isAuthenticatedEventSource.next(true);
  }

  public handleAuth0() {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        window.location.hash = '';
        this.setSession(authResult);
        this.authenticateOnServer().toPromise().then(result => {
          this.router.navigate(['/']);
          this.isAuthenticatedEventSource.next(true);
        }).catch(reason => {
          this.router.navigate(['/error']);
          this.logger.log(err);
        });
      } else if (err) {
        this.router.navigate(['/error']);
        this.logger.log(err);
      }
    });
   }

  private setSession(authResult) {
    // Set the time that the Access Token will expire at
    const expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
    const scopes = authResult.scope || this.requestedScopes;
    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('expires_at', expiresAt);

    localStorage.setItem('scopes', JSON.stringify(scopes));
  }

  public hasScopes(scopes: Array<string>): boolean {
    const grantedScopes = JSON.parse(localStorage.getItem('scopes')).split(' ');
    return scopes.every(itm => grantedScopes.includes(itm));
  }

  public logout() {
    // Remove tokens and expiry time from localStorage
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    // Go back to the home route
    this.router.navigate(['/logout']);
    // send authenticated event to subscribers
    this.isAuthenticatedEventSource.next(false);
  }

  public isAuthenticated(): boolean {
    // Check whether the current time is past the
    // Access Token's expiry time
    const expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    return new Date().getTime() < expiresAt;
  }

  public getProfile(cb): void {
    const accessToken = localStorage.getItem('access_token');
  if (!accessToken) {
    throw new Error('Access Token must exist to fetch profile');
  }

  const self = this;
  this.auth0.client.userInfo(accessToken, (err, profile) => {
    if (profile) {
      self.userProfile = profile;
    }
    cb(err, profile);
  });
  }
}
