import React, {FunctionComponent} from "react";
import {PlayTrackSampleButton} from "./PlayTrackSampleButton";

type TrackProps = {
    track: SpotifyApi.TrackObjectFull
};

export const Track: FunctionComponent<TrackProps> = ({ track }) => {

    return <div className="track">
        <PlayTrackSampleButton sampleUrl={track.preview_url}/>
        <span>
            {track.name}
        </span>
    </div>
};