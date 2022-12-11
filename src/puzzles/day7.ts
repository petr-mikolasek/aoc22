import {readFileIntoString} from '../input';

const rawInput: string = readFileIntoString('src/inputs/day7.txt');

const getDirSizes = (input: string): Map<string, number> => {
    const commands = input.split('\r\n');
    let dirs = new Map<string, number>();
    let currentDirs: string[] = [];
    for (let c of commands) {
        let cmd = c.split(' ');
        switch (cmd[0]) {
            case '$':
                if (cmd[1] === 'cd') {
                    if (cmd[2] === '..') {
                        currentDirs.pop();
                    } else {
                        currentDirs.push(cmd[2]);
                        dirs.set(currentDirs.join('/'), 0);
                    }
                }
                break;
            case 'dir':
                break;
            default: {
                for (let i = 0; i < currentDirs.length; i++) {
                    let curDir = currentDirs.slice(0, i + 1).join('/');
                    dirs.set(curDir, dirs.get(curDir)! + parseInt(cmd[0]));
                }
            }
        }
    }
    return dirs;
};

const partOne = (input: string): number => {
    let dirs = getDirSizes(input);

    let totalSizes = 0;
    for (let size of dirs.values()) {
        if (size <= 100000) totalSizes += size;
    }

    return totalSizes;
};

const partTwo = (input: string): number => {
    let dirs = getDirSizes(input);

    const spaceToFree = dirs.get('/')! - (70000000 - 30000000);

    let smallestDirBigEnough = 70000000;
    for (let size of dirs.values()) {
        if (size >= spaceToFree && size < smallestDirBigEnough) smallestDirBigEnough = size;
    }

    return smallestDirBigEnough;
};

console.time('doSomething');

console.log(partOne(rawInput));
console.log(partTwo(rawInput));

console.timeEnd('doSomething');

// tests
const testInput = readFileIntoString('src/inputs/day7-test.txt');
console.assert(partOne(testInput) === 95437, 'part1');
console.assert(partTwo(testInput) === 24933642, 'part2');
