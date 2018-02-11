import tpl from './board.component.html';
import './board.component.less';
import Board from "../../domain/board";
import Cell from "../../domain/cell";
import {INgModelController} from "angular";
import {CellComponentController} from "../cell/cell.component";
import * as _ from "lodash";
import CellDragHandler from "../../domain/cell-drag-handler";

class BoardComponentController {
  private ngModel: INgModelController;
  private onToggleCellFill : Function;
  private onToggleCellFlag : Function;
  private onToggleDragState : Function;
  private onDragEnd : Function;

  private cellComponents : CellComponentController[] = [];
  private dragHandler : CellDragHandler | null = null;

  get board() : Board {
    return this.ngModel.$viewValue;
  }

  set board(newBoard: Board) {
    this.ngModel.$setViewValue(newBoard);
  }

  get cellsInRows() {
    return this.board.cellsInRows;
  }

  toggleCellFill(cell: Cell) {
    this.onToggleCellFill({cell});
  }

  toggleCellFlag(cell: Cell) {
    this.onToggleCellFlag({cell});
  }

  toggleDragState(draggedCell : Cell, cell: Cell) {
    this.onToggleDragState({draggedCell, cell});
  }

  registerCellComponent(cellComponent: CellComponentController) {
    this.cellComponents.push(cellComponent);
  }

  dragStart(draggedCell: Cell) {
    const handlerBuilder = CellDragHandler.builder();
    handlerBuilder.setDraggedCell(draggedCell);
    handlerBuilder.setCellHitAction((draggedCell : Cell, hitCell : Cell) => {
      this.toggleDragState(draggedCell, hitCell);
    });
    handlerBuilder.setCellMissAction(() => {
      this.dragEnd();
    });

    this.dragHandler = handlerBuilder.build();
  }

  dragMove(x: number, y : number) {
    if (this.dragHandler == null) {
      return;
    }

    const cellAtPosition = this.getCellAtPosition(x, y);

    if (cellAtPosition) {
      this.dragHandler.moveOverCell(cellAtPosition);
    }
  }

  dragEnd() {
    this.dragHandler = null;
    this.onDragEnd();
  }

  getCellAtPosition(x: number, y: number) : Cell | null {
    const componentAtPosition = _.find(this.cellComponents, cellComponent => cellComponent.containsPosition(x, y));

    if (!componentAtPosition) {
      return null;
    }

    return componentAtPosition.cell;
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
    onToggleDragState: '&',
    onDragEnd: '&'
  },
  controller: BoardComponentController
};