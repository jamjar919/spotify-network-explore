import React, {FunctionComponent} from "react";
import {TimeBatchedGraph} from "../graph/graphTimeBatcher";
import classNames from 'classnames';

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
            {
                batchedGraph.map((batch, index) =>
                    <BatchedGraphTimeSlice
                        key={index}
                        batchIndex={index}
                        batch={batch}
                        isSelected={currentBatch === index}
                        onClick={onClickSlice}
                        onHover={onHoverSlice}
                    />
                )
            }
        </div>
    );
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
    >

    </div>
);

export default BatchedGraphControl;