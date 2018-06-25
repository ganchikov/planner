import { Logger } from './../../services/logger.service';
import { AppverService } from './../../services/appver.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ISubscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-version',
  templateUrl: './version.component.html',
  styleUrls: ['./version.component.css']
})
export class VersionComponent implements OnInit, OnDestroy {

  private subscription: ISubscription;

  constructor(private service: AppverService, private logger: Logger) { }

  public apiVer: string;
  public clientVer: string;

  ngOnInit() {
    this.subscription = this.service.getAppVer().subscribe(data => {
      this.apiVer = data;
    }, err => {
      this.logger.log(err);
    });
    this.clientVer = 'TBD';
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
