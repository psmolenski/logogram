interface Grid {
 readonly pattern : number[][];
 readonly width : number;
 readonly height : number;
 completed : boolean;
}

function createGridFromPattern(pattern: number[][]) : Grid {
    return {
        pattern: pattern,
        width: pattern[0].length,
        height: pattern.length,
        completed: false
    }
}

export {createGridFromPattern};
export default Grid;