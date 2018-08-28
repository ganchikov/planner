import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { AuthService, AuthServiceMock } from '@app/core/services';
import { PrimeControlsModule } from '@app/core/primecontrols.module';
import { HeaderComponent } from './header.component';
import { ProfileComponent } from '../profile/profile.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeaderComponent, ProfileComponent ],
      imports: [PrimeControlsModule, RouterTestingModule],
      providers: [{provide: AuthService, useClass: AuthServiceMock}]
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
