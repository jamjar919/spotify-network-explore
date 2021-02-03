import {SpotifyArtistMap} from "../reducers/spotifyTracksReducer";
import PlaylistBaseObject = SpotifyApi.PlaylistBaseObject;
import {getGenresForTrack} from "../util/artistUtil";
import {UniqueGraphObjectUtil} from "../util/uniqueGraphObjectUtil";
import {getRandomPosition} from "./positionUtil";
import {colorFromString} from "../util/color";
import {getImageFromSpotifyArray} from "../util/spotifyImageUtil";
import PlaylistTrackObject = SpotifyApi.PlaylistTrackObject;

export const playlistGenreGraph = (
    playlists: PlaylistBaseObject[],
    tracksMap: {[playlistId: string]: PlaylistTrackObject[]},
    artistsMap: SpotifyArtistMap
): SigmaGraph => {

    const uniqueNodes = new UniqueGraphObjectUtil<SigmaNode>();
    const uniqueEdges = new UniqueGraphObjectUtil<SigmaEdge>();

    Object.entries(tracksMap)
        .flatMap(([playlistId, playlist]) => playlist.map(track => ({
            playlist: playlists.filter(playlist => playlist.id === playlistId)[0],
            track,
            genres: getGenresForTrack(track, artistsMap)
        })))
        .forEach(({ playlist, track, genres }) => {
            if (!track.track.id) {
                return;
            }

            const timeAdded = Date.parse(track.added_at);

            uniqueNodes.add({
                id: playlist.id,
                label: `${playlist.name}`,
                color: "#FFFFFF",
                size: 10,
                type: 'square',
                image: getImageFromSpotifyArray(playlist.images),
                timeAdded,
                ...getRandomPosition()
            });

            genres.forEach(genre => {
                uniqueNodes.add({
                    id: genre,
                    label: genre,
                    size: 5,
                    color: colorFromString(genre),
                    ...getRandomPosition(),
                    timeAdded
                });

                uniqueEdges.add({
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

    return {
        nodes,
        edges
    }
};