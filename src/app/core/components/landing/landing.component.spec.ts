import { async} from '@angular/core/testing';
import { AuthServiceMock } from '@app/core/services';
import { LandingComponent } from './landing.component';

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
