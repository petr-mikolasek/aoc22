import {rawInput, testInput} from '../inputs/day10';

const partOne = (input: string): number => {
    const instr: number[] = [];
    for (let i of input.split('\n')) {
        instr.push(0);
        if (!(i == 'noop')) {
            instr.push(parseInt(i.substring(5)));
        }
    }

    let X = 1;
    let signalStrengths = 0;

    for (let cycle = 0; cycle < 220; cycle++) {
        if (cycle % 40 === 20 - 1) signalStrengths += X * (cycle + 1);
        X += instr[cycle];
    }

    return signalStrengths;
};

const partTwo = (input: string): string => {
    const instr: number[] = [];
    for (let i of input.split('\n')) {
        instr.push(0);
        if (!(i == 'noop')) {
            instr.push(parseInt(i.substring(5)));
        }
    }

    let screen: string[][] = new Array(6).fill([]).map((row) => new Array(40).fill(' '));
    let X = 1;

    for (let row = 0; row < 6; row++) {
        for (let col = 0; col < 40; col++) {
            if (Math.abs(col - X) <= 1) screen[row][col] = '#';
            X += instr[row * 40 + col];
        }
    }

    return screen.map((r) => r.join('')).join('\n');
};

console.time('doSomething');

console.log(partOne(rawInput));
console.log(partTwo(rawInput));

console.timeEnd('doSomething');

// tests
console.assert(partOne(testInput) === 13140, 'part1');
console.assert(
    partTwo(testInput) ===
        `##..##..##..##..##..##..##..##..##..##..
###...###...###...###...###...###...###.
####....####....####....####....####....
#####.....#####.....#####.....#####.....
######......######......######......####
#######.......#######.......#######.....`.replace(/\./g, ' '),
    'part2'
);
