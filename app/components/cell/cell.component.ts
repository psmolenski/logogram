import tpl from './cell.component.html';
import "./cell.component.less";

class CellComponentClass {
  private filled: boolean;
  private flagged: boolean;

  getCssClass() : object {
    return {
    'lgg-board__cell--filled': this.filled,
    'lgg-board__cell--flagged': this.flagged
    }
  }
}

export default {
  templateUrl: tpl,
  bindings: {
    filled: '<',
    flagged: '<'
  },
  controller: CellComponentClass
}