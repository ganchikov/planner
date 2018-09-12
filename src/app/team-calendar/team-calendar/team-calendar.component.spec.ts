import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamCalendarComponent } from './team-calendar.component';
import { TeamsApiService, AbsencesApiService } from '@app/backend-api';
import {TeamDataService} from '@app/team/team-data.service';
import {TeamDataServiceMock} from '@app/team/team-data.service.mock';
import { AuthService, AuthServiceMock, BaseApiService, Logger } from '@app/core/services';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TeamCalendarService } from '../team-calendar.service';


describe('TeamCalendarComponent', () => {
  let component: TeamCalendarComponent;
  let fixture: ComponentFixture<TeamCalendarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [TeamCalendarService, TeamsApiService, AbsencesApiService, BaseApiService, Logger,
        {provide: AuthService, useClass: AuthServiceMock},
      ],
      declarations: [ TeamCalendarComponent ],
      imports: [HttpClientTestingModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
