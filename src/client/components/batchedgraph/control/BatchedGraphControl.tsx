import React, {FunctionComponent, useState} from "react";
import {TimeBatchedGraph} from "../../../graph/graphTimeBatcher";
import {selectCurrentBatch, selectCurrentBatchIndex, selectCurrentGraph} from "../../../selectors/batchedGraphSelector";
import {StatelessLoader} from "../../StatelessLoader";
import {useDispatch} from "react-redux";
import {setBatchNumberAction} from "../../../actions/batchedGraphActions";
import BatchedGraphControlDisplay from "./BatchedGraphControlDisplay";
import BatchedGraphControlTimeSlice from "./BatchedGraphControlTimeSlice";
import BatchedGraphControlBatchControl from "./BatchedGraphControlBatchControl";

type BatchedGraphControlProps = {}

const BatchedGraphControl: FunctionComponent<BatchedGraphControlProps> = () => {
    const dispatch = useDispatch();

    const [currentHoveredBatch, setHoveredBatch] = useState<TimeBatchedGraph | undefined>(undefined);
    const graph = selectCurrentGraph();
    const currentBatch = selectCurrentBatch();
    const currentBatchIndex = selectCurrentBatchIndex();

    if (graph === null || currentBatchIndex === null) {
        return <StatelessLoader/>;
    }

    return (
        <div className="batched-graph-control">
            { currentBatch !== null ? (<>
                    <BatchedGraphControlDisplay currentBatch={currentBatch} currentHoveredBatch={currentHoveredBatch} />
                    <BatchedGraphControlBatchControl />
                </>) : ""
            }
            <div className="batched-graph-slice-container">
            {
                graph.map((batch, index) =>
                    <BatchedGraphControlTimeSlice
                        key={index}
                        batchIndex={index}
                        batch={batch}
                        isSelected={(currentBatch != null) && (currentBatchIndex >= index)}
                        onClick={(_batch, batchIndex) => setBatchNumberAction(batchIndex)(dispatch)}
                        onMouseEnter={(batch) => setHoveredBatch(batch)}
                        onMouseLeave={() => setHoveredBatch(undefined)}
                    />
                )
            }
            </div>
        </div>
    );
};

export default BatchedGraphControl;