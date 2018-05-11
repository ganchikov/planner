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
import {ToolbarModule} from 'primeng/toolbar';
import {SelectButtonModule} from 'primeng/selectbutton';
import {DialogModule} from 'primeng/dialog';

@NgModule({
  imports: [
    CommonModule
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
    CheckboxModule,
    ToolbarModule,
    SelectButtonModule,
    DialogModule,
  ],
  declarations: []
})
export class PrimeControlsModule { }
