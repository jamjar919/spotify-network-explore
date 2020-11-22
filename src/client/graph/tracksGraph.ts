import {SpotifyTracksMap} from "../reducers/spotifyTracksReducer";
import PlaylistBaseObject = SpotifyApi.PlaylistBaseObject;
import {getNodesFromPlaylists, getNodesFromTracks} from "./nodeGenerators";
import {colorFromString} from "../util/color";
import {getRandomPosition, NodePosition, randomisePosition} from "./positionUtil";
import ImageObject = SpotifyApi.ImageObject;
import PlaylistTrackObject = SpotifyApi.PlaylistTrackObject;

const getImageFromSpotifyArray = (images: ImageObject[]) => {
    if (images[0]) {
        const biggestImage = images[0];
        return {
            size: 20,
            url: biggestImage.url,
            scale: 2,
            clip: 2,
            w: biggestImage.width,
            h: biggestImage.height
        };
    }
    return undefined;
};

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
                size: 50,
                color: colorFromString(playlist.id),
                type: 'square',
                image: getImageFromSpotifyArray(playlist.images),
                ...position
            }
        }
    ));

    nodes = nodes.concat(getNodesFromTracks(
        tracks,
        (track, playlistId) => {
            const initialPosition = playlistNodeCoords[playlistId];
            return {
                size: 1,
                image: getImageFromSpotifyArray(track.track.album.images),
                timeAdded: Date.parse(track.added_at),
                ...randomisePosition(initialPosition)
            }
        }
    ));

    const edges: SigmaEdge[] = Object.entries(tracks)
        .flatMap(([playlistId, trackList]) => trackList.map((track: PlaylistTrackObject) => ({
            id: `${playlistId}:${track.track.id}`,
            source: track.track.id,
            target: playlistId,
            timeAdded: Date.parse(track.added_at),
            color: colorFromString(playlistId),
            desc: `Added ${track.track.name}`
        })));

    return {
        nodes,
        edges
    };
};