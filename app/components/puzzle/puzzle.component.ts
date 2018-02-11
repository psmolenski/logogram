import tpl from './puzzle.component.html';
import Board from "../../domain/board";
import Puzzle from "../../domain/puzzle";
import {IOnInit} from "angular";

class PuzzleComponentController implements IOnInit{
  pattern: number[][];
  puzzle: Puzzle;

  $onInit() {
    this.puzzle = new Puzzle(this.pattern);
  }

  get board(): Board {
    return this.puzzle.board;
  }
}

export default {
  controller: PuzzleComponentController,
  bindings: {
    pattern: '<'
  },
  template: tpl
}