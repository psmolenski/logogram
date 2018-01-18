export default class Cell {
  public readonly row: number;
  public readonly column: number;
  private state: CellState = CellState.BLANK;
  private patternState: CellState;

  constructor(row: number, column: number, filled: boolean) {
    this.row = row;
    this.column = column;
    this.patternState = filled ? CellState.FILLED : CellState.BLANK;
  }

  fill() : void {
    this.state = CellState.FILLED;
  }

  flag() : void {
    this.state = CellState.FLAGGED;
  }

  clear() : void {
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
}

enum CellState {
  BLANK, FILLED, FLAGGED
}

export {CellState};