export default class Cell {
  private state: CellState = CellState.BLANK;
  private patternState: CellState;

  constructor(filled: boolean) {
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