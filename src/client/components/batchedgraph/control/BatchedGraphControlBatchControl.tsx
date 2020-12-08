import React, {FunctionComponent, useEffect, useState} from "react";
import Play from "../../../svg/play.svg";
import Pause from "../../../svg/pause.svg";
import Prev from "../../../svg/prev.svg";
import Next from "../../../svg/next.svg";
import {useDispatch, useSelector} from "react-redux";
import {
    decrementBatchNumberAction,
    incrementBatchNumberAction,
    toggleGraphPlaybackAction
} from "../../../actions/batchedGraphActions";
import {State} from "../../../reducers/rootReducer";
import {usePrevious} from "../../../hooks/usePrevious";

const BatchedGraphControlBatchControl: FunctionComponent<{}> = () => {
    const dispatch = useDispatch();
    const [iteratorReference, setIteratorReference] = useState<NodeJS.Timeout | null>(null);
    const isPlaying = useSelector((state: State) => state.batchedGraph?.playback || false);
    const wasPlaying = usePrevious(isPlaying);
    
    useEffect(() => {

        // Playback was started
        if (!wasPlaying && isPlaying) {
            setIteratorReference(
                setInterval(() => incrementBatchNumberAction()(dispatch), 100)
            );
        }

        // Playback was stopped
        if (wasPlaying && iteratorReference && !isPlaying) {
            clearInterval(iteratorReference);
        }

    }, [wasPlaying, isPlaying]);

    return (
        <div className="batch-controller">
            <button className="batch-controller-previous" onClick={() => decrementBatchNumberAction()(dispatch)}>
                <Prev />
            </button>
            <button className="batch-controller-play-pause" onClick={() => toggleGraphPlaybackAction()(dispatch)}>
                {isPlaying ? <Pause /> : <Play />}
            </button>
            <button className="batch-controller-next" onClick={() => incrementBatchNumberAction()(dispatch)}>
                <Next />
            </button>
        </div>
    );
};

export default BatchedGraphControlBatchControl;