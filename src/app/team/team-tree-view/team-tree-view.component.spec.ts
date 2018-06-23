import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { PrimeControlsModule } from './../../common/primecontrols.module';
import { TeamDataService } from './../team-data.service';
import { TeamDataServiceMock} from './../team-data.service.mock';
import { TeamTreeViewComponent } from './team-tree-view.component';

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
