import {input, testInput} from '../inputs/day15';
import {manhattanDistanceBetween} from '../stuff';
import {Coordinate, SensorReading} from '../types';

const parseSensorData = (input: string): SensorReading[] => {
    return input.split('\n').map((line) => {
        let numbers = line.match(/(-?[0-9]+)/g);
        if (numbers) {
            const sensor = {x: parseInt(numbers[0]), y: parseInt(numbers[1])};
            const beacon = {x: parseInt(numbers[2]), y: parseInt(numbers[3])};
            return {
                sensor,
                beacon,
                dist: manhattanDistanceBetween(sensor, beacon),
            };
        } else {
            throw new Error('Something went wrong.');
        }
    });
};

const partOne = (input: string, lineNum: number): number => {
    const sensorData = parseSensorData(input);
    let segments: number[][] = [];

    for (let entry of sensorData) {
        const distToLine = manhattanDistanceBetween(entry.sensor, {x: entry.sensor.x, y: lineNum});
        const diff = entry.dist - distToLine;
        if (diff >= 0) {
            const min = entry.sensor.x - diff;
            const max = entry.sensor.x + diff;
            let newSegments: number[][] = [[min, max, 1]];

            for (const seg of segments) {
                if (seg[0] <= max && seg[1] >= min) {
                    newSegments.push([Math.max(seg[0], min), Math.min(seg[1], max), seg[2] * -1]);
                }
            }

            segments.push(...newSegments);
        }
    }

    let lineLength = 0;
    for (const seg of segments) lineLength += (seg[1] - seg[0] + 1) * seg[2];

    return lineLength - 1;
};

const partTwo = (input: string, maxCoordinate: number): number => {
    const sensorData = parseSensorData(input);

    for (let y = 0; y <= maxCoordinate; y++) {
        for (let x = 0; x <= maxCoordinate; ) {
            let foundIt = true;

            for (let entry of sensorData) {
                const diff = manhattanDistanceBetween({x, y}, entry.sensor) - entry.dist;
                if (diff <= 0) {
                    const distToLine = manhattanDistanceBetween(entry.sensor, {x: entry.sensor.x, y});
                    x = entry.sensor.x + (entry.dist - distToLine) + 1;
                    foundIt = false;
                    break;
                }
            }

            if (foundIt) return 4000000 * x + y;
        }
    }

    return 0;
};

console.time('doSomething');

console.log(partOne(input, 2000000));
console.log(partTwo(input, 4000000));

console.timeEnd('doSomething');

// tests
console.assert(input, 'Input is empty');
console.assert(partOne(testInput, 10) === 26, 'part1');
console.assert(partTwo(testInput, 20) === 56000011, 'part2');
