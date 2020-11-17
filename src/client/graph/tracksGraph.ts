import {SpotifyTracksMap} from "../reducers/spotifyTracksReducer";
import PlaylistBaseObject = SpotifyApi.PlaylistBaseObject;
import {getNodesFromPlaylists, getNodesFromTracks} from "./nodeGenerators";
import {colorFromString} from "../util/color";
import {getRandomPosition, NodePosition, randomisePosition} from "./positionUtil";

export const tracksGraph = (
    playlists: PlaylistBaseObject[],
    tracks: SpotifyTracksMap
): SigmaGraph => {
    const playlistNodeCoords: {[playlistId: string]: NodePosition} = {};

    let nodes: SigmaNode[] = [];
    nodes = nodes.concat(getNodesFromPlaylists(
        playlists,
        (playlist) => {
            const position = getRandomPosition();
            playlistNodeCoords[playlist.id] = position;
            return {
                size: 20,
                color: colorFromString(playlist.id),
                fixed: true,
                ...position
            }
        }
    ));

    nodes = nodes.concat(getNodesFromTracks(
        tracks,
        (_track, playlistId) => {
            const initialPosition = playlistNodeCoords[playlistId];
            return {
                size: 1,
                ...randomisePosition(initialPosition)
            }
        }
    ));

    const edges: SigmaEdge[] = Object.entries(tracks)
        .flatMap(([playlistId, trackList]) => trackList.map((track) => ({
            id: `${playlistId}:${track.track.id}`,
            source: track.track.id,
            target: playlistId,
            timeAdded: track.added_at,
            color: colorFromString(playlistId)
        })));

    return {
        nodes,
        edges
    };
};