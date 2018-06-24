import { Logger } from './../../services/logger.service';
import { AppverService } from './../../services/appver.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-version',
  templateUrl: './version.component.html',
  styleUrls: ['./version.component.css']
})
export class VersionComponent implements OnInit {

  constructor(private service: AppverService, private logger: Logger) { }

  public apiVer: string;

  ngOnInit() {
    this.service.getAppVer().subscribe(data => {
      this.apiVer = data;
    }, err => {
      this.logger.log(err);
    });
  }

}
