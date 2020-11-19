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

    const firstTimestamp =
        (firstNodeTimeStamp.timeAdded < firstEdgeTimeStamp.timeAdded) ?
            firstNodeTimeStamp.timeAdded : firstEdgeTimeStamp.timeAdded;

    const nodeIterator = graph.nodes.values();
    const edgeIterator = graph.edges.values();
    const daysIterator = getDayIterator(moment(firstTimestamp), timeUnit);

    let output: TimeBatchedGraph[] = [];

    let nextNode;
    let nextEdge;
    while (true) {
        let didAddNode = false;
        let didAddEdge = false;
        const day = daysIterator.next().value;

        const graph: SigmaGraph = { nodes: [], edges: [] };

        if (didAddNode || !nextNode || !nextNode?.timeAdded) {
            nextNode = nodeIterator.next()?.value;
        }
        while (nextNode?.timeAdded && nextNode?.timeAdded < day) {
            didAddNode = true;
            graph.nodes.push(nextNode);
            nextNode = nodeIterator.next()?.value;
        }

        if (didAddEdge || !nextEdge || !nextEdge?.timeAdded) {
            nextEdge = edgeIterator.next()?.value;
        }
        while (nextEdge?.timeAdded && nextEdge?.timeAdded < day) {
            didAddEdge = true;
            graph.edges.push(nextEdge);
            nextEdge = edgeIterator.next()?.value;
        }

        const timeRange = [
            moment(day).subtract('1', timeUnit).valueOf(),
            moment(day).valueOf()
        ];
        output.push({
            timeRange,
            parsedTimeRange: timeRange.map(time => moment(time).format('YYYY-MM-DD HH:mm:ss')),
            graph
        });

        if (typeof nextNode === "undefined" && typeof nextEdge === "undefined") {
            break;
        }
    }

    const noTimeAdded: SigmaGraph = {
        nodes: graph.nodes.filter(node => !node.hasOwnProperty("timeAdded")),
        edges: graph.edges.filter(edge => !edge.hasOwnProperty("timeAdded"))
    };
    output.push({
        timeRange: [-1, -1],
        graph: noTimeAdded
    });

    if (removeEmpty) {
        output = output.filter(batch => batch.graph.nodes.length > 0 || batch.graph.edges.length > 0);
    }

    output.sort((a, b) => a.timeRange[0] - b.timeRange[0]);

    return output;
};

const sortByTime = (a: any, b: any): number => {
    if (a.timeAdded && b.timeAdded) {
        return a.timeAdded - b.timeAdded;
    }
    return 0;
};

const getDayIterator = function*(start: moment.Moment, timeUnit: any): IterableIterator<number> {
    const date = start.startOf(timeUnit);
    yield date.valueOf();
    while (true) {
        date.add(1, timeUnit);
        yield date.valueOf();
    }
};