import tpl from './cell.component.html';
import "./cell.component.less";
import Cell from "../../domain/cell";
import {INgModelController, IOnInit} from "angular";
import {BoardComponentController} from "../board/board.component";

class CellComponentController implements IOnInit{
  private ngModel: INgModelController;
  private boardController: BoardComponentController;

  constructor(readonly $element : JQLite) {}

  $onInit() {
    this.boardController.registerCellComponent(this);
  }

  get cell() : Cell {
    return this.ngModel.$viewValue;
  }

  set cell(newCell) {
    this.ngModel.$setViewValue(newCell);
  }

  getCssClass() : object {
    return {
    'lgg-board__cell--filled': this.cell.isFilled(),
    'lgg-board__cell--flagged': this.cell.isFlagged()
    }
  }

  containsPosition(x : number, y: number) : boolean {
    const cellBoundingRect = this.$element[0].getBoundingClientRect();

    return cellBoundingRect.left <= x && cellBoundingRect.right >= x && cellBoundingRect.top <= y && cellBoundingRect.bottom >= y;
  }

}

export {CellComponentController};

export default {
  template: tpl,
  require: {
    'ngModel': 'ngModel',
    'boardController': '^board'
  },
  controller: CellComponentController
}