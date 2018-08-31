import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamScheduleComponent } from '@app/team-schedule/team-schedule/team-schedule.component';
import { TeamScheduleDataService } from '../team-schedule-data.service';
import {TeamDataService} from '@app/team/team-data.service';
import {TeamDataServiceMock} from '@app/team/team-data.service.mock';
import { AuthService, AuthServiceMock } from '@app/core/services';


describe('TeamScheduleComponent', () => {
  let component: TeamScheduleComponent;
  let fixture: ComponentFixture<TeamScheduleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [TeamScheduleDataService,
        {provide: TeamDataService, useClass: TeamDataServiceMock},
        {provide: AuthService, useClass: AuthServiceMock}],
      declarations: [ TeamScheduleComponent ]
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
