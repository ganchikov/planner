import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import { AuthService } from './auth.service';


@Injectable()
export class AuthServiceMock extends AuthService {

  private isLoggedIn: boolean;

  constructor() {
    super(null, null, null);
  }

  public userProfile: any;

  public login(email: string, password: string ) {
    return new Observable();
  }

  public loginAuth0() {
    this.isLoggedIn = true;
  }

  public handleAuth0() {
    return;
  }

  public hasScopes(scopes: Array<string>): boolean {
    return true;
  }

  public logout() {
    return true;
  }

  public isAuthenticated(): boolean {
    return true;
  }

  public getProfile(cb): void {
    cb(null, {});
  }
}
