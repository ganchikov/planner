import { Observable } from 'rxjs';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppConfig } from '../../app.config';

@Injectable()
export class AppverService {

  constructor(private http: HttpClient) { }

  private url = AppConfig.settings.enableHttps ? AppConfig.settings.apiServer.httpsUrl : AppConfig.settings.apiServer.url;



  getServerAppVer(): Observable<string> {
    return this.http.get(this.url + 'appver', {responseType: 'text'});
  }

  getClientAppVer(): Observable<string> {
    const appVerFile = `assets/appver.txt`;
    return this.http.get(appVerFile, {responseType: 'text'});

    // return new Promise((resolve, reject) => {
    //     const xhr = new XMLHttpRequest();
    //     xhr.overrideMimeType('application/text');
    //     xhr.open('GET', appVerFile, true);
    //     xhr.onreadystatechange = () => {
    //         if (xhr.readyState === 4) {
    //             if (xhr.status === 200) {
    //                 resolve(xhr.responseText);
    //             } else {
    //                 reject(`Could not load file '${appVerFile}': ${xhr.status}`);
    //             }
    //         }
    //     };
    //     xhr.send(null);
    // });
  }

}
