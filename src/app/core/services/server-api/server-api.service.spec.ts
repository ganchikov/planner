import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { ServerApiService } from './server-api.service';
import { Logger } from '@app/core/services';

describe('ServerApiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ServerApiService, Logger],
      imports: [HttpClientTestingModule]
    });
  });

  it('should be created', inject([ServerApiService], (service: ServerApiService) => {
    expect(service).toBeTruthy();
  }));
});
