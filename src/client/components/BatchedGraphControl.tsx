import React, {FunctionComponent} from "react";
import {TimeBatchedGraph} from "../graph/graphTimeBatcher";
import classNames from 'classnames';
import moment from "moment";

type BatchedGraphControlProps = {
    batchedGraph: TimeBatchedGraph[];
    currentBatch: number | null;
    onClickSlice: (batch: TimeBatchedGraph, batchIndex: number) => void;
    onHoverSlice: (batch: TimeBatchedGraph, batchIndex: number) => void;
}

const BatchedGraphControl: FunctionComponent<BatchedGraphControlProps> = ({
    batchedGraph,
    currentBatch,
    onClickSlice,
    onHoverSlice
}) => {
    return (
        <div className="batched-graph-control">
            { currentBatch !== null ? <BatchedGraphControlDisplay currentBatch={batchedGraph[currentBatch]} /> : "" }
            <div className="batched-graph-slice-container">
            {
                batchedGraph.map((batch, index) =>
                    <BatchedGraphTimeSlice
                        key={index}
                        batchIndex={index}
                        batch={batch}
                        isSelected={(currentBatch != null) && (currentBatch >= index)}
                        onClick={onClickSlice}
                        onHover={onHoverSlice}
                    />
                )
            }
            </div>
        </div>
    );
};


type BatchedGraphControlDisplayProps = { currentBatch: TimeBatchedGraph };
const BatchedGraphControlDisplay: FunctionComponent<BatchedGraphControlDisplayProps> = ({ currentBatch }) => (
    <div className="batched-graph-display">
        {getLocalisedDate(currentBatch)}
    </div>
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
    onHover: (batch: TimeBatchedGraph, batchIndex: number) => void;
}

const BatchedGraphTimeSlice: FunctionComponent<BatchedGraphTimeSliceProps> = ({
    batchIndex,
    batch,
    isSelected,
    onClick,
    onHover
}) => (
    <div
        className={classNames("batched-graph-slice", isSelected ? "selected" : "")}
        onClick={() => onClick(batch, batchIndex)}
        onMouseOver={() => onHover(batch, batchIndex)}
    />
);

export default BatchedGraphControl;