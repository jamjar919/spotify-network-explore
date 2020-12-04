import React, {FunctionComponent, useEffect, useState} from 'react';
import embedProps from "../../util/embedProps";
import {TimeBatchedGraph} from "../../graph/graphTimeBatcher";
import {usePrevious} from "../../hooks/usePrevious";

type BatchedGraphLoaderProps = {
    batchedGraph: TimeBatchedGraph[];
    batchToLoad: number;
    sigma?: Sigma;
}

/**
 * This component loads a batched graph passed in when the property is changed.
 * @param graph
 * @param sigma
 * @param children
 * @constructor
 */
const BatchedGraphLoader: FunctionComponent<BatchedGraphLoaderProps> = ({
    batchedGraph,
    batchToLoad,
    sigma,
    children
}) => {
    const [loaded, setLoaded] = useState(false);
    const prevBatch = usePrevious(batchToLoad) || 0;
    const prevBatchGraphSize = usePrevious(batchedGraph.length) || 0;

    useEffect(() => {
        // Can we load the batch?
        if (batchToLoad >= batchedGraph.length) {
            return;
        }

        if (batchedGraph && typeof sigma !== "undefined") {

            // If we completely swap out the graph, reload the whole thing
            if (prevBatchGraphSize !== batchedGraph.length) {
                console.debug("Reloading graph");
                sigma.graph.clear();
                sigma.refresh();
            }

            if (
                (prevBatch === batchToLoad) ||
                (prevBatchGraphSize !== batchedGraph.length)
            ) {
                // Are we adding nodes from just one batch?
                const batch = batchedGraph[batchToLoad];
                batch.graph.nodes.forEach(node => sigma.graph.addNode(node));
                batch.graph.edges.forEach(edge => sigma.graph.addEdge(edge));

            } else if (prevBatch < batchToLoad) {
                // Are we going forward in time, eg adding nodes?
                const segments = batchedGraph.slice(prevBatch + 1, batchToLoad + 1); // include selected batch and exclude previously added nodes

                segments.forEach((segment) => {
                    segment.graph.nodes.forEach(node => sigma.graph.addNode(node));
                    segment.graph.edges.forEach(edge => sigma.graph.addEdge(edge));
                });
            } else {
                // Else we're removing nodes
                const segments = batchedGraph.slice(batchToLoad + 1, prevBatch + 1);

                // Remove edges first to avoid removing edges twice (as they're removed automatically on node removal)
                segments.forEach((segment) => {
                    segment.graph.edges.forEach(edge => sigma.graph.dropEdge(edge.id));
                });

                segments.forEach((segment) => {
                    segment.graph.nodes.forEach(node => sigma.graph.dropNode(node.id));
                });
            }
            sigma.refresh();
        }

        setLoaded(true);
    }, [batchedGraph.length, batchToLoad]);

    if (!loaded) {
        return null
    }


    return (<>{embedProps(children, { sigma })}</>);
};

export default BatchedGraphLoader;