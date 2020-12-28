import {SpotifyTracksMap} from "../reducers/spotifyTracksReducer";
import PlaylistBaseObject = SpotifyApi.PlaylistBaseObject;
import {getGenresForTrack} from "../util/artistUtil";
import {UniqueGraphObjectUtil} from "../util/uniqueGraphObjectUtil";

export const genreGraph = (
    _playlists: PlaylistBaseObject[],
    tracks: SpotifyTracksMap
): SigmaGraph => {

    const uniqueNodes = new UniqueGraphObjectUtil<SigmaNode>();
    Object.values(tracks.tracksMap)
        .flatMap(tracks => tracks)
        .map(track => ({
            track,
            genres: getGenresForTrack(track, tracks.artistsMap)
        }))
        .map(({ track, genres }) => {
            genres.forEach(genre => uniqueNodes.add({
                id: genre,
                label: genre,
                timeAdded: Date.parse(track.added_at)
            }))
        });

    const nodes = uniqueNodes.get();
    const edges: SigmaEdge[] = [];

    console.log(nodes);

    return {
        nodes,
        edges
    }
};