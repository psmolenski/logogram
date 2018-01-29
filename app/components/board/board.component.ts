import tpl from './board.component.html';
import './board.component.less';
import Board from "../../domain/board";
import Cell from "../../domain/cell";
import {INgModelController} from "angular";

class BoardComponentController {
  private ngModel: INgModelController;
  private onToggleCellFill : Function;
  private onToggleCellFlag : Function;
  private isCellAcceptingDrag : Function;
  private onToggleDragState : Function;
  private onToggleDragEnd : Function;

  public cellsInRows: Cell[][];


  $onInit() {
    this.ngModel.$render = () => this.onBoardChange();
  }

  get board() : Board {
    return this.ngModel.$viewValue;
  }

  set board(newBoard: Board) {
    this.ngModel.$setViewValue(newBoard);
  }

  onBoardChange() {
    this.cellsInRows = this.board.cellsInRows.toArray().map(row => row.toArray());
  }

  toggleCellFill(cell: Cell) {
    this.onToggleCellFill({cell});
  }

  toggleCellFlag(cell: Cell) {
    this.onToggleCellFlag({cell});
  }

  toggleDragState(cell: Cell) {
    this.onToggleDragState({cell: cell});
  }

}

export {BoardComponentController};

export default {
  template: tpl,
  require: {
    ngModel: 'ngModel'
  },
  bindings: {
    groupsInRows: '<',
    groupsInColumns: '<',
    onToggleCellFill: '&',
    onToggleCellFlag: '&',
    isCellAcceptingDrag: '&',
    onToggleDragState: '&',
    onToggleDragEnd: '&'
  },
  controller: BoardComponentController
};