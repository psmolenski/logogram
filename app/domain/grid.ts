interface Grid {
 readonly pattern : number[][];
 readonly width : number;
 readonly height : number;
}

function createGridFromPattern(pattern: number[][]) : Grid {
    return {
        pattern: pattern,
        width: pattern[0].length,
        height: pattern.length
    }
}

export {createGridFromPattern};
export default Grid;