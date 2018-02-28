import { TestBed, inject } from '@angular/core/testing';

import { TeamGanttDataService } from './team-gantt-data.service';

describe('TeamGanttDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TeamGanttDataService]
    });
  });

  it('should be created', inject([TeamGanttDataService], (service: TeamGanttDataService) => {
    expect(service).toBeTruthy();
  }));
});
