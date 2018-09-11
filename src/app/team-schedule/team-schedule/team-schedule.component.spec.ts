import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamScheduleComponent } from '@app/team-schedule/team-schedule/team-schedule.component';
import { TeamsApiService, AbsencesApiService } from '@app/backend-api';
import {TeamDataService} from '@app/team/team-data.service';
import {TeamDataServiceMock} from '@app/team/team-data.service.mock';
import { AuthService, AuthServiceMock, BaseApiService, Logger } from '@app/core/services';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TeamScheduleService } from '../schedule.service';


describe('TeamScheduleComponent', () => {
  let component: TeamScheduleComponent;
  let fixture: ComponentFixture<TeamScheduleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [TeamScheduleService, TeamsApiService, AbsencesApiService, BaseApiService, Logger,
        {provide: AuthService, useClass: AuthServiceMock},
      ],
      declarations: [ TeamScheduleComponent ],
      imports: [HttpClientTestingModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
