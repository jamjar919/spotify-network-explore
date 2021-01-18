import React from "react";
import {Sigma} from 'react-sigma';
import {TimeBatchedGraph} from "../../graph/graphTimeBatcher";
import BatchedGraphLoader from "./BatchedGraphLoader";
import CustomForceAtlas2 from "../CustomForceAtlas2";
import {useDispatch} from "react-redux";
import {selectNodeAction} from "../../actions/batchedGraphActions";
import {selectShouldAnimateGraph} from "../../selectors/batchedGraphSelector";

type BatchedNetworkPropTypes = {
    batchedGraph: TimeBatchedGraph[],
    currentBatch: number;
};

const BatchedNetwork = ({
    batchedGraph,
    currentBatch
}: BatchedNetworkPropTypes) => {
    const dispatch = useDispatch();
    const animating = selectShouldAnimateGraph();

    return (
        <Sigma
            renderer="webgl"
            settings={{
                clone: true,
                defaultLabelColor: "#f2f2f2",
                defaultLabelHoverColor: "#2a2d32",
                defaultHoverLabelBGColor: "#f2f2f2",
                defaultNodeColor: "#f2f2f2",
                edgeHoverExtremities: true,
                hideEdgesOnMove: true
            }}
            style={{
                height: "100vh",
            }}
            onSigmaException={(e: any) => console.error(e)}
            onClickNode={(e: SigmaEvent) => {
                if (e.data.node?.id) {
                    selectNodeAction(e.data.node?.id)(dispatch);
                }
            }}
        >
               <CustomForceAtlas2
                    stopSimulation={!animating}
                    slowDown={2}
                    iterationsPerRender={1}
                    barnesHutOptimize
                    barnesHutTheta={1}
                    linLogMode={true}
                    gravity={0.1}
                    worker
                >
                   <BatchedGraphLoader batchedGraph={batchedGraph} batchToLoad={currentBatch} />
               </CustomForceAtlas2>
        </Sigma>
    );
};

export default BatchedNetwork;