import * as angular from "angular";
import '@uirouter/angularjs';
import boardComponent from './components/board/board.component';
import cellComponent from './components/cell/cell.component';
import logogramComponent from './logogram.component';
import puzzleComponent from './components/puzzle/puzzle.component';
import routing from "./routing";
import AletService from "./services/alert.service";
import GridsRepositoryService from "./services/grids-repository.service";
import UserStorageService from "./services/user-storage.service";

export default angular.module('logogram', ['ui.router'])
  .component('logogram', logogramComponent)
  .component('puzzle', puzzleComponent)
  .component('board', boardComponent)
  .component('cell', cellComponent)
  .service('AlertService', AletService)
  .service('GridsRepositoryService', GridsRepositoryService)
  .service('UserStorageService', UserStorageService)
  .config(routing);
