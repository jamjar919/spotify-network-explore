import PlaylistBaseObject = SpotifyApi.PlaylistBaseObject;
import {SpotifyTracksMap} from "../reducers/spotifyTracksReducer";
import PlaylistTrackObject = SpotifyApi.PlaylistTrackObject;
import dedupe from 'array-dedupe';
import {colorFromString} from "./color";

export const getNodesFromPlaylists = (
    playlists: PlaylistBaseObject[],
    getNodeSize: (id: string) => number
) => {
    return playlists.map(playlist => ({
        id: playlist.id,
        label: playlist.name,
        size: getNodeSize(playlist.id),
        color: colorFromString(playlist.id)
    }));
};

export const getNodesFromTracks = (
    trackMap: SpotifyTracksMap,
    getNodeSize: (id: string) => number
) => {
    return dedupe(Object.values(trackMap)
        .flatMap((tracks: PlaylistTrackObject[]) =>
            tracks.map(track => ({
                id: track.track.id,
                label: track.track.name,
                size: getNodeSize(track.track.id)
            }))
        )
    , ['id'])
};