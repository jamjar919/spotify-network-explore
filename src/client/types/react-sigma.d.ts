declare module "react-sigma";

type Sigma = {
    graph: ActiveSigmaGraph;
    refresh: () => void;
};

type ActiveSigmaGraph = {
    nodes: () => SigmaNode[];
    edges: () => SigmaEdge[];
    addNode: (node: SigmaNode) => void;
    addEdge: (node: SigmaEdge) => void;
    dropNode: (nodeId: string) => void;
    dropEdge: (nodeId: string) => void;
    degree: (nodeId: string, type: string) => number;
    read: (graph: SigmaGraph) => void;
    clear: () => void;
    kill: () => void;
}

type SigmaGraph = {
    nodes: SigmaNode[],
    edges: SigmaEdge[]
}

type SigmaNode = {
    id: string;
    label: string;
    x?: number;
    y?: number;
    size?: number;
    color?: string;
}

type SigmaEdge = {
    id: string;
    source: string;
    target: string;
    label?: string,
    color?: string;
}