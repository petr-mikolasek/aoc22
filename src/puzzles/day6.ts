import {readFileIntoString} from '../input';

const rawInput: string = readFileIntoString('src/inputs/day6.txt');

const partOneAndTwo = (message: string, num: number): number => {
    for (let i = 0; i <= message.length - num; i++) {
        let sample = new Set(message.slice(i, i + num));
        if (sample.size === num) return i + num;
    }
    return 0;
};

console.time('doSomething');

console.log(partOneAndTwo(rawInput, 4));
console.log(partOneAndTwo(rawInput, 14));

console.timeEnd('doSomething');

// tests
console.assert(partOneAndTwo('mjqjpqmgbljsphdztnvjfqwrcgsmlb', 4) === 7, 'part1.1');
console.assert(partOneAndTwo('bvwbjplbgvbhsrlpgdmjqwftvncz', 4) === 5, 'part1.2');
console.assert(partOneAndTwo('nppdvjthqldpwncqszvftbrmjlhg', 4) === 6, 'part1.3');
console.assert(partOneAndTwo('nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg', 4) === 10, 'part1.4');
console.assert(partOneAndTwo('zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw', 4) === 11, 'part1.5');
console.assert(partOneAndTwo('mjqjpqmgbljsphdztnvjfqwrcgsmlb', 14) === 19, 'part2.1');
console.assert(partOneAndTwo('bvwbjplbgvbhsrlpgdmjqwftvncz', 14) === 23, 'part2.2');
console.assert(partOneAndTwo('nppdvjthqldpwncqszvftbrmjlhg', 14) === 23, 'part2.3');
console.assert(partOneAndTwo('nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg', 14) === 29, 'part2.4');
console.assert(partOneAndTwo('zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw', 14) === 26, 'part2.5');
