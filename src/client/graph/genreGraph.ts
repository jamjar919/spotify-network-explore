import {SpotifyTracksMap} from "../reducers/spotifyTracksReducer";
import PlaylistBaseObject = SpotifyApi.PlaylistBaseObject;
import {getGenresForTrack} from "../util/artistUtil";
import {UniqueGraphObjectUtil} from "../util/uniqueGraphObjectUtil";
import {getRandomPosition} from "./positionUtil";
import {colorFromString} from "../util/color";
import {getImageFromSpotifyArray} from "../util/spotifyImageUtil";

export const genreGraph = (
    playlists: PlaylistBaseObject[],
    tracks: SpotifyTracksMap
): SigmaGraph => {

    const uniqueNodes = new UniqueGraphObjectUtil<SigmaNode>();
    const uniqueEdges = new UniqueGraphObjectUtil<SigmaEdge>();

    Object.entries(tracks.tracksMap)
        .flatMap(([playlistId, playlist]) => playlist.map(track => ({
            playlist: playlists.filter(playlist => playlist.id === playlistId)[0],
            track,
            genres: getGenresForTrack(track, tracks.artistsMap)
        })))
        .forEach(({ playlist, track, genres }) => {
            if (!track.track.id) {
                return;
            }

            const timeAdded = Date.parse(track.added_at);

            uniqueNodes.addOrIncrementSize({
                id: playlist.id,
                label: `${playlist.name}`,
                color: "#FFFFFF",
                type: 'square',
                image: getImageFromSpotifyArray(playlist.images),
                timeAdded,
                ...getRandomPosition()
            });

            genres.forEach(genre => {
                uniqueNodes.addOrIncrementSize({
                    id: genre,
                    label: genre,
                    color: colorFromString(genre),
                    ...getRandomPosition(),
                    timeAdded
                });

                uniqueEdges.addOrIncrementSize({
                    id: `${playlist.id}:${genre}`,
                    source: playlist.id,
                    target: genre,
                    desc: `Added ${track.track.name} to ${genre}`,
                    timeAdded
                });
            });
        });

    const nodes = uniqueNodes.get();
    const edges = uniqueEdges.get();

    console.log(nodes, edges);

    return {
        nodes,
        edges
    }
};