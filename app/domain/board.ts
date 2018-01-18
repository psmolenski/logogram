import Cell from "./cell";
import Group from "./group";
import * as _ from 'lodash';

export default class Board {
  private cells: Cell[][];
  public readonly cellsInColumns: Cell[][];
  private groupsInRows: Group[][];
  public readonly groupsInColumns: Group[][];

  constructor(pattern: number[][]) {
    this.cells = pattern.map((row, rowIndex) => row.map((filled, columnIndex) => new Cell(rowIndex, columnIndex, filled === 1)));
    this.cellsInColumns = _.zip(...this.cells);
    this.groupsInRows = pattern.map(row => this.createGroups(row));
    this.groupsInColumns = _.zip(...pattern).map((column : number[]) => this.createGroups(column));
  }

  getGroupsForRow(rowIndex: number) : Group[] {
    return this.groupsInRows[rowIndex];
  }

  private createGroups(arr : number[]): Group[] {
    return arr
      .reduce((groups: Group[], cellType: number) => {
        if (groups.length === 0) {
          return [new Group(cellType, 1)];
        }

        const lastGroup = <Group> groups.pop();

        if (lastGroup.type === cellType) {
          groups.push(new Group(lastGroup.type, lastGroup.size + 1));
        } else {
          groups.push(lastGroup);
          groups.push(new Group(cellType, 1));
        }

        return groups;

      }, <Group[]>[])
      .filter(group => group.type === 1);
  }

}