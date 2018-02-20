import { GridPatternGroup } from "../data/grids";

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

export { createGridFromPattern };
export default Grid;