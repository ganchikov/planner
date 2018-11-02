import { Component, Input } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { PrimeControlsModule } from '@app/core/primecontrols.module';
import { TeamDataService } from '@app/team/team-data.service';
import { TeamDataServiceMock} from '@app/team/team-data.service.mock';
import { TeamViewComponent } from './team-view.component';

@Component({
  selector: '<app-team-menu>',
  template: ''
})
export class TeamMenuMockComponent {

}

@Component({
  selector: '<app-team-details>',
  template: ''
})
export class TeamDetailsMockComponent {
  @Input()
  visible: boolean;
}

describe('TeamViewComponent', () => {
  let component: TeamViewComponent;
  let fixture: ComponentFixture<TeamViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeamMenuMockComponent, TeamDetailsMockComponent, TeamViewComponent ],
      imports: [PrimeControlsModule],
      providers: [{provide: TeamDataService, useClass: TeamDataServiceMock}]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
