import Board from "./board";
import Cell from "./cell";
import * as _ from "lodash";
import CellGroup, { CellColumn, CellRow } from "./group";
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
    } else {
      return;
    }

    this.cellStateChanged(cell);
  }

  toggleCellFlag(cell: Cell) {
    if (cell.isFlagged()) {
      cell.blank();
    } else {
      cell.flag();
    } 

    this.cellStateChanged(cell);
  }

  flagBlankCellsInCompletedGroup(group : CellRow | CellColumn){
    if (!group.completed) {
      return;
    }

    group.cells.forEach(cell => {
      if (cell.isBlank()) {
        cell.flag();
        this.cellStateChanged(cell);
      }
    });
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
    } else {
      return;
    }

    this.cellStateChanged(cell);
  }

  cellStateChanged(cell: Cell) {
    this.board.cellRows[cell.row].updateCellGroups();
    this.board.cellColumns[cell.column].updateCellGroups();
  }

  checkIfPuzzleIsSolved() {
    this.completed = this.board.hasAllDesiredCellGroups();
  }
}

export default Puzzle;