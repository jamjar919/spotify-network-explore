import React, {FunctionComponent} from "react";
import Play from "../../../svg/play.svg";
import Pause from "../../../svg/pause.svg";
import Prev from "../../../svg/prev.svg";
import Next from "../../../svg/next.svg";

const BatchedGraphControlBatchControl: FunctionComponent<{}> = () => {
    const isPlaying = false;

    return (
        <div className="batch-controller">
            <button className="batch-controller-previous">
                <Prev />
            </button>
            <button className="batch-controller-play-pause">
                {isPlaying ? <Pause /> : <Play />}
            </button>
            <button className="batch-controller-next">
                <Next />
            </button>
        </div>
    );
};

export default BatchedGraphControlBatchControl;