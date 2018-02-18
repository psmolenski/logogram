interface Grid {
    readonly id: number;
    readonly pattern: number[][];
    readonly width: number;
    readonly height: number;
    completed: boolean;
}

function createGridFromPattern(id : number, pattern: number[][], completed = false): Grid {
    return {
        id: id,
        pattern: pattern,
        width: pattern[0].length,
        height: pattern.length,
        completed: completed
    }
}

export { createGridFromPattern };
export default Grid;