import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamCalendarViewComponent } from './team-calendar-view.component';
import { PrimeControlsModule } from '@app/core/primecontrols.module';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TeamCalendarComponent } from '../team-calendar/team-calendar.component';
import { TeamCalendarService } from '../team-calendar.service';
import { TeamsApiService, AbsencesApiService } from '@app/backend-api';
import { BaseApiService, Logger, AuthService, AuthServiceMock } from '@app/core/services';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('TeamCalendarViewComponent', () => {
  let component: TeamCalendarViewComponent;
  let fixture: ComponentFixture<TeamCalendarViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeamCalendarViewComponent, TeamCalendarComponent ],
      imports: [
        PrimeControlsModule,
        FormsModule,
        BrowserAnimationsModule,
        HttpClientTestingModule
      ],
      providers: [TeamCalendarService, TeamsApiService, AbsencesApiService, BaseApiService, Logger,
        {provide: AuthService, useClass: AuthServiceMock},
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamCalendarViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
