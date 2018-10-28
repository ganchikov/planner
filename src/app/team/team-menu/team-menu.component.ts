import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {MenubarModule} from 'primeng/menubar';
import {MenuItem} from 'primeng/api';

@Component({
  selector: 'app-team-menu',
  templateUrl: './team-menu.component.html',
  styleUrls: ['./team-menu.component.css']
})
export class TeamMenuComponent implements OnInit {

  items: MenuItem[];
  
  constructor() { }

  @Output()
  menuClick: EventEmitter<any> = new EventEmitter();

  ngOnInit() {
    const that = this;
    this.items = [
      {
          label: 'New Team',
          icon: 'fas fa-users',
          command: (event) => {
            that.menuClick.emit('new_team');
          }
      },
      {
        label: 'New Team Member',
        icon: 'fas fa-user-plus',
        command: (event) => {
          that.menuClick.emit('new_member');
        }
      }
  ];
  }

}
