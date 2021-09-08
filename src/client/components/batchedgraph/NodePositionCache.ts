type OptionalPosition = {
    x: number | undefined;
    y: number | undefined
}

class NodePositionCache {
    private cache: { [nodeId: string]: OptionalPosition } = {};

    addPosition = (node: SigmaNode) => {
        this.cache[node.id] = {
            x: node.x,
            y: node.y
        }
    }

    getPosition = (nodeId: string): OptionalPosition => this.cache[nodeId] || {};

    addNodeWithCache = (graph: ActiveSigmaGraph, node: SigmaNode) => {
        const prevPosition = this.getPosition(node.id);

        graph.addNode({
            ...node,
            ...prevPosition
        });
    }

    dropNodeWithCache = (graph: ActiveSigmaGraph, node: SigmaNode) => {
        this.addPosition(graph.nodes(node.id) as SigmaNode);
        graph.dropNode(node.id);
    }
}



export { NodePositionCache }