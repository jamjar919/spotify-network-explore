import React, {FunctionComponent, useEffect, useState} from "react";
import {useAudio} from "../../../hooks/useAudio";
import Pause from "../../../svg/pause.svg";
import Play from "../../../svg/play.svg";

type PlayTrackSampleProps = {
    sampleUrl: string | null
}

/**
 * Render a play/pause button that plays a short music sample on click.
 */
export const PlayTrackSampleButton: FunctionComponent<PlayTrackSampleProps> = ({ sampleUrl }) => {
    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    const { play, pause } = useAudio(
        (newSrc) => setIsPlaying(newSrc === sampleUrl),
        () => setIsPlaying(false)
    );
    const canPlaySample = sampleUrl !== null;

    const handleClick = () => {
        if (canPlaySample) {
            if (!isPlaying) {
                play(sampleUrl || "");
            }

            if (isPlaying) {
                pause();
            }
        }
    };

    // Pause on unmount
    useEffect(() => {
        return () => {
            pause();
            setIsPlaying(false);
        };
    }, []);

    return (
        <>
        {
            canPlaySample &&
            <button onClick={() => handleClick()}>
                {isPlaying ? <Pause /> : <Play />}
            </button>
        }
        </>
    );
}