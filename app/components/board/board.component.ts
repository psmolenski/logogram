import tpl from './board.component.html';
import './board.component.less';
import Board from "../../domain/board";
import Cell from "../../domain/cell";
import {INgModelController, IParseService, IOnInit, IPostLink, IRootElementService, IScope} from "angular";
import {CellComponentController} from "../cell/cell.component";
import * as _ from "lodash";
import CellDragHandler from "../../domain/cell-drag-handler";
import { CellColumn, CellRow } from '../../domain/group';
import { isUndefined } from 'util';
import { TapHandler } from './tap-handler';

interface BoardComponentOptions {
  displayHeaders: boolean;
}

class BoardComponentController implements IOnInit, IPostLink{
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
  private tapHandler : TapHandler;

  constructor(readonly $scope: IScope, readonly $element: IRootElementService){}

  $onInit(): void {
    this.options = _.extend(this.options, this.customOptions);

    const handlerBuilder = TapHandler.builder();
    handlerBuilder.setSingleTapAction((cell: Cell) => {
      this.$scope.$applyAsync(() => {
        this.toggleCellFill(cell);
        this.dragStart(cell);
      });
    });

    handlerBuilder.setDoubleTapAction((cell: Cell) => {
      this.$scope.$applyAsync(() => {
        this.toggleCellFlag(cell);
        this.dragStart(cell);
      });
    });

    this.tapHandler = handlerBuilder.build();
  }

  $postLink(): void {
    this.$element.on('touchstart', (event) => {
      const cell = this.getCellFromEvent(event);

      if (cell === null) {
        return;
      }

      this.tapHandler.tap(cell);

      event.preventDefault();
    });

    this.$element.on('touchmove', (event : any) => {
      const cell = this.getCellFromEvent(event);

      if (cell === null) {
        return;
      }

      const touch = event.touches[0];
      const x = Math.floor(touch.clientX);
      const y = Math.floor(touch.clientY);

      this.$scope.$applyAsync(() => {
        this.dragMove(x, y);
      });

      event.preventDefault();
    });

    this.$element.on('touchend', (event) => {
      const cell = this.getCellFromEvent(event);

      if (cell === null) {
        return;
      }

      this.$scope.$applyAsync(() => {
        this.dragEndAction();
      });

      event.preventDefault();
    });

    this.$element.on('mousedown', (event) => {
      const cell = this.getCellFromEvent(event);

      if (cell === null) {
        return;
      }

      this.$scope.$applyAsync(() => {
        if (event.button === 0) {
          this.toggleCellFill(cell)
        } else if (event.button === 1) {
          this.toggleCellFlag(cell);
        }

        this.dragStart(cell);
      });
    });

    this.$element.on('mousemove', ($event) => {
      this.$scope.$applyAsync(() => {
        const x = Math.floor($event.clientX);
        const y =  Math.floor($event.clientY);

        this.dragMove(x, y);
      });
    });

    this.$element.on('mouseup', ($event) => {
      this.$scope.$applyAsync(() => {
        this.dragEnd();
      });
    });
  }

  getCellFromEvent(event: Event) : Cell | null{
    const targetNode = event.target as HTMLElement;
    const cellNode = targetNode.parentElement;
    
    if (cellNode === null || cellNode.nodeName !== 'CELL') {
      return null;
    }

    const cellComponent = _.find(this.cellComponents, cellComponent => cellComponent.$element[0] === cellNode);

    if (!cellComponent) {
      return null;
    }

    return cellComponent.cell;
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