import { Injectable } from '@angular/core';

@Injectable()
export class Logger {

  constructor() { }

  public log(message: string) {
    console.log(message);
  }
}
