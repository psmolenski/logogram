import {Record} from "immutable";

enum CellState {
  BLANK, FILLED, FLAGGED
}

const defaultCellProperties = {row: -1, column: -1, state: CellState.BLANK, desiredState: null};

class Cell extends Record(defaultCellProperties) {
  public readonly row: number;
  public readonly column: number;
  public readonly state: CellState;
  public readonly desiredState: CellState;

  constructor(row: number, column: number, filled: boolean) {
    super({
      row: row,
      column: column,
      desiredState: filled ? CellState.FILLED : CellState.BLANK
    });
  }

  fill() : Cell {
    return this.set('state', CellState.FILLED) as this;
  }

  flag() : Cell {
    return this.set('state', CellState.FLAGGED) as this;
  }

  blank() : Cell {
    return this.set('state', CellState.BLANK) as this;
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