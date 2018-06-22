import { async} from '@angular/core/testing';

import { LandingComponent } from './landing.component';

import { AuthServiceMock } from '../../services/auth.service.mock';

describe('LandingComponent', () => {
  let component: LandingComponent;
  let service: AuthServiceMock;

  beforeEach(async(() => {
    service = new AuthServiceMock();
    component = new LandingComponent(service);
    component.ngOnInit();
  }));

  afterEach(() => {
    service = null;
    component = null;
  });

  it('should get profile from auth service', () => {
    expect(component.profile).toBeDefined();
  });
});
