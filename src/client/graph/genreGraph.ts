import {SpotifyTracksMap} from "../reducers/spotifyTracksReducer";
import PlaylistBaseObject = SpotifyApi.PlaylistBaseObject;
import {getGenresForTrack} from "../util/artistUtil";
import {UniqueGraphObjectUtil} from "../util/uniqueGraphObjectUtil";
import {colorFromString} from "../util/color";
import {RANDOMISE_SCALE} from "./positionUtil";

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
        .forEach(({ track, genres }) => {
            if (!track.track.id) {
                return;
            }

            const timeAdded = Date.parse(track.added_at);

            genres.forEach(genre => {
                uniqueNodes.addOrApplyFunction({
                    id: genre,
                    label: genre,
                    color: colorFromString(genre),
                    count: 1,
                    size: Math.log(2),
                    x: track.audioFeatures.danceability * RANDOMISE_SCALE,
                    y: track.audioFeatures.valence * RANDOMISE_SCALE,
                    timeAdded
                }, (node) => {
                    const count = node.count + 1;
                    return {
                        x: (((node.x || 0) * node.count) + (track.audioFeatures.danceability * RANDOMISE_SCALE)) / count,
                        y: (((node.y || 0) * node.count) + (track.audioFeatures.valence * RANDOMISE_SCALE)) / count,
                        size: Math.log(count),
                        count
                    };
                });
            });

            genres.forEach(genreOne => {
                genres.forEach(genreTwo => {
                    uniqueEdges.addOrApplyFunction({
                        id: `${genreOne}:${genreTwo}`,
                        source: genreOne,
                        target: genreTwo,
                        timeAdded
                    }, (edge) => {
                        const size = (edge.size || 0) + 1;
                        return { size };
                    });

                });
            });
        });

    const nodes = uniqueNodes.get();
    const edges = uniqueEdges.get();

    return {
        nodes,
        edges
    }
};