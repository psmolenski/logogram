import Cell, {CellState} from "./cell";
import * as _ from 'lodash';
import { CellRow, CellColumn } from "./group";
import { GridPattern } from "../data/grids";

export default class Board {
  readonly cellRows: CellRow[];
  readonly cellColumns: CellColumn[];

  private pattern: GridPattern;
  private cells: Cell[][];

  constructor(pattern: GridPattern) {
    this.pattern = pattern;
    this.cells = this.createCells()
    this.cellRows = this.createCellRows();
    this.cellColumns = this.createCellColumns();
  }

  createCellRows() : CellRow[] {
    return this.cells.map(cellRow => new CellRow(cellRow));
  }

  createCellColumns() : CellColumn[] {
    return _.zip(...this.cells).map(cellColumn => new CellColumn(cellColumn));
  }

  createCells() : Cell[][] {
    return this.pattern.map((row, rowIndex) => {
      return row.map((filled, columnIndex) => {
        const desiredState = filled === 1 ? CellState.FILLED : CellState.BLANK;

        return new Cell(rowIndex, columnIndex, filled === 1);
      });
    });
  }

  hasAllDesiredCellGroups() {
    return this.cellRows.every(row => row.completed) && this.cellColumns.every(column => column.completed);
  }

}