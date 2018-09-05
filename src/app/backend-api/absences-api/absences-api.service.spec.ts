import { TestBed, inject } from '@angular/core/testing';

import { AbsencesApiService } from './absences-api.service';
import { BaseApiService, Logger } from '@app/core/services';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('AbsencesApiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AbsencesApiService, BaseApiService, Logger],
      imports: [HttpClientTestingModule]
    });
  });

  it('should be created', inject([AbsencesApiService], (service: AbsencesApiService) => {
    expect(service).toBeTruthy();
  }));
});
