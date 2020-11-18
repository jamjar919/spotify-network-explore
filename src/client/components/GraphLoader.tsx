import React, {FunctionComponent, useEffect, useState} from 'react';
import embedProps from "../util/embedProps";

type GraphLoaderProps = {
    graph: SigmaGraph,
    sigma?: Sigma,
    options?: {
        append?: boolean // Appends nodes passed in instead of replacing them
    }
}

/**
 * This component loads the graph passed in when the property is changed.
 * @param graph
 * @param sigma
 * @param options
 * @param children
 * @constructor
 */
const GraphLoader: FunctionComponent<GraphLoaderProps> = ({
    graph, sigma, options, children
}) => {
    const [loaded, setLoaded] = useState(false);

    const append = options?.append;

    useEffect(() => {
        setLoaded(false);
    }, [graph]);

    if (!loaded) {
        if (graph && typeof sigma !== "undefined") {
            if (append) {
                const {
                    nodes,
                    edges
                } = graph;
                nodes.forEach(node => sigma.graph.addNode(node));
                edges.forEach(edge => sigma.graph.addEdge(edge));
            } else {
                sigma.graph.clear();
                sigma.graph.read(graph);
                sigma.refresh();
            }
        }
        setLoaded(true);
    }

    if (!loaded) {
        return null
    }

    return (<>{embedProps(children, { sigma })}</>);
};

export default GraphLoader;