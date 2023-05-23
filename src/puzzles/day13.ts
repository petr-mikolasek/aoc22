import {isEqual} from 'lodash';
import {input, testInput} from '../inputs/day13';
import {RecursiveList} from '../types';

const compare = (leftList: RecursiveList, rightList: RecursiveList): number => {
    const minLength = Math.min(leftList.length, rightList.length);

    for (let i = 0; i < minLength; i++) {
        let left = leftList[i];
        let right = rightList[i];

        if (typeof left === 'number') {
            if (typeof right === 'number') {
                if (left < right) return 1;
                else if (left > right) return -1;
            } else {
                let isOrdered = compare([left], right);
                if (isOrdered !== 0) return isOrdered;
            }
        } else {
            if (typeof right === 'number') {
                let isOrdered = compare(left, [right]);
                if (isOrdered !== 0) return isOrdered;
            } else {
                let isOrdered = compare(left, right);
                if (isOrdered !== 0) return isOrdered;
            }
        }
    }

    if (rightList.length > minLength) return 1;
    else if (leftList.length > minLength) return -1;
    else return 0;
};

const partOne = (input: string): number => {
    const pairs: RecursiveList[][] = input.split('\n\n').map((l) => l.split('\n').map((e) => eval(e)));

    let indexSum = 0;

    for (let i = 0; i < pairs.length; i++) {
        const isInRightOrder = compare(pairs[i][0], pairs[i][1]);
        switch (isInRightOrder) {
            case 1:
                indexSum += i + 1;
                break;
            case -1:
                break;
            default:
                throw new Error('Something went wrong.');
        }
    }

    return indexSum;
};

const partTwo = (input: string): number => {
    const packets: RecursiveList[] = input
        .replace(/\n\n/g, '\n')
        .split('\n')
        .map((e) => eval(e));
    packets.push([[2]], [[6]]);

    packets.sort((a, b) => compare(b, a));

    return (
        (packets.findIndex((packet) => {
            return isEqual(packet, [[2]]);
        }) +
            1) *
        (packets.findIndex((packet) => {
            return isEqual(packet, [[6]]);
        }) +
            1)
    );
};

console.time('doSomething');

console.log(partOne(input));
console.log(partTwo(input));

console.timeEnd('doSomething');

// tests
console.assert(partOne(testInput) === 13, 'part1');
console.assert(partTwo(testInput) === 140, 'part2');
