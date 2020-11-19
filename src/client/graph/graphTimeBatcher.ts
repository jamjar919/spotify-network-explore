import moment from "moment";

type TimeBatcherOptions = {
    removeEmpty?: boolean;
    timeUnit?: string;
}

export type TimeBatchedGraph = { [date: number]: SigmaGraph };

export const graphTimeBatcher = (graph: SigmaGraph, options: TimeBatcherOptions = {}): TimeBatchedGraph=> {
    const removeEmpty = options.removeEmpty || false;
    const timeUnit = options.timeUnit || 'day';

    console.log("batching");

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

    console.log("firstTimeStamp", firstTimestamp, moment(firstTimestamp).calendar());

    const nodeIterator = graph.nodes.values();
    const edgeIterator = graph.edges.values();
    const daysIterator = getDayIterator(moment(firstTimestamp), timeUnit);

    let output: TimeBatchedGraph = {};

    let nextNode;
    let nextEdge;
    while (true) {
        let didAddNode = false;
        let didAddEdge = false;
        const day = daysIterator.next().value;

        output[day] = { nodes: [], edges: [] };

        if (didAddNode || !nextNode || !nextNode?.timeAdded) {
            nextNode = nodeIterator.next()?.value;
        }
        while (nextNode?.timeAdded && nextNode?.timeAdded < day) {
            didAddNode = true;
            output[day].nodes.push(nextNode);
            nextNode = nodeIterator.next()?.value;
        }

        if (didAddEdge || !nextEdge || !nextEdge?.timeAdded) {
            nextEdge = edgeIterator.next()?.value;
        }
        while (nextEdge?.timeAdded && nextEdge?.timeAdded < day) {
            didAddEdge = true;
            output[day].edges.push(nextEdge);
            nextEdge = edgeIterator.next()?.value;
        }

        if (output[day].nodes.length === 0 && output[day].edges.length === 0 && removeEmpty) {
            delete output[day];
        }

        if (typeof nextNode === "undefined" && typeof nextEdge === "undefined") {
            break;
        }
    }

    output[0] = {
        nodes: graph.nodes.filter(node => !node.hasOwnProperty("timeAdded")),
        edges: graph.edges.filter(edge => !edge.hasOwnProperty("timeAdded"))
    };

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