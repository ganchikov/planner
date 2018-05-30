import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

@Injectable()
export class MediatorService {

  private authenticatedStateSource = new BehaviorSubject<boolean>(false);

  public OnAuthenticatedStateChange = this.authenticatedStateSource.asObservable();

  public SetAuthenticatedState(isAuthenticated: boolean): void {
    this.authenticatedStateSource.next(isAuthenticated);
  }

  constructor() { }


}
