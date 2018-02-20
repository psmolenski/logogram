export type GridPattern = number[][];

export interface GridPatternGroup {
    name: string;
    patterns: GridPattern[];
    gridSize: string;
}

const gridGroups : GridPatternGroup[] = [
    {
        name: '5x5',
        patterns: require('./5x5.json'),
        gridSize: 'small'
    },
    {
        name: '10x10',
        patterns: require('./10x10.json'),
        gridSize: 'medium'
    },
];

export default gridGroups;