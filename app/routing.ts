import puzzleViewTpl from './views/puzzle.view.html';
import selectPuzzleViewTpl from './views/select-puzzle.view.html';
import { StateProvider, UrlRouterProvider } from '@uirouter/angularjs';
import PuzzleViewController from './views/puzzle.view';
import SelectPuzzleViewController from './views/select-puzzle.view';

export default function routing($stateProvider : StateProvider, $urlRouterProvider : UrlRouterProvider) {
    $stateProvider
    .state('select-puzzle', {
        url: '/select-puzzle',
        template: selectPuzzleViewTpl,
        controller: SelectPuzzleViewController,
        controllerAs: '$ctrl'
    })
    .state('puzzle', {
        url: '/puzzle',
        template: puzzleViewTpl,
        controller: PuzzleViewController,
        controllerAs: '$ctrl',
        params: {
            pattern: {
                raw: true
            }
        }
    });

    $urlRouterProvider.otherwise('/select-puzzle');
}

routing.$inject = ['$stateProvider', '$urlRouterProvider'];