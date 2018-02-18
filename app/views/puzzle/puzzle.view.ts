import { IOnInit } from "angular";
import { StateService } from "@uirouter/core";
import ModalService, { MenuItemsList } from '../../services/modal.service'
import Grid from "../../domain/grid";
import UserStorage from "../../services/user-storage.service";
import GridsRepository from "../../services/grids-repository.service";

class PuzzleViewController implements IOnInit {
    grid: Grid;
    readonly menuItems: MenuItemsList = {
        selectPuzzle: {
            text: 'Select Puzzle',
            action: () => this.$state.go('select-puzzle')
        },
        restart: {
            text: 'Restart',
            action: () => this.$state.reload()
        },
        continue: {
            text: 'Continue',
            action: () => { }
        }
    };

    constructor(readonly $state: StateService, readonly ModalService: ModalService, readonly GridsRepositoryService : GridsRepository) { }

    $onInit(): void {
        this.grid = this.$state.params.grid;
    }

    onPuzzleComplete(): void {
        this.GridsRepositoryService.markGridAsCompleted(this.grid);
        
        this.ModalService.success('Congratulations').then(() => {
            this.$state.go('select-puzzle');
        });
    }
}

export default PuzzleViewController;