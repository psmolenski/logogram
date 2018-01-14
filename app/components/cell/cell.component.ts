import tpl from './cell.component.html';
import "./cell.component.less";
import Cell from "../../domain/cell";

class CellComponentClass {
  private cell: Cell;
  private doPrimaryAction: Function;
  private doSecondaryAction: Function;

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

}

export default {
  templateUrl: tpl,
  bindings: {
    cell: '<',
    doPrimaryAction: '&',
    doSecondaryAction: '&'
  },
  controller: CellComponentClass
}