import React from "react";
import {Sigma} from 'react-sigma';
import {TimeBatchedGraph} from "../graph/graphTimeBatcher";
import BatchedGraphLoader from "./BatchedGraphLoader";
import CustomForceAtlas2 from "./CustomForceAtlas2";

type BatchedNetworkPropTypes = {
    batchedGraph: TimeBatchedGraph[],
    currentBatch: number;
};

const BatchedNetwork = ({
    batchedGraph,
    currentBatch
}: BatchedNetworkPropTypes) => (
    <Sigma
        renderer="canvas"
        settings={{
            clone: true
        }}
        style={{
            height: "100vh"
        }}
        onSigmaException={(e: any) => console.error(e)}
    >
           <CustomForceAtlas2
                slowDown={2}
                iterationsPerRender={1}
                barnesHutOptimize
                barnesHutTheta={1}
                linLogMode={true}
                worker
            >
               <BatchedGraphLoader batchedGraph={batchedGraph} batchToLoad={currentBatch} />
           </CustomForceAtlas2>
    </Sigma>
);

export default BatchedNetwork;