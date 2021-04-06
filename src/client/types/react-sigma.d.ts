declare module "react-sigma";

type Sigma = {
    graph: ActiveSigmaGraph;
    refresh: () => void;
    startForceAtlas2: (options?: ForceAtlas2Options) => void;
    stopForceAtlas2: () => void;
    killForceAtlas2: () => void;
    utils: any;
    canvas: any;
};

type ActiveSigmaGraph = {
    nodes: (id?: string) => SigmaNode | SigmaNode[];
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
    timeAdded?: number;
    type?: string;
    image?: {
        size: number;
        url: string;
        scale?: number;
        clip?: number;
        w?: number;
        h?: number;
    };
    [key: string]: any
}

type SigmaEdge = {
    id: string;
    source: string;
    target: string;
    label?: string,
    color?: string;
    timeAdded?: number;
    desc?: string;
    size?: number;
}

type ForceAtlas2Options = {
    worker: boolean,
    barnesHutOptimize?: boolean,
    barnesHutTheta?: number,
    adjustSizes?: boolean,
    iterationsPerRender?: number,
    linLogMode: boolean,
    outboundAttractionDistribution?: boolean,
    edgeWeightInfluence?: number,
    scalingRatio?: number,
    strongGravityMode?: boolean,
    slowDown?: number,
    gravity?: number,
    timeout?: number,
}

type SigmaEvent = {
    data: {
        node?: SigmaNode,
        edge?: SigmaEdge,
        captor: {
            clientX: number,
            clientY: number
        }
    }
};