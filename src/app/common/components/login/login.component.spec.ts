import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import {AuthServiceMock} from '../../services/auth.service.mock';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let service: AuthServiceMock;

  beforeEach(() => {
    service = new AuthServiceMock();
    component = new LoginComponent(service);
    component.ngOnInit();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
