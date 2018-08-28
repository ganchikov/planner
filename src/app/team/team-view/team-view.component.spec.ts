import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { PrimeControlsModule } from '@app/core/primecontrols.module';
import { TeamDataService } from '@app/team/team-data.service';
import { TeamDataServiceMock} from '@app/team/team-data.service.mock';
import { TeamViewComponent } from './team-view.component';

describe('TeamViewComponent', () => {
  let component: TeamViewComponent;
  let fixture: ComponentFixture<TeamViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeamViewComponent ],
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
