import { RequestInterceptor } from './../interceptors/request.interceptor';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import {HttpClient} from '@angular/common/http';
import { TestBed, inject } from '@angular/core/testing';

import { AppverService } from './appver.service';
import {AppConfig} from '../../app.config';


describe('AppverService', () => {
  let url: string;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AppverService],
      imports: [HttpClientTestingModule]
    });
  });
  beforeEach(async () => {
    await AppConfig.load();
    url = AppConfig.settings.enableHttps ? AppConfig.settings.apiServer.httpsUrl : AppConfig.settings.apiServer.url;
  });

  it('should be created',
    inject([AppverService], (service: AppverService) => {
    expect(service).toBeTruthy();
  }));

  it('fetch data from server api',
    inject([HttpTestingController, AppverService], (httpMock: HttpTestingController, service: AppverService) => {
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
