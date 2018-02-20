import Grid, { createGridFromPattern, GridGroup, GridProgress } from "../domain/grid";
import UserStorage from "./user-storage.service";
import * as _ from 'lodash';
import gridInGroups, { GridPatternGroup, GridPattern } from '../data/grids';

class GridsRepository {
    readonly gridsInGroups: GridGroup[];

    constructor(readonly UserStorageService: UserStorage) {
        const gridProgressesInGroups: GridProgress[][] = this.UserStorageService.getItem('gridProgressesInGroups') || [];
        
        this.gridsInGroups = _.zip<GridPatternGroup | GridProgress[]>(gridInGroups, gridProgressesInGroups)
            .map((pair) => {
                const gridGroup = <GridPatternGroup> pair[0];
                const gridProgressGroup = <GridProgress[]> pair[1] || [];

                return {
                    name: gridGroup.name,
                    grids: _.zip<GridPattern|GridProgress>(gridGroup.patterns, gridProgressGroup).map(pair => {
                        const pattern = <GridPattern> pair[0];
                        const gridProgress = <GridProgress> pair[1];

                        return createGridFromPattern(gridGroup, pattern, gridProgress);
                    })
                };
            });

        this.saveProgress();
    }

    getNumberOfCompletedGridsInGroup(gridGroup: GridGroup) {
        return gridGroup.grids.reduce((sum, grid) => grid.progress.completed ? sum + 1 : sum, 0);
    }

    markGridAsCompleted(grid: Grid) {
        grid.progress.completed = true;
        this.saveProgress();
    }

    saveProgress() {
        const gridProgressesInGroups = this.gridsInGroups.map(gridGroup => gridGroup.grids.map(grid => grid.progress));
        this.UserStorageService.setItem('gridProgressesInGroups', gridProgressesInGroups);
    }

    resetCompletedGrids() {
        this.gridsInGroups.forEach(gridGroup => gridGroup.grids.forEach(grid => grid.progress.completed = false));
        this.saveProgress();
    }
}

export default GridsRepository;