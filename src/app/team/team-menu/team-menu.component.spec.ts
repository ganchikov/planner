import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { PrimeControlsModule } from '@app/core/primecontrols.module';

import { TeamMenuComponent } from './team-menu.component';

describe('TeamMenuComponent', () => {
  let component: TeamMenuComponent;
  let fixture: ComponentFixture<TeamMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeamMenuComponent ],
      imports: [PrimeControlsModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
