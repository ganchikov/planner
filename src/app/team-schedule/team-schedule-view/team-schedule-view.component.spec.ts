import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamScheduleViewComponent } from '@app/team-schedule/team-schedule-view/team-schedule-view.component';

describe('TeamScheduleViewComponent', () => {
  let component: TeamScheduleViewComponent;
  let fixture: ComponentFixture<TeamScheduleViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeamScheduleViewComponent ]
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
