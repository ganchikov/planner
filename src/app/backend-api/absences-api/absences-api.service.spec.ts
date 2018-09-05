import { TestBed, inject } from '@angular/core/testing';

import { AbsencesApiService } from './absences-api.service';

describe('AbsencesApiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AbsencesApiService]
    });
  });

  it('should be created', inject([AbsencesApiService], (service: AbsencesApiService) => {
    expect(service).toBeTruthy();
  }));
});
