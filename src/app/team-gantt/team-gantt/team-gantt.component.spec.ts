
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AuthService, AuthServiceMock } from '@app/core/services';
import { TeamDataService } from '@app/team/team-data.service';
import {TeamDataServiceMock} from '@app/team/team-data.service.mock';
import { TeamGanttDataService } from '@app/team-gantt/team-gantt-data.service';

import { TeamGanttComponent } from '@app/team-gantt/team-gantt/team-gantt.component';

describe('TeamGanttComponent', () => {
  let component: TeamGanttComponent;
  let fixture: ComponentFixture<TeamGanttComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeamGanttComponent ],
      providers: [TeamGanttDataService,
        {provide: TeamDataService, useClass: TeamDataServiceMock},
        {provide: AuthService, useClass: AuthServiceMock}]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamGanttComponent);
    component = fixture.componentInstance;
    component.rangeDates = [new Date(Date.now()), new Date(Date.now())];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
