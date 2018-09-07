import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamScheduleComponent } from '@app/team-schedule/team-schedule/team-schedule.component';
import { TeamsApiService, AbsencesApiService } from '@app/backend-api';
import {TeamDataService} from '@app/team/team-data.service';
import {TeamDataServiceMock} from '@app/team/team-data.service.mock';
import { AuthService, AuthServiceMock, BaseApiService, Logger } from '@app/core/services';
import { HttpClientTestingModule } from '@angular/common/http/testing';


describe('TeamScheduleComponent', () => {
  let component: TeamScheduleComponent;
  let fixture: ComponentFixture<TeamScheduleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [TeamsApiService, AbsencesApiService, BaseApiService, Logger,
        {provide: TeamDataService, useClass: TeamDataServiceMock},
        {provide: AuthService, useClass: AuthServiceMock}],
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
