import GridsRepository from "../../services/grids-repository.service";
import { MenuItemsList, ModalService } from "../../services/modal.service";
import './select-puzzle.view.less';
import { GridGroup } from "../../domain/grid";

class SelectPuzzleViewController {
    readonly menuItems: MenuItemsList = {
        selectPuzzle: {
            text: 'Reset Game',
            action: () => this.resetCompletedGrids()
        },
        continue: {
            text: 'Continue',
            action: () => { }
        }
    };

    constructor(readonly GridsRepositoryService: GridsRepository, readonly ModalService : ModalService){}    

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