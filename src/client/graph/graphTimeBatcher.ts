import moment from "moment";

type TimeBatcherOptions = {
    removeEmpty?: boolean;
    timeUnit?: string;
}

export type TimeBatchedGraph = {
    timeRange: number[];
    parsedTimeRange?: string[];
    graph: SigmaGraph;
};

export const graphTimeBatcher = (graph: SigmaGraph, options: TimeBatcherOptions = {}): TimeBatchedGraph[] => {
    const removeEmpty = options.removeEmpty || false;
    const timeUnit: any = options.timeUnit || 'day';

    graph.nodes.sort(sortByTime);
    graph.edges.sort(sortByTime);

    const firstNodeTimeStamp = graph.nodes.find(node => typeof node.timeAdded !== "undefined");
    const firstEdgeTimeStamp = graph.edges.find(edge => typeof edge.timeAdded !== "undefined");

    if (!firstNodeTimeStamp?.timeAdded || !firstEdgeTimeStamp?.timeAdded) {
        throw new Error();
    }

    type TimeUnitMap = { [time: number]: SigmaGraph }
    const timeUnitToGraphMap: TimeUnitMap = {};
    const createGraphIfNotPresent = (map: TimeUnitMap, key: number) => {
        if (!(key in map)) {
            map[key] = { nodes: [], edges: [] };
        }
    };

    graph.nodes.forEach(node => {
        let timeStamp = 0;
        if (node.timeAdded) {
            timeStamp = moment(node.timeAdded).startOf(timeUnit).valueOf();
        }
        createGraphIfNotPresent(timeUnitToGraphMap, timeStamp);
        timeUnitToGraphMap[timeStamp].nodes.push(node);
    });

    graph.edges.forEach(edge => {
        let timeStamp = 0;
        if (edge.timeAdded) {
            timeStamp = moment(edge.timeAdded).startOf(timeUnit).valueOf();
        }
        createGraphIfNotPresent(timeUnitToGraphMap, timeStamp);
        timeUnitToGraphMap[timeStamp].edges.push(edge);
    });

    // Add missing entries
    if (!removeEmpty) {
        const maxTime = Math.max(...Object.keys(timeUnitToGraphMap).map(time => parseInt(time)));
        let currentTime = Math.min(firstNodeTimeStamp.timeAdded, firstEdgeTimeStamp.timeAdded);
        const timeIterator = getTimeIterator(moment(currentTime), timeUnit);
        while (currentTime < maxTime) {
            createGraphIfNotPresent(timeUnitToGraphMap, currentTime);
            currentTime = timeIterator.next().value;
        }
    }

    let output: TimeBatchedGraph[] = [];
    Object.entries(timeUnitToGraphMap)
          .forEach(([time, graph]) => {
              const start = parseInt(time);
              const end = moment(start).add(1, timeUnit).valueOf();
              const range: number[] = [start, end];
              output.push({
                  timeRange: range,
                  parsedTimeRange: range.map(time => moment(time).format('YYYY-MM-DD HH:mm:ss')),
                  graph
              })
          });

    output.sort((a, b) => a.timeRange[0] - b.timeRange[0]);

    return output;
};

const sortByTime = (a: any, b: any): number => {
    if (a.timeAdded && b.timeAdded) {
        return a.timeAdded - b.timeAdded;
    }
    return 0;
};

const getTimeIterator = function*(start: moment.Moment, timeUnit: any): IterableIterator<number> {
    const date = start.startOf(timeUnit);
    yield date.valueOf();
    while (true) {
        date.add(1, timeUnit);
        yield date.valueOf();
    }
};