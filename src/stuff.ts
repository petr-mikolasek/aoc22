import {coordinate} from './types';

export const binaryIntoDec = (arrayBin: Array<number>): number => {
    let arrayLength = arrayBin.length;
    let decimalNumber = 0;
    for (let i = 0; i < arrayLength; i++) {
        decimalNumber += arrayBin[i] * 2 ** (arrayLength - 1 - i);
    }
    return decimalNumber;
};

export const getNeighbors = (point: coordinate, height: number, width: number, diag: boolean): coordinate[] => {
    let possibleMoves: coordinate[] = [];
    if (point.x < 0 || point.y < 0 || point.x >= height || point.y >= width)
        throw console.error('Coordinate out of grid.');

    if (point.x > 0 && point.y > 0 && diag) possibleMoves.push({x: point.x - 1, y: point.y - 1});
    if (point.x > 0) possibleMoves.push({x: point.x - 1, y: point.y});
    if (point.x > 0 && point.y < width - 1 && diag) possibleMoves.push({x: point.x - 1, y: point.y + 1});
    if (point.y > 0) possibleMoves.push({x: point.x, y: point.y - 1});
    if (point.y < width - 1) possibleMoves.push({x: point.x, y: point.y + 1});
    if (point.x < height - 1 && point.y > 0 && diag) possibleMoves.push({x: point.x + 1, y: point.y - 1});
    if (point.x < height - 1) possibleMoves.push({x: point.x + 1, y: point.y});
    if (point.x < height - 1 && point.y < width - 1 && diag) possibleMoves.push({x: point.x + 1, y: point.y + 1});

    return possibleMoves;
};

export const distanceFromStart = (loc: coordinate): number => {
    return Math.abs(loc.x) + Math.abs(loc.y);
};
