import Cell from "./cell";

class Group {
  public readonly type: any;
  public readonly size: number;

  constructor(type: any, size: number) {
    this.type = type;
    this.size = size;
  }
}

export class CellRow {
  constructor(readonly cells: Cell[]){}

  get completed() : boolean {
    return this.cells.every(cell => cell.isInDesiredState());
  }
}

export class CellColumn extends CellRow {}

export default Group;