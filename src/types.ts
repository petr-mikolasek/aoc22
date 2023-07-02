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
};

type Valve = {
    flowRate: number;
    open: boolean;
    connections: string[];
    distances?: {[target: string]: number};
};

export type Valves = {[name: string]: Valve};

export type PathToValves = {
    curr: string;
    active: string[];
    timeLeft: number;
    steps: string[];
    releasedPressure: number;
};
