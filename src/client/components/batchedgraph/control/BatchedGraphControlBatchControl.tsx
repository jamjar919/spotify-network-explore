import React, {FunctionComponent} from "react";
import Play from "../../../svg/play.svg";
import Pause from "../../../svg/pause.svg";
import Prev from "../../../svg/prev.svg";
import Next from "../../../svg/next.svg";
import {useDispatch} from "react-redux";
import {decrementBatchNumberAction, incrementBatchNumberAction} from "../../../actions/batchedGraphActions";

const BatchedGraphControlBatchControl: FunctionComponent<{}> = () => {
    const dispatch = useDispatch();

    const isPlaying = false;

    return (
        <div className="batch-controller">
            <button className="batch-controller-previous" onClick={() => decrementBatchNumberAction()(dispatch)}>
                <Prev />
            </button>
            <button className="batch-controller-play-pause">
                {isPlaying ? <Pause /> : <Play />}
            </button>
            <button className="batch-controller-next" onClick={() => incrementBatchNumberAction()(dispatch)}>
                <Next />
            </button>
        </div>
    );
};

export default BatchedGraphControlBatchControl;