import Grid, { createGridFromPattern } from "../domain/grid";
import UserStorage from "./user-storage.service";
import * as _ from 'lodash';

const patterns = [
    [[1,1,0,1,1],[1,1,0,1,1],[0,0,0,0,0],[1,0,0,0,1],[0,1,1,1,0]],
    [[0,1,1,0,0],[0,0,1,0,0],[1,1,1,1,1],[1,0,1,0,1],[1,1,1,0,0]],
    [[1,0,1,0,1],[1,1,1,1,1],[0,1,1,1,0],[0,1,0,1,0],[0,1,1,1,0]],
    [[0,0,1,0,0],[0,1,1,1,0],[1,1,1,1,1],[0,0,1,0,0],[0,1,1,1,0]],
    [[0,1,1,1,0],[0,1,0,1,0],[1,1,1,1,1],[1,0,0,0,1],[0,1,1,1,0]],
    [[0,0,0,1,1],[0,0,1,1,1],[0,1,1,0,1],[1,1,0,0,1],[1,1,1,1,1]],
    [[1,1,1,1,1],[1,0,1,0,1],[1,1,1,0,1],[1,0,1,0,1],[1,1,1,1,1]],
    [[1,0,1,0,1],[0,1,1,1,0],[1,1,0,1,1],[0,1,1,1,0],[1,0,1,0,1]],
    [[1,1,1,1,1],[0,1,1,1,0],[0,0,1,0,0],[0,1,0,1,0],[1,1,1,1,1]],
    [[0,0,0,1,0],[1,0,1,1,1],[0,1,1,1,0],[0,1,0,1,0],[0,1,0,1,0]],
    [[1,0,1,0,1],[0,1,0,1,0],[1,0,1,0,1],[0,1,0,1,0],[1,0,1,0,1]],
    [[0,1,0,1,0],[1,1,1,1,1],[1,1,1,1,1],[1,0,1,0,1],[1,0,0,0,1]],
    [[0,1,1,1,0],[1,1,1,1,1],[1,0,1,0,1],[1,1,1,1,1],[0,1,0,1,0]],
    [[1,0,0,1,1],[1,1,1,1,0],[0,1,0,1,0],[0,1,1,1,1],[1,1,0,0,1]],
    [[1,0,1,0,1],[1,0,1,0,1],[1,0,1,0,1],[0,1,1,1,0],[0,0,1,0,0]],
    [[0,1,0,1,0],[1,1,1,1,1],[0,1,0,1,0],[1,1,1,1,1],[0,1,0,1,0]],
    [[1,1,1,1,1],[0,0,0,1,0],[0,0,1,0,0],[0,1,0,0,0],[1,1,1,1,1]],
    [[1,1,1,1,1],[1,0,1,0,1],[1,1,1,1,1],[1,0,0,0,0],[1,0,0,0,0]],
    [[0,1,1,1,0],[1,1,0,1,1],[1,0,0,0,1],[1,1,0,1,1],[0,1,1,1,0]],
    [[1,1,1,1,1],[1,0,0,0,0],[1,1,1,1,1],[0,0,0,0,1],[1,1,1,1,1]],
];

class GridsRepository {
    readonly completedGridsIds: number[];
    readonly grids : Grid[];

    constructor(readonly UserStorageService : UserStorage) {
        this.completedGridsIds = this.UserStorageService.getItem('completedGridsIds') || [];
        this.grids = patterns.map((pattern, index) => createGridFromPattern(index, pattern, _.includes(this.completedGridsIds, index)));
    }

    markGridAsCompleted(grid : Grid) {
        grid.completed = true;
        this.completedGridsIds.push(grid.id);
        this.UserStorageService.setItem('completedGridsIds', this.completedGridsIds);
    }

    resetCompletedGrids() {
        this.grids.forEach(grid => grid.completed = false);
        this.completedGridsIds.length = 0;
        this.UserStorageService.setItem('completedGridsIds', this.completedGridsIds); 
    }
}

export default GridsRepository;