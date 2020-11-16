import {SpotifyTracksMap} from "../reducers/spotifyTracksReducer";
import PlaylistBaseObject = SpotifyApi.PlaylistBaseObject;
import {getNodesFromPlaylists, getNodesFromTracks} from "./nodeGenerators";
import {colorFromString} from "./color";

export const tracksGraph = (
    playlists: PlaylistBaseObject[],
    tracks: SpotifyTracksMap
): SigmaGraph => {
    let nodes: SigmaNode[] = [];
    nodes = nodes.concat(getNodesFromPlaylists(
        playlists,
        () => 20
    ));
    nodes = nodes.concat(getNodesFromTracks(
        tracks,
        () => 1
    ));

    const edges: SigmaEdge[] = Object.entries(tracks)
        .flatMap(([playlistId, trackList]) => trackList.map((track) => ({
            id: `${playlistId}:${track.track.id}`,
            source: track.track.id,
            target: playlistId,
            color: colorFromString(playlistId)
        })));

    return {
        nodes,
        edges
    };
};