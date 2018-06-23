import { RouterTestingModule } from '@angular/router/testing';
import { AuthServiceMock } from './auth.service.mock';
import { AuthService } from './auth.service';
import { TestBed, inject } from '@angular/core/testing';

import { ScopeGuardService } from './scope-guard.service';

describe('ScopeGuardService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ScopeGuardService,
        {provide: AuthService, useClass: AuthServiceMock}],
      imports: [RouterTestingModule]
    });
  });

  it('should be created', inject([ScopeGuardService], (service: ScopeGuardService) => {
    expect(service).toBeTruthy();
  }));
});
