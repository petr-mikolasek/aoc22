export type Coordinate = {x: number; y: number};

export type Monkey = {
    items: number[];
    operation: Function;
    test: number;
    targetTrue: number;
    targetFalse: number;
    insCount: number;
};

export type RecursiveList = Array<number | RecursiveList>;

export type SensorReading = {
    sensor: Coordinate;
    beacon: Coordinate;
    dist: number;
}