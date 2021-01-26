import React, {FunctionComponent, useState} from "react";
import { Slider } from '@material-ui/core';
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
        <Slider
            defaultValue={0}
            aria-labelledby="discrete-slider-small-steps"
            step={1}
            marks
            min={}
            max={0.0000001}
            valueLabelDisplay="auto"
        />
    );
};

export default BatchedGraphControl;