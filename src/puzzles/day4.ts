import {readFileIntoString} from '../input';

const rawInput: string = readFileIntoString('src/inputs/day4.txt');
const pairs: number[][] = rawInput.split('\r\n').map((l) => l.split(/[,-]/).map((e) => parseInt(e)));

const partOne = (pairs: number[][]): number => {
    let subsets = 0;
    pairs.forEach((pair) => {
        let [a, b, c, d] = pair;
        subsets += Math.max(Math.sign((d - a) * (b - c) + 1), 0) * Math.max(Math.sign((a - c) * (d - b) + 1), 0);
    });

    return subsets;
};

const partTwo = (pairs: number[][]): number => {
    let overlaps = 0;
    pairs.forEach((pair) => {
        let [a, b, c, d] = pair;
        overlaps += Math.max(Math.sign((d - a) * (b - c) + 1), 0);
    });

    return overlaps;
};

console.time('doSomething');

console.log(partOne(pairs));
console.log(partTwo(pairs));

console.timeEnd('doSomething');

// tests
const testInput: string = readFileIntoString('src/inputs/day4test.txt');
const testPairs: number[][] = testInput.split('\r\n').map((l) => l.split(/[,-]/).map((e) => parseInt(e)));
console.assert(partOne(testPairs) === 2, 'part1');
console.assert(partTwo(testPairs) === 4, 'part2');
