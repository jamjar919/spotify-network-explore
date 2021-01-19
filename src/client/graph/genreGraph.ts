import {SpotifyTracksMap} from "../reducers/spotifyTracksReducer";
import PlaylistBaseObject = SpotifyApi.PlaylistBaseObject;
import {getGenresForTrack} from "../util/artistUtil";
import {UniqueGraphObjectUtil} from "../util/uniqueGraphObjectUtil";
import {getRandomPosition} from "./positionUtil";
import {colorFromString} from "../util/color";

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
                uniqueNodes.addOrIncrementSizeLog({
                    id: genre,
                    label: genre,
                    size: 5,
                    color: colorFromString(genre),
                    ...getRandomPosition(),
                    timeAdded
                });
            });

            genres.forEach(genreOne => {
                genres.forEach(genreTwo => {
                    uniqueEdges.addOrIncrementSize({
                        id: `${genreOne}:${genreTwo}`,
                        source: genreOne,
                        target: genreTwo,
                        timeAdded
                    });

                });
            });
        });

    const nodes = uniqueNodes.get();
    const edges = uniqueEdges.get();

    console.log({
        nodes, edges
    });

    return {
        nodes,
        edges
    }
};