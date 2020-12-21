import {SpotifyTracksMap} from "../reducers/spotifyTracksReducer";
import {getNodesFromPlaylists} from "./nodeGenerators";
import {getRandomPosition, NodePosition, randomisePosition} from "./positionUtil";
import PlaylistBaseObject = SpotifyApi.PlaylistBaseObject;
import ImageObject = SpotifyApi.ImageObject;
import PlaylistTrackObject = SpotifyApi.PlaylistTrackObject;
import {colorFromString, initialiseGraphColour} from "../util/color";

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
    const getColor = initialiseGraphColour();

    const playListNodes = getNodesFromPlaylists(
        playlists,
        (playlist) => {
            const position = getRandomPosition();
            playlistNodeCoords[playlist.id] = position;
            return {
                size: 50,
                color: getColor(playlist.id),
                type: 'square',
                image: getImageFromSpotifyArray(playlist.images),
                ...position
            }
        }
    );

    let edges: SigmaEdge[] = [];
    let uniqueNodeMap: { [id: string]: SigmaNode } = {};
    Object.entries(tracks)
        .forEach(([playlistId, trackList]) => trackList.forEach((track: PlaylistTrackObject) => {
            const playlistName = playlists.filter(p => p.id === playlistId)[0].name;
            const initialPosition = playlistNodeCoords[playlistId];
            const timeAdded = Date.parse(track.added_at);

            const node = {
                id: track.track.id,
                label: track.track.name,
                size: 10,
                // image: getImageFromSpotifyArray(track.track.album.images),
                type: 'square',
                color: colorFromString(track.track.album.id),
                timeAdded,
                ...randomisePosition(initialPosition)
            };

            // Verify uniqueness (as songs can be added to multiple playlists)
            if (uniqueNodeMap[node.id] === undefined) {
                uniqueNodeMap[node.id] = node;
            } else {
                // We want the timestamp where it was added first
                const currentTimeAdded = uniqueNodeMap[node.id].timeAdded || 0;
                if (currentTimeAdded > node.timeAdded) {
                    uniqueNodeMap[node.id] = node;
                }
            }

            const edge = {
                id: `${track.track.id}:${playlistId}`,
                source: track.track.id,
                target: playlistId,
                color: getColor(playlistId),
                desc: `Added ${track.track.name} to ${playlistName}`,
                timeAdded
            };

            edges.push(edge);
        }));

    let nodes: SigmaNode[] = [];
    nodes = nodes.concat(playListNodes);
    nodes = nodes.concat(Object.values(uniqueNodeMap));

    return {
        nodes,
        edges
    };
};