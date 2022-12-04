import {readFileIntoString} from '../input';

const rawInput: string = readFileIntoString('src/inputs/day.txt');

const partOne = (): number => {
    return 0;
};

const partTwo = (): number => {
    return 0;
};

console.time('doSomething');

console.log(partOne());
// console.log(partTwo());

console.timeEnd('doSomething');

// tests
console.assert(partOne() === 1, 'part1');
console.assert(partTwo() === 1, 'part2');
