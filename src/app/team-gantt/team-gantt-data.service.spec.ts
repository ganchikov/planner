import { TeamDataService } from './../team/team-data.service';
import { TestBed, inject } from '@angular/core/testing';

import { TeamGanttDataService } from './team-gantt-data.service';
import { TeamDataServiceMock } from '../team/team-data.service.mock';

describe('TeamGanttDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TeamGanttDataService, {provide: TeamDataService, useClass: TeamDataServiceMock}]
    });
  });

  it('should be created', inject([TeamGanttDataService], (service: TeamGanttDataService) => {
    expect(service).toBeTruthy();
  }));
});
