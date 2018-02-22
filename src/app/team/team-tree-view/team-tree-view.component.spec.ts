import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamTreeViewComponent } from './team-tree-view.component';

describe('TeamTreeViewComponent', () => {
  let component: TeamTreeViewComponent;
  let fixture: ComponentFixture<TeamTreeViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeamTreeViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamTreeViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
