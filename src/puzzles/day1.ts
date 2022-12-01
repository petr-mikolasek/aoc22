import {readFileIntoString} from '../input';

const rawInput: string = readFileIntoString('src/inputs/day1.txt');
const foods: string[] = rawInput.split('\r\n');

let caloriesPerElf: number[] = [];
let currentElf = 0;
for (let i = 1; i < foods.length; i++) {
    if (foods[i] === '') {
        caloriesPerElf.push(currentElf);
        currentElf = 0;
    } else {
        currentElf += parseInt(foods[i]);
    }
}

function getMaxElf(calsPerElf: number[]): number {
    let maxElfCalories = 0;
    calsPerElf.forEach((elf) => {
        if (elf > maxElfCalories) maxElfCalories = elf;
    });

    return maxElfCalories;
}

const partOne = (): number => {
    return getMaxElf(caloriesPerElf);
};

const partTwo = (): number => {
    let threeMaxElves = 0;
    for (let i = 0; i < 3; i++) {
        let maxCalories = getMaxElf(caloriesPerElf);
        threeMaxElves += maxCalories;
        for (let j = 0; j < caloriesPerElf.length; j++) {
            if (caloriesPerElf[j] === maxCalories) {
                caloriesPerElf.splice(j, 1);
                break;
            }
        }
    }
    return threeMaxElves;
};

console.time('doSomething');

// console.log(partOne());
console.log(partTwo());

console.timeEnd('doSomething');
