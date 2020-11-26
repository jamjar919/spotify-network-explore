import React, {FunctionComponent, useState} from "react";
import {TimeBatchedGraph} from "../graph/graphTimeBatcher";
import classNames from 'classnames';
import moment from "moment";
import {selectCurrentBatch, selectCurrentBatchIndex, selectCurrentGraph} from "../selectors/batchedGraphSelector";
import {StatelessLoader} from "./StatelessLoader";
import {useDispatch} from "react-redux";
import {setBatchNumber} from "../actions/batchedGraphActions";

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
            { currentBatch !== null ?
                <BatchedGraphControlDisplay currentBatch={currentBatch} currentHoveredBatch={currentHoveredBatch} /> : ""
            }
            <div className="batched-graph-slice-container">
            {
                graph.map((batch, index) =>
                    <BatchedGraphTimeSlice
                        key={index}
                        batchIndex={index}
                        batch={batch}
                        isSelected={(currentBatch != null) && (currentBatchIndex >= index)}
                        onClick={(_batch, batchIndex) => setBatchNumber(batchIndex)(dispatch)}
                        onMouseEnter={(batch) => setHoveredBatch(batch)}
                        onMouseLeave={() => setHoveredBatch(undefined)}
                    />
                )
            }
            </div>
        </div>
    );
};


type BatchedGraphControlDisplayProps = { currentBatch?: TimeBatchedGraph, currentHoveredBatch?: TimeBatchedGraph };
const BatchedGraphControlDisplay: FunctionComponent<BatchedGraphControlDisplayProps> = ({
    currentBatch,
    currentHoveredBatch
}) => (
    <ul className="batched-graph-display">
        { currentBatch ? <li className="current-selected-batch">{getLocalisedDate(currentBatch)}</li> : "" }
        { currentHoveredBatch ? <li className="current-hovered-batch">Selected: {getLocalisedDate(currentHoveredBatch)}</li> : "" }
    </ul>
);

const getLocalisedDate = (currentBatch: TimeBatchedGraph): string => {
    const to = currentBatch.timeRange[1];
    if (to <= 3.154e+10) {
        return "";
    }
    return moment(to).format("MMMM Do YYYY");
};

type BatchedGraphTimeSliceProps = {
    batchIndex: number;
    batch: TimeBatchedGraph;
    isSelected: boolean;
    onClick: (batch: TimeBatchedGraph, batchIndex: number) => void;
    onMouseEnter: (batch: TimeBatchedGraph, batchIndex: number) => void;
    onMouseLeave: (batch: TimeBatchedGraph, batchIndex: number) => void;
}

const BatchedGraphTimeSlice: FunctionComponent<BatchedGraphTimeSliceProps> = ({
    batchIndex,
    batch,
    isSelected,
    onClick,
    onMouseEnter,
    onMouseLeave
}) => (
    <div
        className={classNames("batched-graph-slice", isSelected ? "selected" : "")}
        onClick={() => onClick(batch, batchIndex)}
        onMouseEnter={() => onMouseEnter(batch, batchIndex)}
        onMouseLeave={() => onMouseLeave(batch, batchIndex)}
    />
);

export default BatchedGraphControl;