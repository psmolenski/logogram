import tpl from './board.component.html';
import './board.component.less';
import Board from "../../domain/board";
import Cell from "../../domain/cell";

class BoardComponentController {
  private pattern: number[][];
  private board: Board;

  $onInit() {
    this.board = new Board(this.pattern);
  }

  toggleCellFill(cell: Cell) {
    if (cell.isBlank()) {
      cell.fill();
    } else if (cell.isFilled()) {
      cell.clear();
    }
  }

  toggleCellFlag(cell: Cell) {
    if (cell.isBlank()) {
      cell.flag();
    } else if (cell.isFlagged()) {
      cell.clear();
    }
  }
}

export default {
  templateUrl: tpl,
  bindings: {
    pattern: '<'
  },
  controller: BoardComponentController
};