export type GridPattern = number[][];

export interface GridPatternGroup {
    name: string;
    patterns: GridPattern[];
}

const gridGroups : GridPatternGroup[] = [
    {
        name: '5x5',
        patterns: require('./5x5.json')
    }
];

export default gridGroups;