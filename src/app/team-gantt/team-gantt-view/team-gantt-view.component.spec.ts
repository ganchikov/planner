import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamGanttViewComponent } from './team-gantt-view.component';

describe('TeamGanttViewComponent', () => {
  let component: TeamGanttViewComponent;
  let fixture: ComponentFixture<TeamGanttViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeamGanttViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamGanttViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
