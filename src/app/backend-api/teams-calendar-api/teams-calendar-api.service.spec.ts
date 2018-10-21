import { TestBed, inject } from '@angular/core/testing';

import { TeamsCalendarApiService } from './teams-calendar-api.service';

describe('TeamsCalendarApiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TeamsCalendarApiService]
    });
  });

  it('should be created', inject([TeamsCalendarApiService], (service: TeamsCalendarApiService) => {
    expect(service).toBeTruthy();
  }));
});
