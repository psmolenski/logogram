import Cell, {CellState} from "./cell";
import * as _ from 'lodash';
import { CellRow } from "./group";

export default class Board {
  public readonly cellsInRows: CellRow[];

  constructor(pattern: number[][]) {
    this.cellsInRows = Board.createCellsInRowsFromPattern(pattern);
  }

  static createCellsInRowsFromPattern(pattern: number[][]) : CellRow[] {
    return pattern.map((row, rowIndex) => {
      const cellsInRow = row.map((filled, columnIndex) => {
        const desiredState = filled === 1 ? CellState.FILLED : CellState.BLANK;

        return new Cell(rowIndex, columnIndex, filled === 1);
      });

      return new CellRow(cellsInRow);
    });
  }

  hasAllCellsInDesiredState() {
    return this.cellsInRows.every(row => row.completed);
  }

}