import { Injectable } from '@angular/core';
import { IApiService } from '@app/common/interfaces';
import { Absence } from '@app/common/models';
import { BaseApiService } from '@app/core/services';
import { Observable } from 'rx';

@Injectable({
  providedIn: 'root'
})
export class AbsencesApiService implements IApiService<Absence> {

  mapper = (item): Absence => {
    return new Absence(item);
  }

  constructor(public api: BaseApiService) { }

  // insertAbsence(item: Absence): Observable<Absence[]> {

  // }

  // insertAbsence(newItem: Absence, callback: (err?: any, insertedItem?: Absence) => void) {
  //   this.http.post<Absence>(this.url + 'absences', newItem.GetObject()).subscribe(insertedItem => {
  //       const insertedAbsenceItem: Absence = new Absence(insertedItem);
  //       callback(null, insertedAbsenceItem);
  //   }, error => {
  //     callback(error);
  //   });
  // }

  // updateAbsence(absenceItem: Absence, callback: (error?) => void) {
  //   this.http.patch<Absence>(this.url + 'absences', absenceItem.GetObject()).subscribe(() => {
  //     callback();
  //   }, error => {
  //     callback(error);
  //   });
  // }

  // deleteAbsence(absenceId: Object, callback: (error?) => void) {
  //   this.http.delete(this.url + `absences/${absenceId.toString()}`).subscribe(() => {
  //     callback();
  //   }, error => {
  //     callback(error);
  //   });
  // }
}
