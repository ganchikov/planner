import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {SelectItem} from 'primeng/api';
import {Team} from '@app/common/models';

@Component({
  selector: 'app-team-details',
  templateUrl: './team-details.component.html',
  styleUrls: ['./team-details.component.css']
})
export class TeamDetailsComponent implements OnInit {

  constructor() { }

  @Input()
  team: Team;

  @Input()
  visible = false;

  @Input()
  header = 'New Team';

  @Output()
  teamSaved: EventEmitter<Team> = new EventEmitter();

  get members() {
      if (this.team && this.team.members) {
        const items: SelectItem[] = this.team.members.map<SelectItem>((member, index, members): SelectItem => {
          const val: SelectItem = {label: member.name,
            value: {id: member._id,
                    name: member.name,
                    dateStart: member.start_date,
                    dateEnd: member.end_date}};
          return val;
        });
        return items;
      } else {
        return null;
      }
  }

  ngOnInit() {
      this.team = new Team({});
  }

  saveClick(event: any) {
    console.log(this.team);
    this.teamSaved.emit(this.team);
    this.visible = false;
  }

  discardClick(event: any) {
    console.log(event);
    this.visible = false;
  }

}
