import GridsRepository from "../../services/grids-repository.service";
import { MenuItemsList, ModalService } from "../../services/modal.service";
import './select-puzzle.view.less';
import { GridGroup } from "../../domain/grid";
import { StateService } from "@uirouter/core";

class SelectPuzzleViewController {
    readonly menuItems: MenuItemsList = {
        selectPuzzle: {
            text: 'Reset Game',
            action: () => this.resetCompletedGrids()
        },
        editor: {
            text: 'Editor',
            action: () => this.$state.go('editor')
        },
        continue: {
            text: 'Continue',
            action: () => { }
        }
    };

    constructor(readonly $state: StateService, readonly GridsRepositoryService: GridsRepository, readonly ModalService : ModalService){}    

    get gridsInGroups() {
        return this.GridsRepositoryService.gridsInGroups;
    }

    resetCompletedGrids() {
        this.ModalService
        .confirmation('Reset Game', 'Are you sure you want to reset all completed puzzles?')
        .then(() => {
            return this.GridsRepositoryService.resetCompletedGrids();
        })
        .catch(() => {});
    }

    getNumberOfCompletedGridsInGroup(gridGroup: GridGroup) {
        return this.GridsRepositoryService.getNumberOfCompletedGridsInGroup(gridGroup);
    }
}

export default SelectPuzzleViewController;