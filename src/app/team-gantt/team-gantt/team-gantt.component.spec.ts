import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamGanttComponent } from './team-gantt.component';

describe('TeamGanttComponent', () => {
  let component: TeamGanttComponent;
  let fixture: ComponentFixture<TeamGanttComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeamGanttComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamGanttComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
