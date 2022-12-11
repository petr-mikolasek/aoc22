import {readFileIntoString} from '../input';

const rawInput: string = readFileIntoString('src/inputs/day8.txt');
const treeMap: number[][] = rawInput.split('\r\n').map((l) => l.split('').map((t) => parseInt(t)));

const partOne = (treeMap: number[][]): number => {
    const sizeX = treeMap[0].length;
    const sizeY = treeMap.length;
    const visibleMap: number[][] = new Array(sizeY).fill([]).map((l) => new Array(sizeX).fill(0));

    for (let y = 0; y < sizeY; y++) {
        let treeHeight = -1;
        for (let x = 0; x < sizeX; x++) {
            if (treeMap[y][x] > treeHeight) {
                visibleMap[y][x]++;
                treeHeight = treeMap[y][x];
            }
        }
        treeHeight = -1;
        for (let x = sizeX - 1; x >= 0; x--) {
            if (treeMap[y][x] > treeHeight) {
                visibleMap[y][x]++;
                treeHeight = treeMap[y][x];
            }
        }
    }

    for (let x = 0; x < sizeY; x++) {
        let treeHeight = -1;
        for (let y = 0; y < sizeY; y++) {
            if (treeMap[y][x] > treeHeight) {
                visibleMap[y][x]++;
                treeHeight = treeMap[y][x];
            }
        }
        treeHeight = -1;
        for (let y = sizeY - 1; y >= 0; y--) {
            if (treeMap[y][x] > treeHeight) {
                visibleMap[y][x]++;
                treeHeight = treeMap[y][x];
            }
        }
    }

    let visibleTrees = 0;
    for (let y = 0; y < sizeY; y++) {
        for (let x = 0; x < sizeX; x++) {
            if (visibleMap[y][x] > 0) visibleTrees++;
        }
    }

    return visibleTrees;
};

const partTwo = (treeMap: number[][]): number => {
    const sizeX = treeMap[0].length;
    const sizeY = treeMap.length;
    let bestScenicScore = 0;

    const getScore = (y: number, x: number): number => {
        const treeHeight = treeMap[y][x];
        let score = 1;

        let visibility = 0;
        for (let yy = y + 1; yy < sizeY; yy++) {
            visibility++;
            if (treeMap[yy][x] >= treeHeight) break;
        }
        score *= visibility;

        visibility = 0;
        for (let yy = y - 1; yy >= 0; yy--) {
            visibility++;
            if (treeMap[yy][x] >= treeHeight) break;
        }
        score *= visibility;

        visibility = 0;
        for (let xx = x + 1; xx < sizeX; xx++) {
            visibility++;
            if (treeMap[y][xx] >= treeHeight) break;
        }
        score *= visibility;

        visibility = 0;
        for (let xx = x - 1; xx >= 0; xx--) {
            visibility++;
            if (treeMap[y][xx] >= treeHeight) break;
        }
        score *= visibility;

        return score;
    };

    for (let y = 1; y < sizeY - 1; y++) {
        for (let x = 1; x < sizeX - 1; x++) {
            let scenicScore = getScore(y, x);
            if (scenicScore > bestScenicScore) bestScenicScore = scenicScore;
        }
    }

    return bestScenicScore;
};

console.time('doSomething');

console.log(partOne(treeMap));
console.log(partTwo(treeMap));

console.timeEnd('doSomething');

// tests
const testTreeMap = [
    [3, 0, 3, 7, 3],
    [2, 5, 5, 1, 2],
    [6, 5, 3, 3, 2],
    [3, 3, 5, 4, 9],
    [3, 5, 3, 9, 0],
];
console.assert(partOne(testTreeMap) === 21, 'part1');
console.assert(partTwo(testTreeMap) === 8, 'part2');
