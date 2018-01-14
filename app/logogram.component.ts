import tpl from './logogram.component.html';

class LogogramComponentController {
  pattern: number[][];

  $onInit() {
    this.pattern = [
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