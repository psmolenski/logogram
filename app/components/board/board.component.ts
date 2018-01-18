import tpl from './board.component.html';
import './board.component.less';
import Board from "../../domain/board";
import Cell from "../../domain/cell";

class BoardComponentController {
  private pattern: number[][];
  private board: Board;
  private draggedCell: Cell | null = null;

  $onInit() {
    this.board = new Board(this.pattern);
  }

  toggleCellFill(cell: Cell) {
    if (cell.isBlank()) {
      cell.fill();
    } else if (cell.isFilled()) {
      cell.clear();
    }

    this.draggedCell = cell;
  }

  toggleCellFlag(cell: Cell) {
    if (cell.isBlank()) {
      cell.flag();
    } else if (cell.isFlagged()) {
      cell.clear();
    }

    this.draggedCell = cell;
  }

  toggleDragState(cell: Cell) {
    if (this.draggedCell === null) {
      return;
    }

    if (this.draggedCell.isFilled() && cell.isBlank()) {
      cell.fill();
    } else if (this.draggedCell.isBlank() && cell.isFilled()) {
      cell.clear();
    } else if (this.draggedCell.isFlagged() && cell.isBlank()) {
      cell.flag();
    } else if (this.draggedCell.isBlank() && cell.isFlagged()) {
      cell.clear();
    }
  }

  isDragging() {
    return this.draggedCell != null;
  }

  clearDraggedCell() {
    this.draggedCell = null;
  }

  isCellAcceptingDrag(cell: Cell) {
    return this.isDragging() && (this.isInSameRowAsDraggedCell(cell) || this.isInSameColumnAsDraggedCell(cell));
  }

  isInSameRowAsDraggedCell(cell: Cell) {
    if (this.draggedCell === null) {
      return false;
    }

    return cell.row === this.draggedCell.row;
  }

  isInSameColumnAsDraggedCell(cell: Cell) {
    if (this.draggedCell === null) {
      return false;
    }

    return cell.column === this.draggedCell.column;
  }
}

export default {
  templateUrl: tpl,
  bindings: {
    pattern: '<'
  },
  controller: BoardComponentController
};