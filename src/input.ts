import * as fs from 'fs';

export const readFileIntoString = (path: fs.PathOrFileDescriptor): string => {
    const inputAsString = fs.readFileSync(path).toString();
    return inputAsString;
};

export const intoArrays = (arrayString: Array<string>, splitBy: string | RegExp): Array<Array<string>> => {
    const arrayOfArrays = [];
    for (let i of arrayString) {
        arrayOfArrays.push(i.split(splitBy));
    }
    return arrayOfArrays;
};

export const intoNumbers = (arrayString: Array<Array<string>>) => {
    const arrayOfIntArrays = [];
    for (let array of arrayString) {
        let arrayOfInt = [];
        for (let element of array) {
            arrayOfInt.push(parseInt(element));
        }
        arrayOfIntArrays.push(arrayOfInt);
    }
    return arrayOfIntArrays;
};
