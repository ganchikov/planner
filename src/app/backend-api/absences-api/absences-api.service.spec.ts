import { TestBed, inject, getTestBed } from '@angular/core/testing';

import { AbsencesApiService } from './absences-api.service';
import { BaseApiService, Logger } from '@app/core/services';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Absence } from '@app/common/models';

describe('AbsencesApiService', () => {
  let injector: TestBed;
  let service: AbsencesApiService;
  let httpMock: HttpTestingController;
  const sample_id = 12345;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AbsencesApiService, BaseApiService, Logger],
      imports: [HttpClientTestingModule]
    });
    injector = getTestBed();
    service = injector.get(AbsencesApiService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', inject([AbsencesApiService], (svc: AbsencesApiService) => {
    expect(service).toBeTruthy();
  }));

  describe('getAbsenceById', () => {
    it('should invoke GET request and return an Observable<{}|Absence>', () => {
      const dummyResponse = {
        data: [
          {_id: sample_id,
            id: 1,
            name: 'Test Absence1'
          }
        ]
      };

      service.getAbsenceById('12345').subscribe(absence => {
        expect((absence as Absence).id).toBe(1);
      });

      const req = httpMock.expectOne(service.api.url + `absences/${sample_id}`);
      expect(req.request.method).toBe('GET');
      req.flush(dummyResponse);
    });

  });

  describe('insertAbsence', () => {
    it('should invoke POST request and return an Observable<{}|Absence>', () => {

      const sample = {
        _id: sample_id,
          id: 1,
          name: 'Test Absence1'
      };

      const absenceItem = new Absence(sample);

      service.insertAbsence(absenceItem).subscribe(absence => {
        expect((absence as Absence)._id).toBe(absenceItem._id);
      });

      const req = httpMock.expectOne(service.api.url + `absences`);
      expect(req.request.method).toBe('POST');
      req.flush(sample);
    });
  });

  describe('deleteAbsence', () => {
    it('should invoke DELETE request', () => {

      const sample = {
        _id: sample_id,
          id: 1,
          name: 'Test Absence1'
      };

      const absenceItem = new Absence(sample);

      service.deleteAbsence(absenceItem).subscribe();

      const req = httpMock.expectOne(service.api.url + `absences/${sample_id}`);
      expect(req.request.method).toBe('DELETE');
    });
  });


});
