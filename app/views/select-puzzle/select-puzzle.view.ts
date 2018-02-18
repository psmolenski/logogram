import GridsRepository from "../../services/grids-repository.service";

class SelectPuzzleViewController {
    constructor(readonly GridsRepositoryService: GridsRepository){}    

    get grids() {
        return this.GridsRepositoryService.grids;
    }
}

export default SelectPuzzleViewController;