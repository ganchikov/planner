import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import { PrimeControlsModule } from '../../../primecontrols.module';
import { AuthService } from '../../../services/auth.service';
import { AuthServiceMock } from '../../../services/auth.service.mock';
import { MainComponent } from './main.component';
import {HeaderComponent} from '../header/header.component';
import {FooterComponent} from '../footer/footer.component';
import {ProfileComponent} from '../profile/profile.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('MainComponent', () => {
  let component: MainComponent;
  let fixture: ComponentFixture<MainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainComponent],
      imports: [PrimeControlsModule, RouterTestingModule],
      providers: [{provide: AuthService, useClass: AuthServiceMock}],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
