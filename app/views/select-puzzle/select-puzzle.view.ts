import GridsRepository from "../../services/grids-repository.service";
import { MenuItemsList, ModalService } from "../../services/modal.service";
import './select-puzzle.view.less';

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

    get grids() {
        return this.GridsRepositoryService.grids;
    }

    get numberOfGrids() {
        return this.GridsRepositoryService.grids.length;
    }

    get numberOfCompletedGrids() {
        return this.GridsRepositoryService.completedGridsIds.length;
    }

    resetCompletedGrids() {
        this.ModalService
        .confirmation('Reset Game', 'Are you sure you want to reset all completed puzzles?')
        .then(() => {
            return this.GridsRepositoryService.resetCompletedGrids();
        })
        .catch(() => {});
    }
}

export default SelectPuzzleViewController;