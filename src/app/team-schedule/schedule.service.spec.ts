import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { TeamScheduleService } from './schedule.service';
import { TeamsApiService, AbsencesApiService } from '@app/backend-api';
import { BaseApiService, Logger } from '@app/core/services';

describe('ScheduleService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TeamScheduleService, TeamsApiService, AbsencesApiService, BaseApiService, Logger],
      imports: [HttpClientTestingModule]
    });
  });

  it('should be created', inject([TeamScheduleService], (service: TeamScheduleService) => {
    expect(service).toBeTruthy();
  }));
});
