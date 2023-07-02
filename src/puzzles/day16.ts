import {input, testInput} from '../inputs/day16';
import {Valves, PathToValves} from '../types';

const parseValves = (input: string): Valves => {
    let valves: Valves = {};
    input.split('\n').map((line) => {
        const rawValve = line.match(/[A-Z]{2}|\d+/g);
        valves[rawValve![0]] = {flowRate: parseInt(rawValve![1]), open: false, connections: rawValve!.slice(2)};
    });

    return valves;
};

const computeDistances = (valves: Valves, startValve: string): {[target: string]: number} => {
    let distances: {[target: string]: number} = {};
    const move = (valve: string, steps: number) => {
        if (distances[valve] !== undefined && distances[valve] <= steps) return;
        distances[valve] = steps;
        valves[valve].connections.forEach((nextValve) => move(nextValve, steps + 1));
    };
    move(startValve, 0);

    return distances;
};

const openValves = (valves: Valves, time: number, usefulValves: string[]) => {
    let paths: PathToValves[] = [
        {
            curr: 'AA',
            active: usefulValves,
            timeLeft: time,
            steps: [],
            releasedPressure: 0,
        },
    ];

    for (let n = 0; n < paths.length; n++) {
        let path = paths[n];
        path.active.forEach((act) => {
            const timeLeftAfterMove = path.timeLeft - valves[path.curr].distances![act] - 1;
            if (timeLeftAfterMove <= 0) return;

            paths.push({
                curr: act,
                active: path.active.filter((valve) => valve != act),
                timeLeft: timeLeftAfterMove,
                steps: [...path.steps, act],
                releasedPressure: path.releasedPressure + timeLeftAfterMove * valves[act].flowRate,
            });
        });
    }

    return paths.sort((a, b) => b.releasedPressure - a.releasedPressure);
};

const partOneAndTwo = (input: string, elephant = false): number => {
    let valves = parseValves(input);
    let usefulValves: string[] = [];
    for (let v in valves) if (valves[v].flowRate) usefulValves.push(v);

    valves['AA'].distances = computeDistances(valves, 'AA');
    for (let v of usefulValves) valves[v].distances = computeDistances(valves, v);

    if (elephant) {
        const paths = openValves(valves, 26, usefulValves);
        let max = 0;

        for (let i = 0; i < paths.length; i++) {
            for (let j = i + 1; j < paths.length; j++) {
                if (paths[i].releasedPressure + paths[j].releasedPressure < max) break;
                if (paths[i].steps.every((s) => !paths[j].steps.includes(s)))
                    max = Math.max(max, paths[i].releasedPressure + paths[j].releasedPressure);
            }
        }

        return max;
    }

    return openValves(valves, 30, usefulValves)[0].releasedPressure;
};

console.time('doSomething');

console.log(partOneAndTwo(input));
console.log(partOneAndTwo(input, true));

console.timeEnd('doSomething');

// tests
console.assert(input, 'Input is empty');
console.assert(partOneAndTwo(testInput) === 1651, 'part1');
console.assert(partOneAndTwo(testInput, true) === 1707, 'part2');
