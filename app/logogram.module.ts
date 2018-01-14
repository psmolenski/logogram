import * as angular from "angular";
import boardComponent from './components/board/board.component';
import cellComponent from './components/cell/cell.component';
import logogramComponent from './logogram.component';

export default angular.module('logogram', [])
  .component('logogram', logogramComponent)
  .component('board', boardComponent)
  .component('cell', cellComponent);
