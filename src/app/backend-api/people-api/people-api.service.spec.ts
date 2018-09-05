import { TestBed, inject } from '@angular/core/testing';

import { PeopleApiService } from './people-api.service';
import { BaseApiService, Logger } from '@app/core/services';

describe('PeopleApiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PeopleApiService, BaseApiService, Logger]
    });
  });

  it('should be created', inject([PeopleApiService], (service: PeopleApiService) => {
    expect(service).toBeTruthy();
  }));
});
