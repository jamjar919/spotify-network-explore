import React, {FunctionComponent} from "react";
import PlaylistBaseObject = SpotifyApi.PlaylistBaseObject;
import PlaylistTrackObject = SpotifyApi.PlaylistTrackObject;
import {Playlist} from "../../generic/spotify/Playlist";

type PlaylistTabProps = {
    selected: {
        playlist: PlaylistBaseObject,
        tracks: PlaylistTrackObject[]
    }[]
};

export const PlaylistTab: FunctionComponent<PlaylistTabProps> = ({ selected }) => {
    const sorted = selected.sort((a, b) =>
        b.tracks.length - a.tracks.length
    );

    return (
        <>
            {sorted.map(({ playlist, tracks }) => (
                <Playlist playlist={playlist} tracks={tracks}/>
            ))}
        </>
    )
};