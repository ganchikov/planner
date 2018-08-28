import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { PrimeControlsModule } from '@app/core/primecontrols.module';
import { TeamGanttViewComponent } from '@app/team-gantt/team-gantt-view/team-gantt-view.component';
import { AuthServiceMock } from '@app/core/services';
import { AuthService } from '@app/core/services';
import { TeamDataService } from '@app/team/team-data.service';
import {TeamDataServiceMock} from '@app/team/team-data.service.mock';
import { TeamGanttDataService } from '@app/team-gantt/team-gantt-data.service';
import { TeamGanttComponent } from '@app/team-gantt/team-gantt/team-gantt.component';

describe('TeamGanttViewComponent', () => {
  let component: TeamGanttViewComponent;
  let fixture: ComponentFixture<TeamGanttViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeamGanttViewComponent, TeamGanttComponent ],
      imports: [PrimeControlsModule,
        FormsModule,
        BrowserAnimationsModule],
      providers: [TeamGanttDataService,
        {provide: TeamDataService, useClass: TeamDataServiceMock},
        {provide: AuthService, useClass: AuthServiceMock}]
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
