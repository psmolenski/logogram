import tpl from './cell.component.html';
import "./cell.component.less";
import Cell from "../../domain/cell";
import {INgModelController, IScope} from "angular";
import {BoardComponentController} from "../board/board.component";

class CellComponentController {
  private ngModel: INgModelController;
  private boardController: BoardComponentController;
  private doPrimaryAction: Function;
  private doSecondaryAction: Function;
  private dragMoveAction: Function;
  private dragEndAction: Function;
  private dragStartAction: Function;

  constructor(public $scope : IScope, public $element : JQLite) {}

  $onInit() {
    this.boardController.registerCellComponent(this);
  }

  $postLink() {
    this.$element.on('touchstart', ($event) => {
      this.$scope.$applyAsync(() => {
        this.doPrimaryAction();
        this.dragStartAction({cell : this.cell});
      });

      $event.preventDefault();
    });

    this.$element.on('touchmove', ($event : any) => {
      const touch = $event.touches[0];

      this.$scope.$applyAsync(() => {
        this.dragMoveAction({
          x: Math.floor(touch.clientX),
          y: Math.floor(touch.clientY)
        });
      });

      $event.preventDefault();
    });

    this.$element.on('touchend', ($event) => {
      this.$scope.$applyAsync(() => {
        this.dragEndAction();
      });

      $event.preventDefault();
    });



    this.$element.on('mousedown', ($event) => {
      this.$scope.$applyAsync(() => {
        if ($event.button === 0) {
          this.doPrimaryAction()
        } else if ($event.button === 1) {
          this.doSecondaryAction();
        }
      });
    });

    this.$element.on('mouseup', ($event) => {
      this.$scope.$applyAsync(() => {
        this.dragEndAction();
      });
    });

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
  bindings: {
    acceptDrag: '<',
    doPrimaryAction: '&',
    doSecondaryAction: '&',
    dragMoveAction: '&',
    dragStartAction: '&',
    dragEndAction: '&'
  },
  require: {
    'ngModel': 'ngModel',
    'boardController': '^board'
  },
  controller: CellComponentController
}