import tpl from './cell.component.html';
import "./cell.component.less";
import Cell from "../../domain/cell";
import {INgModelController, IScope} from "angular";
import {BoardComponentController} from "../board/board.component";

class CellComponentController {
  private ngModel: INgModelController;
  private boardController: BoardComponentController;
  private toggleFillAction: Function;
  private toggleFlagAction: Function;
  private dragMoveAction: Function;
  private dragEndAction: Function;
  private dragStartAction: Function;

  private tapHandler : TapHandler;

  constructor(public $scope : IScope, public $element : JQLite) {}

  $onInit() {
    this.boardController.registerCellComponent(this);

    const handlerBuilder = TapHandler.builder();
    handlerBuilder.setSingleTapAction(() => {
      this.$scope.$applyAsync(() => {
        this.toggleFillAction();
        this.dragStartAction({cell : this.cell});
      });
    });

    handlerBuilder.setDoubleTapAction(() => {
      this.$scope.$applyAsync(() => {
        this.toggleFlagAction();
        this.dragStartAction({cell : this.cell});
      });
    });

    this.tapHandler = handlerBuilder.build();

  }

  $postLink() {
    this.$element.on('touchstart', (event) => {
      this.tapHandler.tap();

      event.preventDefault();
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
          this.toggleFillAction()
        } else if ($event.button === 1) {
          this.toggleFlagAction();
        }

        this.dragStartAction({cell : this.cell});
      });
    });

    this.$element.on('mousemove', ($event) => {
      this.$scope.$applyAsync(() => {
        this.dragMoveAction({
          x: Math.floor($event.clientX),
          y: Math.floor($event.clientY)
        });
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

class TapHandler {
  private singleTapAction : Function = () => {};
  private doubleTapAction : Function = () => {};

  private secondTapTimeoutId : number | null = null;

  constructor(singleTapAction : Function, doubleTapAction : Function) {
    this.singleTapAction = singleTapAction;
    this.doubleTapAction = doubleTapAction;
  }

  tap() {
    if (this.secondTapTimeoutId != null) {
      this.doubleTapAction();
      clearTimeout(this.secondTapTimeoutId);
      this.secondTapTimeoutId = null;
    } else {
      this.singleTapAction();

      this.secondTapTimeoutId = <any> setTimeout(() => {
        this.secondTapTimeoutId = null;
      }, 300);
    }
  }

  static builder() {
    return new TapHandlerBuilder();
  }
}

class TapHandlerBuilder {
  private singleTapAction : Function = () => {};
  private doubleTapAction : Function = () => {};

  setSingleTapAction(action : Function) {
    this.singleTapAction = action;
  }

  setDoubleTapAction(action : Function) {
    this.doubleTapAction = action;
  }

  build() {
    return new TapHandler(this.singleTapAction, this.doubleTapAction);
  }
}

export {CellComponentController};

export default {
  template: tpl,
  bindings: {
    toggleFillAction: '&',
    toggleFlagAction: '&',
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