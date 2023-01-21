import {input, testInput} from '../inputs/day11';
import {Monkey} from '../types';

const parseOp = (op: string[]): Function => {
    if (op[0] === '*') {
        if (op[1] === 'old') {
            return (old: number): number => {
                return old * old;
            };
        } else {
            return (old: number): number => {
                return old * parseInt(op[1]);
            };
        }
    } else {
        return (old: number): number => {
            return old + parseInt(op[1]);
        };
    }
};

const parseInput = (input: string): Monkey[] =>
    input.split('\n\n').map((monkeyText) => {
        let monkeyLines = monkeyText.split('\n');
        return {
            items: monkeyLines[1].match(/\d+/g)!.map(Number),
            operation: parseOp(monkeyLines[2].split(' ').slice(-2)),
            test: Number(monkeyLines[3].match(/\d+/)),
            targetTrue: Number(monkeyLines[4].match(/\d+/)),
            targetFalse: Number(monkeyLines[5].match(/\d+/)),
            insCount: 0,
        };
    });

const partOneAndTwo = (input: string, rounds: number, worryLow: boolean = true): number => {
    let monkeys: Monkey[] = parseInput(input);
    let mod: number = monkeys.reduce((a, c) => a * c.test, 1);

    for (let i = 0; i < rounds; i++) {
        monkeys.forEach((monkey) => {
            while (monkey.items.length > 0) {
                let item = monkey.items.shift();
                item = worryLow
                    ? (item = Math.floor(monkey.operation(item) / 3))
                    : (item = monkey.operation(item) % mod);
                monkeys[item % monkey.test === 0 ? monkey.targetTrue : monkey.targetFalse].items.push(item);
                monkey.insCount++;
            }
        });
    }

    return monkeys
        .sort((a, b) => b.insCount - a.insCount)
        .slice(0, 2)
        .reduce((a, c) => a * c.insCount, 1);
};

const partTwo = (): number => {
    return 0;
};

console.time('doSomething');

console.log(partOneAndTwo(input, 20));
console.log(partOneAndTwo(input, 10000, false));

console.timeEnd('doSomething');

// tests
console.assert(partOneAndTwo(testInput, 20) === 10605, 'part1');
console.assert(partOneAndTwo(testInput, 10000, false) === 2713310158, 'part2');
