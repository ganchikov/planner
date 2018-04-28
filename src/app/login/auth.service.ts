import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { AppConfig } from '../app.config';

@Injectable()
export class AuthService {

  private url: string = AppConfig.settings.apiServer.url;

  constructor(private http: HttpClient) {
  }

  login(email: string, password: string ) {
      return this.http.post (this.url.concat('authorize'), {email, password});
          // this is just the HTTP call,
          // we still need to handle the reception of the token
          // .shareReplay();
  }

}
