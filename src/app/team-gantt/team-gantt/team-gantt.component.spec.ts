import { AuthServiceMock } from './../../common/services/auth.service.mock';
import { AuthService } from './../../common/services/auth.service';
import { TeamDataService } from './../../team/team-data.service';
import {TeamDataServiceMock} from './../../team/team-data.service.mock';
import { TeamGanttDataService } from './../team-gantt-data.service';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamGanttComponent } from './team-gantt.component';

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
