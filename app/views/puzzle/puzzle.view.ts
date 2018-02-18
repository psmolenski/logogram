import { IOnInit } from "angular";
import { StateService } from "@uirouter/core";
import AlertService from '../../services/alert.service'
import Grid from "../../domain/grid";
import UserStorage from "../../services/user-storage.service";
import GridsRepository from "../../services/grids-repository.service";

class PuzzleViewController implements IOnInit {
    grid: Grid;

    constructor(readonly $state: StateService, readonly AlertService: AlertService, readonly GridsRepositoryService : GridsRepository) { }

    $onInit(): void {
        this.grid = this.$state.params.grid;
    }

    onPuzzleComplete(): void {
        this.GridsRepositoryService.markGridAsCompleted(this.grid);
        
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
                continue: {
                    text: 'Continue',
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