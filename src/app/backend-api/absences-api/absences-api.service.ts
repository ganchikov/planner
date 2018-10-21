import { Injectable } from '@angular/core';
import { IApiService } from '@app/common/interfaces';
import { Absence } from '@app/common/models';
import { BaseApiService } from '@app/core/services';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AbsencesApiService implements IApiService<Absence> {

  route = 'absences';

  mapper = (item): Absence => {
    return new Absence(item);
  }

  constructor(public api: BaseApiService) { }

  getAbsencesByPersonId(personId: Object): Observable<Absence[]> {
    return this.api.doGetRequest(this.route + `?person=${personId}`, this.mapper, 'getAbsencesByPersonId');

  }

  getAbsencesByDates(start_date?: Object, end_date?: Object): Observable<Absence[]> {
    let route = this.route;
    if (start_date) {
      route += `?start_date=${start_date}`;
      if (end_date) {
        route += `&end_date=${end_date}`;
      }
    } else if (end_date) {
      route += `?end_date=${end_date}`;
    }
    return this.api.doGetRequest(route, this.mapper, 'getAbsencesByDates');
  }

  getAbsenceById(itemId: Object): Observable<{}| Absence> {
    return this.api.doGetRequest(this.route + `/${itemId}`, this.mapper, 'getAbsenceById')
      .pipe(map(absences => absences.length > 0 ? absences[0] : {}));
  }

  insertAbsence(item: Absence): Observable<{}|Absence> {
    return this.api.doPostRequest<Absence>(this.route, item, this.mapper, 'insertAbsence');
  }

  updateAbsence(item: Absence): Observable<{}|Absence> {
    return this.api.doPatchRequest<Absence>(this.route, item, this.mapper, 'updateAbsence');
  }

  deleteAbsence(item: Absence): Observable<{}|Absence> {
    return this.api.doDeleteRequest<Absence>(this.route, item._id, (response) => {
      return response;
    }, 'deleteAbsence');
  }
}
