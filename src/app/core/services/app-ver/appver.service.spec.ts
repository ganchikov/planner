import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed, inject } from '@angular/core/testing';
import { AppVerService } from '@app/core/services';
import {AppConfig} from '@app/app.config';


describe('AppVerService', () => {
  let url: string;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AppVerService],
      imports: [HttpClientTestingModule]
    });
  });
  beforeEach(async () => {
    await AppConfig.load();
    url = AppConfig.settings.enableHttps ? AppConfig.settings.apiServer.httpsUrl : AppConfig.settings.apiServer.url;
  });

  it('should be created',
    inject([AppVerService], (service: AppVerService) => {
    expect(service).toBeTruthy();
  }));

  it('fetch data from server api',
    inject([HttpTestingController, AppVerService], (httpMock: HttpTestingController, service: AppVerService) => {
      const testData = '0.0.0.1';
      service.getServerAppVer().subscribe(data => {
        expect(data).toBe('0.0.0.1');
      });
      const req = httpMock.expectOne(url + 'appver');
      expect(req.request.method).toEqual('GET');
      req.flush(testData);
      httpMock.verify();
    }));
});
