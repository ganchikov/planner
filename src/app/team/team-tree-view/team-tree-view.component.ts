import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {} from '@angular/core';

import {TreeNode} from 'primeng/api';
import {TeamDataService} from '../team-data.service';
import {Team, Person, Absence, AbsenceTypes} from '../../../../common/models';

interface AbsenceTypeItem {
  name: string;
}

@Component({
  selector: 'app-team-tree-view',
  templateUrl: './team-tree-view.component.html',
  styleUrls: ['./team-tree-view.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class TeamTreeViewComponent implements OnInit {

  private _teams: Team[] = [];
  private nodes: TreeNode[];
  private selectedNode: TreeNode;
  curDate: Date;

  // TeamConverter(item: Team, idx: number, arr: Object[]): Team {
  //   const teamItem: Team = {
  //       _id: item._id,
  //       id: item.id,
  //       name: item.name,
  //       members: []
  //   };
  //   for (const member of item.members) {
  //       const memberItem: Person = {
  //         _id: member._id,
  //         id: member.id,
  //         name: member.name,

  //       }
  //   }
  //   return teamItem;
  // }

  NodeConverter(teamItem: Team, idx: number, arr: Team[]): TreeNode {
    const teamNode: TreeNode = {
      data: {_type: 'Team', _id: teamItem._id, id: teamItem.id, name: teamItem.name},
      children: []
    };
    for (const member of teamItem.members) {
      const memberNode: TreeNode = {
        data: {_type: 'Person', _id: member._id, id: member.id, name: member.name},
        children: []
      };

      for (const absence of member.absences) {
        const absenceNode: TreeNode = {
          data: {_type: 'Absence', _id: absence._id, name: absence.name,
                  type: absence.type,
                  from: new Date(absence.from),
                  to: new Date(absence.to),
                  confirmed: absence.confirmed
                }
        };
        memberNode.children.push(absenceNode);
      }
      teamNode.children.push(memberNode);
    }
    return teamNode;
  }

  get Nodes(): TreeNode[] {
    return this.nodes;
  }

  get SelectedNode(): TreeNode {
    return this.selectedNode;
  }

  set SelectedNode(item: TreeNode) {
    this.selectedNode = item;
  }

  get AbsenceTypeList(): Object[] {
    return AbsenceTypes.map<AbsenceTypeItem>((item, index, array) => {
      const itm: AbsenceTypeItem = {name: item };
      return itm;
    });
  }

  constructor(private teamDS: TeamDataService) { }

  ngOnInit() {
    this.teamDS.getTeamData(teams => {
      this.nodes = teams.map<TreeNode>(this.NodeConverter);
    });
  }

}
