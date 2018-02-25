import { GridPatternGroup } from "../data/grids";
import * as _ from 'lodash';

export interface Grid {
    readonly pattern: number[][];
    readonly width: number;
    readonly height: number;
    readonly size: string;
    readonly progress: GridProgress;
}

export interface GridGroup {
    name: string;
    grids: Grid[];
}

export interface GridProgress {
    completed: boolean;
}

function createGridFromPattern(group: GridPatternGroup, pattern: number[][], gridProgress: GridProgress): Grid {
    return {
        pattern: pattern,
        width: pattern[0].length,
        height: pattern.length,
        size: group.gridSize,
        progress: gridProgress || {completed: false}
    }
}

export function createEmptyGridPattern(numberOfRows: number, numberOfColumns: number) {
    return _.range(numberOfRows).map(() => _.fill(Array(numberOfColumns), 0));
}

export { createGridFromPattern };
export default Grid;