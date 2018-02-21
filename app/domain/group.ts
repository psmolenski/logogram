import Cell, { CellState } from "./cell";

class Group {
  public readonly type: any;
  public readonly size: number;

  constructor(type: any, size: number) {
    this.type = type;
    this.size = size;
  }
}

export class CellRow {
  readonly desiredCellGroups: Group[];

  constructor(readonly cells: Cell[]){
    this.desiredCellGroups = this.createGroups();
  }

  get completed() : boolean {
    return this.cells.every(cell => cell.isInDesiredState());
  }

  private createGroups(): Group[] {
    return this.cells
      .reduce((groups: Group[], cell: Cell) => {
        if (groups.length === 0) {
          return [new Group(cell.desiredState, 1)];
        }

        const lastGroup = <Group> groups.pop();

        if (lastGroup.type === cell.desiredState) {
          groups.push(new Group(lastGroup.type, lastGroup.size + 1));
        } else {
          groups.push(lastGroup);
          groups.push(new Group(cell.desiredState, 1));
        }

        return groups;

      }, <Group[]>[])
      .filter(group => group.type === CellState.FILLED);
  }
}

export class CellColumn extends CellRow {}

export default Group;