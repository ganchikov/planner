import { Logger, AppVerService } from '@app/core/services';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ISubscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-version',
  templateUrl: './version.component.html',
  styleUrls: ['./version.component.css']
})
export class VersionComponent implements OnInit, OnDestroy {

  private subscriptions: ISubscription[] = [];

  constructor(private service: AppVerService, private logger: Logger) { }

  public apiVer: string;
  public clientVer: string;

  async ngOnInit() {
    this.subscriptions.push(this.service.getServerAppVer().subscribe(data => {
      this.apiVer = data;
    }, err => {
      this.logger.log(err);
    }));
    this.subscriptions.push(this.service.getClientAppVer().subscribe(data => {
      this.clientVer = data;
    }, err => {
      this.logger.log(err);
    }));
  }

  ngOnDestroy() {
    if (!this.subscriptions) {return; }
    this.subscriptions.forEach(subscription => {
      subscription.unsubscribe();
    });
  }

}
