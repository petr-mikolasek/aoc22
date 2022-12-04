import {readFileIntoString} from '../input';

const rawInput: string = readFileIntoString('src/inputs/day2.txt');
const strategyGuide: string[][] = rawInput.split('\r\n').map((line) => line.split(' '));

const partOne = (): number => {
    let score = 0;
    strategyGuide.forEach((game) => {
        if (game[0] === 'A') {
            if (game[1] === 'X') score += 4;
            else if (game[1] === 'Y') score += 8;
            else if (game[1] === 'Z') score += 3;
            else console.error('Wut?');
        } else if (game[0] === 'B') {
            if (game[1] === 'X') score += 1;
            else if (game[1] === 'Y') score += 5;
            else if (game[1] === 'Z') score += 9;
            else console.error('Wut?');
        } else if (game[0] === 'C') {
            if (game[1] === 'X') score += 7;
            else if (game[1] === 'Y') score += 2;
            else if (game[1] === 'Z') score += 6;
            else console.error('Wut?');
        } else {
            console.error('Wut?');
        }
    });
    return score;
};

const partTwo = (): number => {
    let score = 0;
    strategyGuide.forEach((game) => {
        if (game[0] === 'A') {
            if (game[1] === 'X') score += 3;
            else if (game[1] === 'Y') score += 4;
            else if (game[1] === 'Z') score += 8;
            else console.error('Wut?');
        } else if (game[0] === 'B') {
            if (game[1] === 'X') score += 1;
            else if (game[1] === 'Y') score += 5;
            else if (game[1] === 'Z') score += 9;
            else console.error('Wut?');
        } else if (game[0] === 'C') {
            if (game[1] === 'X') score += 2;
            else if (game[1] === 'Y') score += 6;
            else if (game[1] === 'Z') score += 7;
            else console.error('Wut?');
        } else {
            console.error('Wut?');
        }
    });
    return score;
};

console.time('doSomething');

console.log(partOne());
console.log(partTwo());

console.timeEnd('doSomething');
