import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamScheduleViewComponent } from './team-schedule-view.component';
import { PrimeControlsModule } from '@app/core/primecontrols.module';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TeamScheduleComponent } from '../team-schedule/team-schedule.component';
import { TeamScheduleService } from '@app/team-schedule/schedule.service';
import { TeamsApiService, AbsencesApiService } from '@app/backend-api';
import { BaseApiService, Logger, AuthService, AuthServiceMock } from '@app/core/services';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('TeamScheduleViewComponent', () => {
  let component: TeamScheduleViewComponent;
  let fixture: ComponentFixture<TeamScheduleViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeamScheduleViewComponent, TeamScheduleComponent ],
      imports: [
        PrimeControlsModule,
        FormsModule,
        BrowserAnimationsModule,
        HttpClientTestingModule
      ],
      providers: [TeamScheduleService, TeamsApiService, AbsencesApiService, BaseApiService, Logger,
        {provide: AuthService, useClass: AuthServiceMock},
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamScheduleViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
