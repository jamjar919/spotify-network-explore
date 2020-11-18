import PlaylistBaseObject = SpotifyApi.PlaylistBaseObject;
import {SpotifyTracksMap} from "../reducers/spotifyTracksReducer";
import PlaylistTrackObject = SpotifyApi.PlaylistTrackObject;
import dedupe from 'array-dedupe';

export const getNodesFromPlaylists = (
    playlists: PlaylistBaseObject[],
    getAdditionalProps:
        (playlist: PlaylistBaseObject) => any = () => ({})
) => {
    return playlists.map(playlist => ({
        id: playlist.id,
        label: `  ${playlist.name}`,
        ...getAdditionalProps(playlist)
    }));
};

export const getNodesFromTracks = (
    trackMap: SpotifyTracksMap,
    getAdditionalProps:
        (track: PlaylistTrackObject, playlistId: string) => any = () => ({})
) => {
    return dedupe(Object.entries(trackMap)
        .flatMap(([playlistId, tracks]) =>
            tracks.map(track => ({
                id: track.track.id,
                label: track.track.name,
                ...getAdditionalProps(track, playlistId)
            }))
        )
    , ['id'])
};