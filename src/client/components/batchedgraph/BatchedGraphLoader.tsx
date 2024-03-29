import React, {FunctionComponent, useEffect, useState} from 'react';
import embedProps from "../../util/embedProps";
import {TimeBatchedGraph} from "../../graph/graphTimeBatcher";
import {usePrevious} from "../../hooks/usePrevious";
import {NodePositionCache} from "./NodePositionCache";

type BatchedGraphLoaderProps = {
    batchedGraph: TimeBatchedGraph[];
    batchToLoad: number;
    selectedId?: string;
    sigma?: Sigma;
}

const cache = new NodePositionCache();

/**
 * This component loads a batched graph passed in when the property is changed.
 * @param graph
 * @param sigma
 * @param selectedId optional selected node
 * @param children
 * @constructor
 */
const BatchedGraphLoader: FunctionComponent<BatchedGraphLoaderProps> = ({
    batchedGraph,
    batchToLoad,
    sigma,
    selectedId,
    children
}) => {
    const [loaded, setLoaded] = useState(false);
    const prevBatch = usePrevious(batchToLoad) || 0;
    const prevBatchGraphSize = usePrevious(batchedGraph.length) || 0;
    const prevSelected = usePrevious(selectedId);

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
                batch.graph.nodes.forEach(node => cache.addNodeWithCache(sigma.graph, node));
                batch.graph.edges.forEach(edge => sigma.graph.addEdge(edge));

            } else if (prevBatch < batchToLoad) {
                // Are we going forward in time, eg adding nodes?
                const segments = batchedGraph.slice(prevBatch + 1, batchToLoad + 1); // include selected batch and exclude previously added nodes

                segments.forEach((segment) => {
                    segment.graph.nodes.forEach(node => cache.addNodeWithCache(sigma.graph, node));
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
                    segment.graph.nodes.forEach(node => cache.dropNodeWithCache(sigma.graph, node));
                });
            }
            sigma.refresh();
        }

        setLoaded(true);
    }, [batchedGraph.length, batchToLoad]);

    useEffect(() => {
        if (sigma) {
            if (prevSelected) {
                const node = sigma.graph.nodes(prevSelected) as SigmaNode;
                if (node) {
                    node.type = undefined;
                }
            }

            if (selectedId) {
                const node = sigma.graph.nodes(selectedId) as SigmaNode;
                if (node) {
                    node.type = "selected";
                }
            }

            sigma.refresh();
        }
    }, [selectedId]);

    if (!loaded) {
        return null
    }

    return (<>{embedProps(children, { sigma })}</>);
};

export default BatchedGraphLoader;