import Cell, {CellState} from "./cell";
import * as _ from 'lodash';

export default class Board {
  public readonly cellsInRows: Cell[][];

  constructor(pattern: number[][]) {
    this.cellsInRows = Board.createCellsInRowsFromPattern(pattern);
  }

  static createCellsInRowsFromPattern(pattern: number[][]) : Cell[][] {
    return pattern.map((row, rowIndex) => {
      return row.map((filled, columnIndex) => {
        const desiredState = filled === 1 ? CellState.FILLED : CellState.BLANK;

        return new Cell(rowIndex, columnIndex, filled === 1);
      });
    });
  }

  hasAllCellsInDesiredState() {
    return this.cellsInRows.every(row => {
      if (_.isUndefined(row)) {
        return false;
      }

      return  row.every(cell => {
        if (_.isUndefined(cell)){
          return false;
        }

        return cell.isInDesiredState();
      });
    });
  }

}