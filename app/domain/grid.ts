export interface Grid {
    readonly pattern: number[][];
    readonly width: number;
    readonly height: number;
    readonly progress: GridProgress;
}

export interface GridGroup {
    name: string;
    grids: Grid[];
}

export interface GridProgress {
    completed: boolean;
}

function createGridFromPattern(pattern: number[][], gridProgress: GridProgress): Grid {
    return {
        pattern: pattern,
        width: pattern[0].length,
        height: pattern.length,
        progress: gridProgress || {completed: false}
    }
}

export { createGridFromPattern };
export default Grid;