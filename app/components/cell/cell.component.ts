import tpl from './cell.component.html';
import "./cell.component.less";
import Cell from "../../domain/cell";

class CellComponentClass {
  private cell: Cell;
  private doPrimaryAction: Function;
  private doSecondaryAction: Function;
  private acceptDrag: boolean;
  private doDragAction: Function;
  private doDragEndAction: Function;

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
  templateUrl: tpl,
  bindings: {
    cell: '<',
    acceptDrag: '<',
    doPrimaryAction: '&',
    doSecondaryAction: '&',
    doDragAction: '&',
    doDragEndAction: '&'
  },
  controller: CellComponentClass
}