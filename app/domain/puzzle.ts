import Board from "./board";
import Cell from "./cell";
import * as _ from "lodash";
import Group from "./group";
import { GridPattern } from "../data/grids";

class Puzzle {
  readonly board: Board;
  completed: boolean;


  constructor(pattern: GridPattern){
    this.board = new Board(pattern);
  }

  toggleCellFill(cell: Cell) {
    if (cell.isBlank()) {
      cell.fill();
    } else if (cell.isFilled()) {
      cell.blank();
    }
  }

  toggleCellFlag(cell: Cell) {
    if (cell.isFlagged()) {
      cell.blank();
    } else {
      cell.flag();
    }
  }

  applyStateOfDraggedCell(draggedCell : Cell, cell: Cell) {
    if (draggedCell.isFilled() && cell.isBlank()) {
      cell.fill();
    } else if (draggedCell.isBlank() && cell.isFilled()) {
      cell.blank();
    } else if (draggedCell.isFlagged() && cell.isBlank()) {
      cell.flag();
    } else if (draggedCell.isBlank() && cell.isFlagged()) {
      cell.blank();
    }
  }

  checkIfPuzzleIsSolved() {
    this.completed = this.board.hasAllCellsInDesiredState();
  }
}

export default Puzzle;