import tpl from './cell.component.html';
import "./cell.component.less";
import Cell from "../../domain/cell";
import {INgModelController} from "angular";

class CellComponentClass {
  private ngModel: INgModelController;
  private doPrimaryAction: Function;
  private doSecondaryAction: Function;
  private acceptDrag: boolean;
  private doDragAction: Function;
  private doDragEndAction: Function;

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

  doAction($event : JQueryMouseEventObject): void {
    if ($event.button === 0) {
      this.doPrimaryAction()
    } else if ($event.button === 1) {
      this.doSecondaryAction();
    }
  }

  onMouseEnter() {
    if (this.acceptDrag) {
      this.doDragAction();
    } else {
      this.doDragEndAction();
    }
  }

  onMouseUp() {
    if (this.acceptDrag) {
      this.doDragEndAction();
    }
  }

}

export default {
  template: tpl,
  bindings: {
    acceptDrag: '<',
    doPrimaryAction: '&',
    doSecondaryAction: '&',
    doDragAction: '&',
    doDragEndAction: '&'
  },
  require: {
    'ngModel': 'ngModel'
  },
  controller: CellComponentClass
}