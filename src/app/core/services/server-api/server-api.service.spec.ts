import { TestBed, inject, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ServerApiService } from './server-api.service';
import { Logger } from '@app/core/services';

describe('ServerApiService', () => {
  let injector: TestBed;
  let service: ServerApiService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ServerApiService, Logger],
      imports: [HttpClientTestingModule]
    });
    injector = getTestBed();
    service = injector.get(ServerApiService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  // describe('#getTeams', () => {
  //   it('should return an Observable<Team[]>', () => {
  //     const dummyResponse = {
  //       data: [
  //         {_id: '12345',
  //           id: 1,
  //           name: 'Test team1'},
  //         {_id: '67890',
  //           id: 1,
  //           name: 'Test team1'
  //         }
  //       ]
  //     };

  //     service.getTeams().subscribe(teams => {
  //       expect(teams.length).toBe(2);
  //     });

  //     const req = httpMock.expectOne(service.url + 'teams');
  //     expect(req.request.method).toBe('GET');
  //     req.flush(dummyResponse);

  //   });

  //   it('should throw error if trying to search without auth token', () => {
  //     service.getTeams().subscribe(result => {
  //       // expect(result).toBe(401);
  //     }, error => {
  //       expect(error.status).toBe(401);
  //     });
  //     const req = httpMock.expectOne(service.url + 'teams');
  //     expect(req.request.method).toBe('GET');
  //     req.error(new ErrorEvent('UnauthorizedError'),
  //     {
  //       status: 401,
  //       statusText: 'credentials_required'
  //     });
  //   });
  // });

});
