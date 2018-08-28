import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { MainComponent } from './main/main.component';
import { VersionComponent } from './version/version.component';
import { ProfileComponent } from './profile/profile.component';

import { PrimeControlsModule } from '@app/core/primecontrols.module';

@NgModule({
  imports: [
    CommonModule,
    PrimeControlsModule
  ],
  declarations: [HeaderComponent, FooterComponent, MainComponent, ProfileComponent, VersionComponent],
  exports: [MainComponent]
})
export class MasterPageModule { }
