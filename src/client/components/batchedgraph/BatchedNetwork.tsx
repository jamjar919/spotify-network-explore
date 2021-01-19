import React from "react";
import {Sigma} from 'react-sigma';
import {TimeBatchedGraph} from "../../graph/graphTimeBatcher";
import BatchedGraphLoader from "./BatchedGraphLoader";
import CustomForceAtlas2 from "../CustomForceAtlas2";
import {useDispatch} from "react-redux";
import {selectNodeAction} from "../../actions/batchedGraphActions";
import {selectShouldAnimateGraph} from "../../selectors/batchedGraphSelector";
import {graphSettings, graphStyle} from "../../graph/graphSettings";

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
            settings={graphSettings}
            style={graphStyle}
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
                scalingRatio={2}
                iterationsPerRender={1}
                barnesHutOptimize
                barnesHutTheta={1}
                linLogMode={true}
                gravity={0.01}
                worker
            >
                <BatchedGraphLoader batchedGraph={batchedGraph} batchToLoad={currentBatch} />
            </CustomForceAtlas2>
        </Sigma>
    );
};

export default BatchedNetwork;