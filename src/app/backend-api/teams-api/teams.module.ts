import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeamsApiService } from './teams-api.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers: [TeamsApiService]
})
export class TeamsModule { }
