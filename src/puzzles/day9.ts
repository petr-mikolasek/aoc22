import {rawInput} from '../inputs/day9';
import {distanceBetween} from '../stuff';
import {coordinate} from '../types';

const move = (pos: coordinate, dir: string): coordinate => {
    switch (dir) {
        case 'U':
            return {x: pos.x, y: pos.y + 1};
        case 'D':
            return {x: pos.x, y: pos.y - 1};
        case 'R':
            return {x: pos.x + 1, y: pos.y};
        case 'L':
            return {x: pos.x - 1, y: pos.y};
        default: {
            console.error('Wut?');
            return pos;
        }
    }
};

const partOneAndTwo = (inputStr: string, ropeLenght: number): number => {
    const moves: string[] = inputStr.split('\n');
    let rope: coordinate[] = new Array(ropeLenght).fill({x: 0, y: 0});
    let tailVisited = new Set<string>(['0,0']);

    for (let m of moves) {
        let [dir, steps] = m.split(' ');
        for (let i = 0; i < parseInt(steps); i++) {
            rope[0] = move(rope[0], dir);
            for (let i = 0; i < rope.length - 1; i++) {
                if (distanceBetween(rope[i], rope[i + 1]) > 1.5) {
                    rope[i + 1] = {
                        x: rope[i + 1].x + Math.sign(rope[i].x - rope[i + 1].x),
                        y: rope[i + 1].y + Math.sign(rope[i].y - rope[i + 1].y),
                    };
                }
            }
            tailVisited.add(`${rope[ropeLenght - 1].x},${rope[ropeLenght - 1].y}`);
        }
    }

    return tailVisited.size;
};

console.time('doSomething');

console.log(partOneAndTwo(rawInput, 2));
console.log(partOneAndTwo(rawInput, 10));

console.timeEnd('doSomething');

// tests
const testMoves = `R 4
U 4
L 3
D 1
R 4
D 1
L 5
R 2`;
const testMoves2 = `R 5
U 8
L 8
D 3
R 17
D 10
L 25
U 20`;
console.assert(partOneAndTwo(testMoves, 2) === 13, 'part1');
console.assert(partOneAndTwo(testMoves2, 10) === 36, 'part2');
