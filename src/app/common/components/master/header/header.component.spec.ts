import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { PrimeControlsModule } from '../../../primecontrols.module';
import { HeaderComponent } from './header.component';
import { AuthService } from '../../../services/auth.service';
import { AuthServiceMock } from '../../../services/auth.service.mock';
import { ProfileComponent } from '../profile/profile.component';
import { MockRoutingModule } from '../../../mock-routing.module';


describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeaderComponent, ProfileComponent ],
      imports: [PrimeControlsModule, MockRoutingModule],
      providers: [AuthService]
    });

    TestBed.overrideComponent(HeaderComponent,
    {set: {providers: [{provide: AuthService, useClass: AuthServiceMock}]}});

  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
