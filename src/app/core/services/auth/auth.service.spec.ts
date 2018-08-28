import { RouterTestingModule } from '@angular/router/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import { TestBed, inject } from '@angular/core/testing';
import { AuthService } from './auth.service';
import { Logger } from '@app/core/services';

describe('AuthService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthService, Logger],
      imports: [HttpClientTestingModule, RouterTestingModule]
    });
  });

  it('should be created', inject([AuthService], (service: AuthService) => {
    expect(service).toBeTruthy();
  }));
});
