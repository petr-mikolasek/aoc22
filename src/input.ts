import * as fs from 'fs';

export const readFileIntoString = (path: fs.PathOrFileDescriptor): string => {
    const inputAsString = fs.readFileSync(path).toString();
    return inputAsString;
};
