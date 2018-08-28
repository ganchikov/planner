import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {AuthServiceMock} from '@app/core/services';
import { LoginComponent } from './login.component';

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
