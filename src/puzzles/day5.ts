import {readFileIntoString} from '../input';

const rawStacks: string = readFileIntoString('src/inputs/day5-stacks.txt');
const rawMoves: string = readFileIntoString('src/inputs/day5-moves.txt');

const moves: number[][] = rawMoves.split('\r\n').map((move) =>
    move
        .replace(/[a-z]+ /g, '')
        .split(' ')
        .map((n) => parseInt(n))
);

const stackLines = rawStacks.split('\r\n');
const stacks: string[][] = [[], [], [], [], [], [], [], [], []];
for (let line = stackLines.length - 2; line >= 0; line--) {
    for (let st = 0; st < 9; st++) {
        let crate = stackLines[line][st * 4 + 1];
        if (crate !== ' ') stacks[st].push(crate);
    }
}

const partOne = (stacks: string[][], moves: number[][]): string => {
    for (let move of moves) {
        let [count, from, to] = move;
        for (let i = 0; i < count; i++) {
            let crate: string = stacks[from - 1].pop()!;
            stacks[to - 1].push(crate);
        }
    }

    let topCrates: string[] = [];
    for (let stack of stacks) {
        topCrates.push(stack.pop()!);
    }

    return topCrates.join('');
};

const partTwo = (stacks: string[][], moves: number[][]): string => {
    for (let move of moves) {
        let [count, from, to] = move;
        let buffer: string[] = []
        for (let i = 0; i < count; i++) {
            let crate: string = stacks[from - 1].pop()!;
            buffer.push(crate);
        }
        for (let i = 0; i < count; i++) {
            let crate: string = buffer.pop()!;
            stacks[to - 1].push(crate);
        }
    }

    let topCrates: string[] = [];
    for (let stack of stacks) {
        topCrates.push(stack.pop()!);
    }

    return topCrates.join('');
};

console.time('doSomething');

// console.log(partOne(stacks, moves));
console.log(partTwo(stacks, moves));

console.timeEnd('doSomething');

// tests
const testStacks = [['Z', 'N'], ['M', 'C', 'D'], ['P']];
const testMoves = [
    [1, 2, 1],
    [3, 1, 3],
    [2, 2, 1],
    [1, 1, 2],
];
// console.assert(partOne(testStacks, testMoves) === 'CMZ', 'part1');
console.assert(partTwo(testStacks, testMoves) === 'MCD', 'part2');
