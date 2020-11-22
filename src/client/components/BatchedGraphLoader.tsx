import React, {FunctionComponent, useEffect, useState} from 'react';
import embedProps from "../util/embedProps";
import {TimeBatchedGraph} from "../graph/graphTimeBatcher";

type BatchedGraphLoaderProps = {
    batchedGraph: TimeBatchedGraph[],
    batchToLoad: number,
    sigma?: Sigma,
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

    useEffect(() => {
        if (batchToLoad >= batchedGraph.length) {
            return;
        }

        const batch = batchedGraph[batchToLoad].graph;
        console.log("loading", batchToLoad, batch);

        if (batchedGraph && typeof sigma !== "undefined") {
            const {
                nodes,
                edges
            } = batch;

            nodes.forEach(node => sigma.graph.addNode(node));

            edges.forEach(edge => {
                const matchingNodes = sigma.graph.nodes().filter(node => node.id === edge.source);
                if (matchingNodes.length > 0) {
                    sigma.graph.addEdge(edge);
                }
            });

            sigma.refresh();
        }

        setLoaded(true);
    }, [batchToLoad]);

    if (!loaded) {
        return null
    }


    return (<>{embedProps(children, { sigma })}</>);
};

export default BatchedGraphLoader;