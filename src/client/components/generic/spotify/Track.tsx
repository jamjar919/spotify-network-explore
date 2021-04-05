import React, {FunctionComponent} from "react";
import {PlayTrackSampleButton} from "./PlayTrackSampleButton";

type TrackProps = {
    track: SpotifyApi.PlaylistTrackObject
};

export const Track: FunctionComponent<TrackProps> = ({ track }) => {

    return <div className="track">
        <PlayTrackSampleButton sampleUrl={track.track.preview_url}/>
        <span>
            {track.track.name}
        </span>
    </div>
};