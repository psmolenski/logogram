enum CellState {
  BLANK, FILLED, FLAGGED
}

class Cell {
  public readonly row: number;
  public readonly column: number;
  public readonly desiredState: CellState;
  public state: CellState;

  constructor(row: number, column: number, filled: boolean) {
    this.row = row;
    this.column = column;
    this.desiredState = filled ? CellState.FILLED : CellState.BLANK;
    this.state = CellState.BLANK;
  }

  fill() : void {
    this.state = CellState.FILLED;
  }

  flag() : void {
    this.state = CellState.FLAGGED;
  }

  blank() : void {
    this.state = CellState.BLANK;
  }

  isFilled() : boolean {
    return this.state === CellState.FILLED;
  }

  isFlagged() : boolean {
    return this.state === CellState.FLAGGED;
  }

  isBlank() : boolean {
    return this.state === CellState.BLANK;
  }

  isInDesiredState() {
    if (this.desiredState === CellState.BLANK) {
      return this.isBlank() || this.isFlagged();
    }

    return this.state === this.desiredState;
  }
}

export {Cell, CellState};
export default Cell;