import Cell, { CellState } from "./cell";
import * as _ from 'lodash';

class CellGroup {
  public readonly state: CellState;
  public readonly size: number;

  constructor(state: any, size: number) {
    this.state = state;
    this.size = size;
  }

  isFilled() {
    return this.state === CellState.FILLED;
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
  }

  private createGroups(groups: CellGroup[], ungroupedCells: Cell[], stateGetter: (cell: any) => CellState): CellGroup[] {
    if (_.size(ungroupedCells) === 0) {
      return groups;
    }

    const groupState = stateGetter(ungroupedCells[0]);
    const cellsInGroup = _.takeWhile(ungroupedCells, cell => stateGetter(cell) === groupState);
    const newGroup = new CellGroup(groupState, cellsInGroup.length);
    groups.push(newGroup);

    return this.createGroups(groups, _.drop(ungroupedCells, newGroup.size), stateGetter);
  }
}

export class CellColumn extends CellRow {}

export default CellGroup;