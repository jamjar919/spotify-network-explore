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

    const playListNodes = getNodesFromPlaylists(
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
    );


    Object.entries(tracks)
        .forEach(([playlistId, trackList]) => trackList.forEach((track: PlaylistTrackObject) => {
            const playlistName = playlists.filter(p => p.id === playlistId)[0].name;
            const initialPosition = playlistNodeCoords[playlistId];
            const timeAdded = Date.parse(track.added_at);

            const node = {
                image: getImageFromSpotifyArray(track.track.album.images),
                timeAdded,
                ...randomisePosition(initialPosition)
            };

            const edge = {
                id: `${playlistId}:${track.track.id}`,
                source: track.track.id,
                target: playlistId,
                color: colorFromString(playlistId),
                desc: `Added ${track.track.name} to ${playlistName}`,
                timeAdded
            };

        }));

    let nodes: SigmaNode[] = [];
    nodes = nodes.concat(playListNodes);

    let edges: SigmaEdge[] = [];

    return {
        nodes,
        edges
    };
};