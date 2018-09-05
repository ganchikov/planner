import { Injectable } from '@angular/core';
import { IApiService } from '@app/common/interfaces';
import { Person } from '@app/common/models';
import { BaseApiService } from '@app/core/services';

@Injectable({
  providedIn: 'root'
})
export class PeopleApiService implements IApiService<Person> {

  public mapper = (item): Person => {
    return new Person(item);
  }

  constructor(public api: BaseApiService) { }
}
