import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ButtonModule} from 'primeng/button';
import {InputTextModule} from 'primeng/inputtext';
import {MenubarModule} from 'primeng/menubar';
import {ListboxModule} from 'primeng/listbox';
import {TableModule} from 'primeng/table';
import {TreeTableModule} from 'primeng/treetable';
import {DropdownModule} from 'primeng/dropdown';
import {CalendarModule} from 'primeng/calendar';
import {CheckboxModule} from 'primeng/checkbox';

@NgModule({
  imports: [
    CommonModule,
    ButtonModule,
    InputTextModule,
    MenubarModule
  ],
  exports: [
    CommonModule,
    ButtonModule,
    InputTextModule,
    MenubarModule,
    ListboxModule,
    TableModule,
    TreeTableModule,
    DropdownModule,
    CalendarModule,
    CheckboxModule
  ],
  declarations: []
})
export class PrimeControlsModule { }
