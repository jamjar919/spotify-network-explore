import React, {FunctionComponent, useEffect, useState} from "react";
import Play from "../../../svg/play.svg";
import Pause from "../../../svg/pause.svg";
import Prev from "../../../svg/prev.svg";
import Next from "../../../svg/next.svg";
import {useDispatch} from "react-redux";
import {
    decrementBatchNumberAction,
    incrementBatchNumberAction,
    toggleGraphPlaybackAction
} from "../../../actions/batchedGraphActions";
import {usePrevious} from "../../../hooks/usePrevious";
import {selectIsPlaying, selectPlaybackTimeStep} from "../../../selectors/batchedGraphSelector";

const BatchedGraphControlBatchControl: FunctionComponent<{}> = () => {
    const dispatch = useDispatch();
    const [iteratorReference, setIteratorReference] = useState<NodeJS.Timeout | null>(null);
    const isPlaying = selectIsPlaying();
    const wasPlaying = usePrevious(isPlaying);

    const playbackTimeStep = selectPlaybackTimeStep();

    useEffect(() => {
        // Playback was started
        if (!wasPlaying && isPlaying) {
            setIteratorReference(
                setInterval(() => incrementBatchNumberAction()(dispatch), playbackTimeStep)
            );
        }

        // Playback was stopped
        if (wasPlaying && iteratorReference && !isPlaying) {
            clearInterval(iteratorReference);
        }

        // Cleanup
        return () => {
            if (iteratorReference) {
                clearInterval(iteratorReference)
            }
        };
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