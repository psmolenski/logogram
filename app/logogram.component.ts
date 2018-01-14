import tpl from './logogram.component.html';

class LogogramComponentController {
  board: number[][];

  $onInit() {
    this.board = [
      [0, 0, 1, 1, 0, 0],
      [0, 0, 1, 1, 0, 0],
      [1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1],
      [0, 0, 1, 1, 0, 0],
      [0, 0, 1, 1, 0, 0]]
  }
}

export default {
  templateUrl: tpl,
  controller: LogogramComponentController
}