import React, {FunctionComponent, useState} from "react";
import {TimeBatchedGraph} from "../graph/graphTimeBatcher";
import classNames from 'classnames';
import moment from "moment";

type BatchedGraphControlProps = {
    batchedGraph: TimeBatchedGraph[];
    currentBatch: number | null;
    onClickSlice: (batch: TimeBatchedGraph, batchIndex: number) => void;
}

const BatchedGraphControl: FunctionComponent<BatchedGraphControlProps> = ({
    batchedGraph,
    currentBatch,
    onClickSlice
}) => {
    const [currentHoveredBatch, setHoveredBatch] = useState<TimeBatchedGraph | undefined>(undefined);

    return (
        <div className="batched-graph-control">
            { currentBatch !== null ?
                <BatchedGraphControlDisplay currentBatch={batchedGraph[currentBatch]} currentHoveredBatch={currentHoveredBatch} /> : ""
            }
            <div className="batched-graph-slice-container">
            {
                batchedGraph.map((batch, index) =>
                    <BatchedGraphTimeSlice
                        key={index}
                        batchIndex={index}
                        batch={batch}
                        isSelected={(currentBatch != null) && (currentBatch >= index)}
                        onClick={onClickSlice}
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