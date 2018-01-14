import Cell from "./cell";

export default class Board {
  private cells: Cell[][];

  constructor(pattern: number[][]) {
    this.cells = pattern.map(row => row.map(filled => new Cell(filled === 1)));
  }
}