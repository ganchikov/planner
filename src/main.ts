import {AppConfig} from '@app/app.config';

import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from '@app/app.module';
import { environment } from '@env/environment';

if (environment.name !== 'dev') {
  enableProdMode();
}

AppConfig.load().then(() => {
  platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.log(err));
});
