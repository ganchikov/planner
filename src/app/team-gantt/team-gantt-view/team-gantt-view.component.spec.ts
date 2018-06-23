import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { PrimeControlsModule } from './../../common/primecontrols.module';
import { TeamGanttViewComponent } from './team-gantt-view.component';
import { AuthServiceMock } from './../../common/services/auth.service.mock';
import { AuthService } from './../../common/services/auth.service';
import { TeamDataService } from './../../team/team-data.service';
import {TeamDataServiceMock} from '../../team/team-data.service.mock';
import { TeamGanttDataService } from './../team-gantt-data.service';
import { TeamGanttComponent } from './../team-gantt/team-gantt.component';

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
