import React, {FunctionComponent, useEffect, useState} from "react";
import Play from "../../../svg/play.svg";
import Pause from "../../../svg/pause.svg";
import {useAudio} from "../../../hooks/useAudio";

type TrackProps = {
    track: SpotifyApi.PlaylistTrackObject
};

export const Track: FunctionComponent<TrackProps> = ({ track }) => {
    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    const { play, pause } = useAudio(
        (newSrc) => setIsPlaying(newSrc === track.track.preview_url),
        () => setIsPlaying(false)
    );
    const canPlaySample = track.track.preview_url !== null;

    const handleClick = () => {
        if (canPlaySample) {
            // Initialise Audio if not playing
            if (!isPlaying) {
                play(track.track.preview_url || "");
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

    return <div key={track.track.id} className="track">
        {
            canPlaySample &&
            <button onClick={() => handleClick()}>
                {isPlaying ? <Pause /> : <Play />}
            </button>
        }
        <span>
            {track.track.name}
        </span>
    </div>
};