import tpl from './puzzle.component.html';
import Board from "../../domain/board";
import Puzzle from "../../domain/puzzle";
import {IOnInit, IScope} from "angular";

class PuzzleComponentController implements IOnInit{
  pattern: number[][];
  completeAction: Function;
  puzzle: Puzzle;

  constructor(readonly $scope: IScope) {}

  $onInit() {
    this.puzzle = new Puzzle(this.pattern);

    this.$scope.$watch(() => this.puzzle.completed, (value) => {
      if (value === true) {
        this.completeAction();
      }
    });
  }

  get board(): Board {
    return this.puzzle.board;
  }
}

export default {
  controller: PuzzleComponentController,
  bindings: {
    pattern: '<',
    completeAction: '&'
  },
  template: tpl
}