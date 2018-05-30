import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { MainComponent } from './main/main.component';
import { PrimeControlsModule } from '../../primecontrols.module';

@NgModule({
  imports: [
    CommonModule,
    PrimeControlsModule
  ],
  declarations: [HeaderComponent, FooterComponent, MainComponent],
  exports: [MainComponent]
})
export class MasterPageModule { }
