import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ScopeGuardService implements CanActivate {

  constructor(private auth: AuthService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const scopes = (route.data as any).expectedScopes;
    if (!this.auth.isAuthenticated() || !this.auth.hasScopes(scopes)) {
      this.router.navigate(['/401']);
      return false;
    }
    return true;
  }
}
