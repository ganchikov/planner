import { TestBed, inject, getTestBed } from '@angular/core/testing';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';

import { TeamsCalendarApiService } from './teams-calendar-api.service';
import { TeamsApiService } from '@app/backend-api';
import { BaseApiService, Logger } from '@app/core/services';

describe('TeamsCalendarApiService', () => {
  let injector: TestBed;
  let service: TeamsApiService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TeamsCalendarApiService, BaseApiService, Logger],
      imports: [HttpClientTestingModule]
    });
    injector = getTestBed();
    service = injector.get(TeamsCalendarApiService);
    httpMock = injector.get(HttpTestingController);
  });

  it('should be created', inject([TeamsCalendarApiService], (svc: TeamsCalendarApiService) => {
    expect(service).toBeTruthy();
  }));
});
