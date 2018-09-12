import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { TeamCalendarService } from './team-calendar.service';
import { TeamsApiService, AbsencesApiService } from '@app/backend-api';
import { BaseApiService, Logger } from '@app/core/services';

describe('ScheduleService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TeamCalendarService, TeamsApiService, AbsencesApiService, BaseApiService, Logger],
      imports: [HttpClientTestingModule]
    });
  });

  it('should be created', inject([TeamCalendarService], (service: TeamCalendarService) => {
    expect(service).toBeTruthy();
  }));
});
