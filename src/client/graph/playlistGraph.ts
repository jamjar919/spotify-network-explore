import {playlistDiff} from "../util/playlistDiff";
import {SpotifyTracksMap} from "../reducers/spotifyTracksReducer";
import PlaylistBaseObject = SpotifyApi.PlaylistBaseObject;
import {getNodesFromPlaylists} from "./nodeGenerators";

export const playlistGraph = (
    playlists: PlaylistBaseObject[],
    tracks: SpotifyTracksMap
): SigmaGraph => {
    const nodes = getNodesFromPlaylists(
        playlists,
        (playlist) => ({
            size: tracks[playlist.id].length
        })
    );

    const edges: any[] = [];
    playlists.forEach((playlistOne) => {
        const playlistOneId = playlistOne.id;
        playlists.forEach((playlistTwo) => {
            const playlistTwoId = playlistTwo.id;

            if (playlistOneId === playlistTwoId) {
                return;
            }

            const diff = playlistDiff(tracks[playlistOneId], tracks[playlistTwoId]);
            if (diff.common.length > 0) {
                edges.push({
                    id: `${playlistOneId}:${playlistTwoId}`,
                    source: playlistOneId,
                    target: playlistTwoId
                })
            }
        });
    });

    return {
        nodes,
        edges
    };
};