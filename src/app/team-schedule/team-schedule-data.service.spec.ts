import { TestBed, inject } from '@angular/core/testing';

import { TeamScheduleDataService } from '@app/team-schedule/team-schedule-data.service';

describe('TeamScheduleDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TeamScheduleDataService]
    });
  });

  it('should be created', inject([TeamScheduleDataService], (service: TeamScheduleDataService) => {
    expect(service).toBeTruthy();
  }));
});
