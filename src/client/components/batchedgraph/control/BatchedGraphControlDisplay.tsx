import {TimeBatchedGraph} from "../../../graph/graphTimeBatcher";
import React, {FunctionComponent} from "react";
import moment from "moment";

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

export default BatchedGraphControlDisplay;