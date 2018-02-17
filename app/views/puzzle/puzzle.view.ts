import { IOnInit } from "angular";
import { StateService } from "@uirouter/core";
import AlertService from '../../services/alert.service'

class PuzzleViewController implements IOnInit {
    pattern: number[][] | null = null;


    constructor(readonly $state: StateService, readonly AlertService: AlertService) { }

    $onInit(): void {
        this.pattern = this.$state.params.pattern;
    }

    onPuzzleComplete(): void {
        this.AlertService.success('Congratulations').then(() => {
            this.$state.go('select-puzzle');
        });
    }

    showMenu(): void {
        this.AlertService.modal({
            className: 'menu-modal',
            buttons: {
                selectPuzzle: {
                    text: 'Select Puzzle',
                    className: 'btn--menu-item'
                },
                restart: {
                    text: 'Restart',
                    className: 'btn--menu-item'
                },
                close: {
                    text: 'Close',
                    className: 'btn--menu-item'
                }
            }
        }).then(selectedItem => {
            switch(selectedItem) {
                case 'selectPuzzle':
                    this.$state.go('select-puzzle');
                    break;
                case 'restart':
                    this.$state.reload();
                    break;
            }
        });
    }
}

export default PuzzleViewController;