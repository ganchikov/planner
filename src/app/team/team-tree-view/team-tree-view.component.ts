import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {} from '@angular/core';

import {TreeNode} from 'primeng/api';

import {TeamDataService} from '../team-data.service';
import {Team, Absence} from '../../../../common/models';

@Component({
  selector: 'app-team-tree-view',
  templateUrl: './team-tree-view.component.html',
  styleUrls: ['./team-tree-view.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class TeamTreeViewComponent implements OnInit {

  private teams: Team[];
  private nodes: TreeNode[];
  private selectedNode: TreeNode;

  NodeConverter(teamItem: Team, idx: number, arr: Team[]): TreeNode {
    const teamNode: TreeNode = {
      data: {_id: teamItem._id, id: teamItem.id, name: teamItem.name},
      children: []
    };
    for (const member of teamItem.members) {
      const memberNode: TreeNode = {
        data: {_id: member._id, id: member.id, name: member.name},
        children: []
      };

      for (const absence of member.absences) {
        const absenceNode: TreeNode = {
          data: {_id: absence._id, name: absence.name,
                  type: absence.type, from: absence.from, to: absence.to, confirmed: absence.confirmed
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


  constructor(private teamDS: TeamDataService) { }

  ngOnInit() {
    this.teamDS.getTeamData().toPromise().then(teams => this.nodes = teams.map<TreeNode>(this.NodeConverter));
  }

}
