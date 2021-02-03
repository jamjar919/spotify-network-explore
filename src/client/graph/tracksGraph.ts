import {SpotifyTracksMap} from "../reducers/spotifyTracksReducer";
import {getNodesFromPlaylists} from "./nodeGenerators";
import {getRandomPosition, NodePosition, randomisePosition} from "./positionUtil";
import PlaylistBaseObject = SpotifyApi.PlaylistBaseObject;
import PlaylistTrackObject = SpotifyApi.PlaylistTrackObject;
import {colorFromString, initialiseGraphColour} from "../util/color";
import {UniqueGraphObjectUtil} from "../util/uniqueGraphObjectUtil";
import {getImageFromSpotifyArray} from "../util/spotifyImageUtil";

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
                type: 'square',
                image: getImageFromSpotifyArray(playlist.images),
                ...position
            }
        }
    );

    let uniqueNodes = new UniqueGraphObjectUtil<SigmaNode>();
    let uniqueEdges = new UniqueGraphObjectUtil<SigmaEdge>();
    Object.entries(tracks.tracksMap)
        .forEach(([playlistId, trackList]) => trackList.forEach((track: PlaylistTrackObject) => {
            const playlistName = playlists.filter(p => p.id === playlistId)[0].name;
            const initialPosition = playlistNodeCoords[playlistId];
            const timeAdded = Date.parse(track.added_at);

            // Track must have an id (local tracks do not)
            if (!track.track.id) {
                return;
            }

            const genre: string = track.track.artists
                .map(artist => artist.id)
                .flatMap(id => tracks.artistsMap[id])
                .flatMap(artist => artist && artist.genres)[0] || "no genre";

            uniqueNodes.add({
                id: track.track.id,
                label: `${track.track.name} (${genre})`,
                size: 10,
                type: 'square',
                color: colorFromString(genre),
                timeAdded,
                ...randomisePosition(initialPosition)
            });


            uniqueEdges.add({
                id: `${track.track.id}:${playlistId}`,
                source: track.track.id,
                target: playlistId,
                color: getColor(playlistId),
                desc: `Added ${track.track.name} to ${playlistName}`,
                timeAdded
            });
        }));

    let nodes: SigmaNode[] = [];
    nodes = nodes.concat(playListNodes);
    nodes = nodes.concat(uniqueNodes.get());

    const edges: SigmaEdge[] = uniqueEdges.get();

    return {
        nodes,
        edges
    };
};