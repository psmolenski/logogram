import puzzleViewTpl from './views/puzzle/puzzle.view.html';
import selectPuzzleViewTpl from './views/select-puzzle/select-puzzle.view.html';
import editorViewTpl from './views/editor/editor.view.html';
import { StateProvider, UrlRouterProvider } from '@uirouter/angularjs';
import PuzzleViewController from './views/puzzle/puzzle.view';
import SelectPuzzleViewController from './views/select-puzzle/select-puzzle.view';
import EditorViewController from './views/editor/editor.view';

export default function routing($stateProvider : StateProvider, $urlRouterProvider : UrlRouterProvider) {
    $stateProvider
    .state('select-puzzle', {
        template: selectPuzzleViewTpl,
        controller: SelectPuzzleViewController,
        controllerAs: '$ctrl'
    })
    .state('puzzle', {
        template: puzzleViewTpl,
        controller: PuzzleViewController,
        controllerAs: '$ctrl',
        params: {
            grid: {
                raw: true
            }
        }
    })
    .state('editor', {
        template: editorViewTpl,
        controller: EditorViewController,
        controllerAs: '$ctrl'
    });

    $urlRouterProvider.otherwise(($injector) => {
        $injector.get('$state').go('select-puzzle');
    });
}

routing.$inject = ['$stateProvider', '$urlRouterProvider'];