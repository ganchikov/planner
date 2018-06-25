import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppConfig } from '../../app.config';

@Injectable()
export class AppverService {

  constructor(private http: HttpClient) { }

  private url = AppConfig.settings.enableHttps ? AppConfig.settings.apiServer.httpsUrl : AppConfig.settings.apiServer.url;



  getAppVer(): Observable<string> {
    return this.http.get(this.url + 'appver', {responseType: 'text'});
  }
}
