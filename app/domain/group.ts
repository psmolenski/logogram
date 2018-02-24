import Cell, { CellState } from "./cell";
import * as _ from 'lodash';

class CellGroup {
  completed: boolean = false;

  constructor(readonly state: CellState, readonly cells: Cell[], readonly start: number, readonly end: number) {}

  get size() {
    return this.cells.length;
  }

  isFilled() {
    return this.state === CellState.FILLED;
  }

  isFlagged() {
    return this.state === CellState.FLAGGED;
  }
}

export class CellRow {
  readonly desiredCellGroups: CellGroup[];
  cellGroups: CellGroup[];

  constructor(readonly cells: Cell[]){
    this.desiredCellGroups = this.createGroups([], this.cells, cell => cell.desiredState);
    this.cellGroups = this.createGroups([], this.cells, cell => cell.state);
  }

  get completed() : boolean {
    const desiredFilledGroups = this.desiredCellGroups.filter(group => group.isFilled());
    const filledGroups = this.cellGroups.filter(group => group.isFilled());

    if (desiredFilledGroups.length !== filledGroups.length) {
      return false;
    }

    return _.zip(desiredFilledGroups, filledGroups).every(([desiredGroup, group]) => desiredGroup.size === group.size);
  }


  updateCellGroups() {
    this.cellGroups = this.createGroups([], this.cells, cell => cell.state);

    const desiredFilledGroups = this.desiredCellGroups.filter(group => group.isFilled());
    const numberOfDesiredFilledGroups = desiredFilledGroups.length;
    let [leftGroups, rightGroups] = _.partition(this.cellGroups, group => group.start <= this.cells.length - group.end);
    leftGroups = leftGroups.filter(group => !group.isFlagged());
    rightGroups = rightGroups.filter(group => !group.isFlagged());

    const completedGroupsLeftToRight = _(desiredFilledGroups)
                    .zip(leftGroups)
                    .takeWhile(([desiredGroup, group]) => {
                      return group && group.size === desiredGroup.size && group.isFilled();
                    }).map(([desiredGroup, group]) => desiredGroup)
                    .value();

    const completedGroupsRightToLeft = _(desiredFilledGroups)
                    .reverse()
                    .zip(_.reverse(rightGroups))
                    .takeWhile(([desiredGroup, group]) => {
                      return group && group.size === desiredGroup.size && group.isFilled();
                    }).map(([desiredGroup, group]) => desiredGroup)
                    .value();

    const completedGroups = _.xor(completedGroupsLeftToRight, completedGroupsRightToLeft);  
    
    desiredFilledGroups.forEach(group => {
      group.completed = _.includes(completedGroups, group);
    });
  }

  private createGroups(groups: CellGroup[], ungroupedCells: Cell[], stateGetter: (cell: any) => CellState): CellGroup[] {
    if (_.size(ungroupedCells) === 0) {
      return groups;
    }

    const groupState = stateGetter(ungroupedCells[0]);
    const cellsInGroup = _.takeWhile(ungroupedCells, cell => stateGetter(cell) === groupState);
    const newGroup = new CellGroup(groupState, cellsInGroup, this.getGroupStart(cellsInGroup), this.getGroupEnd(cellsInGroup));
    groups.push(newGroup);

    return this.createGroups(groups, _.drop(ungroupedCells, newGroup.size), stateGetter);
  }

  getGroupStart(cells : Cell[]) {
    return cells[0].column;
  }

  getGroupEnd(cells : Cell[]) {
    return cells[cells.length - 1].column;
  }
}

export class CellColumn extends CellRow {
  getGroupStart(cells : Cell[]) {
    return cells[0].row;
  }

  getGroupEnd(cells : Cell[]) {
    return cells[cells.length - 1].row;
  }
}

export default CellGroup;