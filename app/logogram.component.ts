import tpl from './logogram.component.html';
import {IOnInit} from "angular";

class LogogramComponentController implements IOnInit{
  pattern: number[][];

  $onInit() {
    this.pattern = [
      [0, 0, 1, 1, 0, 0],
      [0, 0, 1, 1, 0, 0],
      [1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1],
      [0, 0, 1, 1, 0, 0],
      [1, 0, 1, 1, 0, 1]
    ];

    // this.pattern = [
    //   [1, 0],
    //   [0, 1]
    // ];

  }

}

export default {
  template: tpl,
  controller: LogogramComponentController
}