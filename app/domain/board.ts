import Cell, {CellState} from "./cell";
import * as _ from 'lodash';
import {fromJS, List, Record} from "immutable";

export default class Board extends Record({cellsInRows: null}){
  public readonly cellsInRows: List<List<Cell>>;

  constructor(pattern: number[][]) {
    const cellsInRows = Board.createCellsInRowsFromPattern(pattern);

    super({cellsInRows});
  }

  static createCellsInRowsFromPattern(pattern: number[][]) : List<List<Cell>> {
    const mutableCollection = pattern.map((row, rowIndex) => {
      return row.map((filled, columnIndex) => {
        const desiredState = filled === 1 ? CellState.FILLED : CellState.BLANK;

        return new Cell(rowIndex, columnIndex, filled === 1);
      });
    });

    return fromJS(mutableCollection);
  }

  updateCell(row: number, column: number, cell: Cell){
    return this.setIn(['cellsInRows', row, column], cell) as this;
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