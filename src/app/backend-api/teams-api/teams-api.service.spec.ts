import { TestBed, inject, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { TeamsApiService } from './teams-api.service';
import { Logger, BaseApiService } from '@app/core/services';

describe('TeamsApiService', () => {
  let injector: TestBed;
  let service: TeamsApiService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TeamsApiService, BaseApiService, Logger],
      imports: [HttpClientTestingModule]
    });
    injector = getTestBed();
    service = injector.get(TeamsApiService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', inject([TeamsApiService], (svc: TeamsApiService) => {
    expect(service).toBeTruthy();
  }));

  describe('#getTeams', () => {
    it('should return an Observable<Team[]>', () => {
      const dummyResponse = {
        data: [
          {_id: '12345',
            id: 1,
            name: 'Test team1'},
          {_id: '67890',
            id: 1,
            name: 'Test team1'
          }
        ]
      };

      service.getAllTeams().subscribe(teams => {
        expect(teams.length).toBe(2);
      });

      const req = httpMock.expectOne(service.api.url + 'teams');
      expect(req.request.method).toBe('GET');
      req.flush(dummyResponse);

    });

    it('should throw error if trying to search without auth token', () => {
      service.getAllTeams().subscribe(result => {
        // expect(result).toBe(401);
      }, error => {
        expect(error.status).toBe(401);
      });
      const req = httpMock.expectOne(service.api.url + 'teams');
      expect(req.request.method).toBe('GET');
      req.error(new ErrorEvent('UnauthorizedError'),
      {
        status: 401,
        statusText: 'credentials_required'
      });
    });
  });
});
