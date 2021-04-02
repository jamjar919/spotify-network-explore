import React, {FunctionComponent, useEffect, useState} from "react";
import Play from "../../../svg/play.svg";
import Pause from "../../../svg/pause.svg";

type TrackProps = {
    track: SpotifyApi.PlaylistTrackObject
};

export const Track: FunctionComponent<TrackProps> = ({ track }) => {
    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    const [audio, setAudio] = useState<HTMLAudioElement | null>(null);
    const canPlaySample = track.track.preview_url !== null;

    useEffect(() => {
        // Initialise Audio if not playing
        if (isPlaying && canPlaySample && audio === null) {
            const newAudio = new Audio(track.track.preview_url || undefined);
            newAudio.addEventListener("canplaythrough", () => {
                newAudio.play();
            });
            newAudio.addEventListener("ended", () => {
                newAudio.currentTime = 0;
                newAudio.pause();
                setIsPlaying(false);
            });
            setAudio(newAudio);
        }

        // Handle pause/play when audio is initialised
        if (audio !== null) {
            const isCurrentlyPlaying = !audio.paused;

            if (!isCurrentlyPlaying && isPlaying) {
                audio.play();
            }

            if (isCurrentlyPlaying && !isPlaying) {
                audio.pause();
            }
        }

        return () => {
            audio?.pause();
        }

    }, [isPlaying, audio, track]);

    return <div key={track.track.id} className="track">
        {
            canPlaySample &&
            <button onClick={() => setIsPlaying((prevState => !prevState))}>
                {isPlaying ? <Pause /> : <Play />}
            </button>
        }
        <span>
            {track.track.name}
        </span>
    </div>
};