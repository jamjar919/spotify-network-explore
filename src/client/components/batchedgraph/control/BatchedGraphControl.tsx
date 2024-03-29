import React, {FunctionComponent, useEffect} from "react";
import { Slider } from "@material-ui/core";
import moment from "moment";
import {selectCurrentBatchIndex, selectBatchedGraph} from "../../../selectors/batchedGraphSelector";
import {setBatchNumberAction} from "../../../actions/batchedGraphActions";
import {useDispatch} from "react-redux";
import {TimeBatchedGraph} from "../../../graph/graphTimeBatcher";
import BatchedGraphControlPlayPause from "./BatchedGraphControlPlayPause";
import {StatelessLoader} from "../../StatelessLoader";
import SliderThumb from "./SliderThumb";

type BatchedGraphControlProps = {}

const BatchedGraphControl: FunctionComponent<BatchedGraphControlProps> = () => {
     const dispatch = useDispatch();

    const graph = selectBatchedGraph();
    const currentBatchIndex = selectCurrentBatchIndex();

    if (graph === null || currentBatchIndex === null) {
        return <StatelessLoader/>;
    }

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            const startBatchIndex = graph.length - 1;
            setBatchNumberAction(startBatchIndex)(dispatch);
        }, 1);

        return () => clearTimeout(timeoutId);
    }, [graph]);

    return (
        <div className="batched-graph-control">
            <div className="batched-graph-control-slider-container">
                <Slider
                    className="batched-graph-control-slider"
                    value={currentBatchIndex}
                    onChange={(_, batchIndex) => setBatchNumberAction(batchIndex as number)(dispatch)}
                    step={1}
                    min={0}
                    max={graph?.length - 1}
                    valueLabelDisplay={"on"}
                    valueLabelFormat={(value) => getLocalisedDate(graph[value])}
                    ValueLabelComponent={(props) => <SliderThumb {...props} />}
                />
            </div>
            <BatchedGraphControlPlayPause/>
        </div>
    );
};

const getLocalisedDate = (currentBatch: TimeBatchedGraph): string => {
    const to = currentBatch.timeRange[1];
    if (to <= 3.154e+10) {
        return "";
    }
    return moment(to).format("MMMM Do YYYY");
};

export default BatchedGraphControl;