import tpl from './board.component.html';
import './board.component.less';
import Board from "../../domain/board";
import Cell from "../../domain/cell";
import {INgModelController, IParseService, IOnInit} from "angular";
import {CellComponentController} from "../cell/cell.component";
import * as _ from "lodash";
import CellDragHandler from "../../domain/cell-drag-handler";
import { CellColumn, CellRow } from '../../domain/group';
import { isUndefined } from 'util';

interface BoardComponentOptions {
  displayHeaders: boolean;
}

class BoardComponentController implements IOnInit{
  ngModel: INgModelController;
  size: string;
  toggleCellFillAction : Function;
  toggleCellFlagAction : Function;
  toggleUsingDraggedCellAction : Function;
  flagCellGroupAction : Function;
  dragEndAction : Function;
  customOptions: BoardComponentOptions;
  options: BoardComponentOptions = {
    displayHeaders: true
  };

  private cellComponents : CellComponentController[] = [];
  private dragHandler : CellDragHandler | null = null;

  $onInit(): void {
    this.options = _.extend(this.options, this.customOptions);
    console.log(this.options);
  }

  get board() : Board {
    return this.ngModel.$viewValue;
  }

  set board(newBoard: Board) {
    this.ngModel.$setViewValue(newBoard);
  }

  get cellRows() {
    return this.board.cellRows;
  }

  get cellColumns() {
    return this.board.cellColumns;
  }

  toggleCellFill(cell: Cell) {
    this.toggleCellFillAction({cell});
  }

  toggleCellFlag(cell: Cell) {
    this.toggleCellFlagAction({cell});
  }

  toggleDragState(draggedCell : Cell, cell: Cell) {
    this.toggleUsingDraggedCellAction({draggedCell, cell});
  }

  flagCellGroup(group: CellRow | CellColumn) {
    this.flagCellGroupAction({group});
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
    this.dragEndAction();
  }

  getCellAtPosition(x: number, y: number) : Cell | null {
    const componentAtPosition = _.find(this.cellComponents, cellComponent => cellComponent.containsPosition(x, y));

    if (!componentAtPosition) {
      return null;
    }

    return componentAtPosition.cell;
  }

  isColumnCompleted(columnIndex : number) : boolean {
    return false;
  }

  isRowCompleted(rowIndex : number) : boolean {
    return false;
  }

}

export {BoardComponentController};

export default {
  template: tpl,
  require: {
    ngModel: 'ngModel'
  },
  bindings: {
    size: '<',
    toggleCellFillAction: '&',
    toggleCellFlagAction: '&',
    toggleUsingDraggedCellAction: '&',
    flagCellGroupAction: '&',
    dragEndAction: '&',
    customOptions: '<options' 
  },
  controller: BoardComponentController
};