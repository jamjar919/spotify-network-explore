import React from "react";

import PlaylistBaseObject = SpotifyApi.PlaylistBaseObject;
import PlaylistTrackObject = SpotifyApi.PlaylistTrackObject;
import {Track} from "../../generic/spotify/Track";

type PlaylistTabProps = {
    selected: {
        playlist: PlaylistBaseObject,
        tracks: PlaylistTrackObject[]
    }[]
};

export const PlaylistTab: React.FunctionComponent<PlaylistTabProps> = ({ selected }) => (
    <>
    {selected.map(({ playlist, tracks }) => (
        <div key={playlist.id}>
            <h4>{playlist.name}</h4>
            <ul>
                {tracks.map((track) => <Track track={track} />)}
            </ul>
        </div>
    ))}
    </>
);