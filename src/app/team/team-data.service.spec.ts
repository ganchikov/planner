import { Logger } from './../common/services/logger.service';
import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { TeamDataService } from './team-data.service';

describe('TeamDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TeamDataService, Logger],
      imports: [HttpClientTestingModule]
    });
  });

  it('should be created', inject([TeamDataService], (service: TeamDataService) => {
    expect(service).toBeTruthy();
  }));
});
