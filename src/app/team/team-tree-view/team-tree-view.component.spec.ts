import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { TeamDataService } from '@app/team/team-data.service';
import { TeamDataServiceMock} from '@app/team/team-data.service.mock';
import { TeamTreeViewComponent } from './team-tree-view.component';
import { PrimeControlsModule } from '@app/core/primecontrols.module';

describe('TeamTreeViewComponent', () => {
  let component: TeamTreeViewComponent;
  let fixture: ComponentFixture<TeamTreeViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeamTreeViewComponent ],
      imports: [FormsModule, PrimeControlsModule],
      providers: [{provide: TeamDataService, useClass: TeamDataServiceMock}]
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
