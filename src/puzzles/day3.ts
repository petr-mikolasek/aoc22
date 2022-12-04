import {readFileIntoString} from '../input';

const rawInput: string = readFileIntoString('src/inputs/day3.txt');
const rucksacks = rawInput.split('\r\n');

const findMispackedItem = (rucksack: string): string => {
    let middle = rucksack.length / 2;
    let comp1 = rucksack.substring(0, middle);
    let comp2 = rucksack.substring(middle);

    let reg = new RegExp(`([${comp1}])`);
    let mispackedItem = comp2.match(reg);

    if (mispackedItem !== null) return mispackedItem[0];
    console.error('Wut?');
    return '';
};

const findBadge = (rs1: string, rs2: string, rs3: string): string => {
    let reg = new RegExp(`([${rs1}])`, 'g');
    let halfway = rs2.match(reg);
    if (halfway) {
        reg = new RegExp(`([${halfway.join('')}])`, 'g');
    }
    let badge = rs3.match(reg);

    if (badge !== null) return badge[0];
    console.error('Wut?');
    return '';
};

const getPriority = (item: string): number => {
    return (item.charCodeAt(0) - 38) % 58;
};

const partOne = (rucksacks: string[]): number => {
    let totalPriority = 0;
    rucksacks.forEach((rucksack) => {
        totalPriority += getPriority(findMispackedItem(rucksack));
    });

    return totalPriority;
};

const partTwo = (rucksacks: string[]): number => {
    let totalPriority = 0;
    for (let i = 0; i < rucksacks.length; i += 3)
        totalPriority += getPriority(findBadge(rucksacks[i], rucksacks[i + 1], rucksacks[i + 2]));

    return totalPriority;
};

console.time('doSomething');

console.log(partOne(rucksacks));
console.log(partTwo(rucksacks));

console.timeEnd('doSomething');

// tests
console.assert(findMispackedItem('vJrwpWtwJgWrhcsFMMfFFhFp') === 'p');
console.assert(findMispackedItem('jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL') === 'L');
console.assert(findMispackedItem('PmmdzqPrVvPwwTWBwg') === 'P');

console.assert(getPriority('B') === 28);
console.assert(getPriority('f') === 6);

console.assert(findBadge('vJrwpWtwJgWrhcsFMMfFFhFp', 'jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL', 'PmmdzqPrVvPwwTWBwg') === 'r');

const testRucksacks = [
    'vJrwpWtwJgWrhcsFMMfFFhFp',
    'jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL',
    'PmmdzqPrVvPwwTWBwg',
    'wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn',
    'ttgJtRGJQctTZtZT',
    'CrZsJsPPZsGzwwsLwLmpwMDw',
];
console.assert(partOne(testRucksacks) === 157, 'part1');
console.assert(partTwo(testRucksacks) === 70, 'part2');
