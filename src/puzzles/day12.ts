import {input, testInput} from '../inputs/day12';
import {getNeighbors} from '../stuff';
import {Coordinate} from '../types';

const parseInput = (
    input: string
): {heightMap: number[][]; start: Coordinate; end: Coordinate; sizeX: number; sizeY: number} => {
    let start: Coordinate = {x: -1, y: -1};
    let end: Coordinate = {x: -1, y: -1};
    let heightMap: number[][] = [];
    const inputInLines = input.split('\n');
    const sizeX = inputInLines[0].length;
    const sizeY = inputInLines.length;

    for (let y = 0; y < sizeY; y++) {
        heightMap.push([]);
        for (let x = 0; x < sizeX; x++) {
            switch (inputInLines[y][x]) {
                case 'S':
                    start = {x, y};
                    heightMap[y].push(1);
                    break;
                case 'E':
                    end = {x, y};
                    heightMap[y].push(26);
                    break;
                default:
                    heightMap[y].push(inputInLines[y].charCodeAt(x) - 96);
            }
        }
    }

    return {heightMap, start, end, sizeX, sizeY};
};

const partOneAndTwo = (input: string, trail = false): number => {
    const {heightMap, start, end, sizeX, sizeY} = parseInput(input);

    let distanceMap: number[][] = new Array(sizeY).fill([]).map((l) => new Array(sizeX).fill(-1));

    let Q: Array<Coordinate> = [];

    if (trail) {
        for (let y = 0; y < sizeY; y++) {
            for (let x = 0; x < sizeX; x++) {
                if (heightMap[y][x] === 1) {
                    distanceMap[y][x] = 0;
                    Q.push({x, y});
                }
            }
        }
    } else {
        distanceMap[start.y][start.x] = 0;
        Q.push(start);
    }

    while (Q.length > 0) {
        const currentPoint = Q.shift()!;
        const currentPointHeight = heightMap[currentPoint.y][currentPoint.x];
        const currentPointDist = distanceMap[currentPoint.y][currentPoint.x];
        let neighbors = getNeighbors(currentPoint, sizeX, sizeY, false);
        for (let nextPoint of neighbors) {
            if (heightMap[nextPoint.y][nextPoint.x] <= currentPointHeight + 1) {
                const nextPointDist = distanceMap[nextPoint.y][nextPoint.x];
                if (nextPointDist < 0) {
                    distanceMap[nextPoint.y][nextPoint.x] = currentPointDist + 1;
                    Q.push(nextPoint);
                } else if (nextPointDist > currentPointDist + 1)
                    distanceMap[nextPoint.y][nextPoint.x] = currentPointDist + 1;
            }
        }

        Q.sort((a, b) => distanceMap[a.y][a.x] - distanceMap[b.y][b.x]);
    }

    return distanceMap[end.y][end.x];
};

console.time('doSomething');

console.log(partOneAndTwo(input));
console.log(partOneAndTwo(input, true));

console.timeEnd('doSomething');

// tests
console.assert(partOneAndTwo(testInput) === 31, 'part1');
console.assert(partOneAndTwo(testInput, true) === 29, 'part2');
