export type Coordinate = {x: number; y: number};

export type Monkey = {
    items: number[];
    operation: Function;
    test: number;
    targetTrue: number;
    targetFalse: number;
    insCount: number;
};
