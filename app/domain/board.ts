import Cell from "./cell";

export default class Board {
  private cells: Cell[][];

  constructor(pattern: number[][]) {
    this.cells = pattern.map((row, rowIndex) => row.map((filled, columnIndex) => new Cell(rowIndex, columnIndex, filled === 1)));
  }
}