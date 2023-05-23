import {input, testInput} from '../inputs/day14';
import {Coordinate} from '../types';
import {parseCoordinate} from '../stuff';

const makeMap = (input: string): number[][] => {
    let yMax = 0;
    let xMax = 0;
    let xMin = 1000;

    const scanlines = new Set<string>(input.split('\n'));

    const walls: Coordinate[][] = Array.from(scanlines).map((line) =>
        line.split(' -> ').map((entry) => parseCoordinate(entry))
    );

    walls.forEach((line) =>
        line.forEach((entry) => {
            yMax = Math.max(yMax, entry.y);
            xMax = Math.max(xMax, entry.x);
            xMin = Math.min(xMin, entry.x);
        })
    );

    const mapWidth = (Math.max(500 - xMin, xMax - 500) + yMax) * 2 + 1;
    const offset = 500 - (mapWidth - 1) / 2;

    let map: number[][] = new Array(yMax + 2).fill([]).map((row) => new Array(mapWidth).fill(0));

    walls.forEach((line) => {
        for (let i = 1; i < line.length; i++) {
            if (line[i - 1].x === line[i].x) {
                for (let y = Math.min(line[i - 1].y, line[i].y); y <= Math.max(line[i - 1].y, line[i].y); y++) {
                    map[y][line[i].x - offset] = -1;
                }
            } else {
                for (let x = Math.min(line[i - 1].x, line[i].x); x <= Math.max(line[i - 1].x, line[i].x); x++) {
                    map[line[i].y][x - offset] = -1;
                }
            }
        }
    });

    return map;
};

const drawMap = (map: number[][]) => {
    let counter = 0;
    map.forEach((line) => {
        let drawnLine = `${counter % 10}`;
        line.forEach((point) => {
            switch (point) {
                case 0:
                    drawnLine += ' ';
                    break;
                case -1:
                    drawnLine += '#';
                    break;
                case 1:
                    drawnLine += 'o';
                    break;
                default:
                    throw new Error('Something went wrong.');
            }
        });
        console.log(drawnLine);
        counter++;
    });
};

const partOneAndTwo = (input: string, floor = false): number => {
    let map = makeMap(input);

    if (floor) map[map.length] = new Array(map[0].length).fill(-1);

    const sandSpoutX = (map[0].length - 1) / 2;
    let sandCounter = 0;
    let addSand = true;

    while (addSand) {
        addSand = false;
        if (map[0][sandSpoutX] !== 0) {
            console.warn('The sand is everywhere!');
            break;
        }
        let x = sandSpoutX;
        for (let y = 0; y < map.length - 1; y++) {
            if (map[y + 1][x] === 0) {
                continue;
            } else if (map[y + 1][x - 1] === 0) {
                x--;
                continue;
            } else if (map[y + 1][x + 1] === 0) {
                x++;
                continue;
            } else {
                map[y][x] = 1;
                sandCounter++;
                addSand = true;
                break;
            }
        }
    }

    drawMap(map);

    return sandCounter;
};

console.time('doSomething');

console.log(partOneAndTwo(input));
console.log(partOneAndTwo(input, true));

console.timeEnd('doSomething');

// tests
console.assert(partOneAndTwo(testInput) === 24, 'part1');
console.assert(partOneAndTwo(testInput, true) === 93, 'part2');
