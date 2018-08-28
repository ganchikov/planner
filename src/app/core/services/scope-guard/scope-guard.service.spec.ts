import { RouterTestingModule } from '@angular/router/testing';
import { TestBed, inject } from '@angular/core/testing';
import { AuthServiceMock, AuthService, ScopeGuardService } from '@app/core/services';

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
