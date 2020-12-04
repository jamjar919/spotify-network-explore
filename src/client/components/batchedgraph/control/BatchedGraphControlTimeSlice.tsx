import {TimeBatchedGraph} from "../../../graph/graphTimeBatcher";
import React, {FunctionComponent} from "react";
import classNames from "classnames";

type BatchedGraphTimeSliceProps = {
    batchIndex: number;
    batch: TimeBatchedGraph;
    isSelected: boolean;
    onClick: (batch: TimeBatchedGraph, batchIndex: number) => void;
    onMouseEnter: (batch: TimeBatchedGraph, batchIndex: number) => void;
    onMouseLeave: (batch: TimeBatchedGraph, batchIndex: number) => void;
}

const BatchedGraphControlTimeSlice: FunctionComponent<BatchedGraphTimeSliceProps> = ({
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

export default BatchedGraphControlTimeSlice;