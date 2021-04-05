import {useSelector} from "react-redux";
import {State} from "../reducers/rootReducer";
import {TimeBatchedGraph} from "../graph/graphTimeBatcher";
import {BatchTimeUnit} from "../reducers/batchedGraphReducer";
import {isSuccessfulFetch} from "../reducers/ajaxState";
import {getTracksAndPlaylistFromGenre} from "../util/artistUtil";
import PlaylistTrackObject = SpotifyApi.PlaylistTrackObject;
import {SpotifyTracksMap} from "../reducers/spotifyTracksReducer";
import PlaylistBaseObject = SpotifyApi.PlaylistBaseObject;
import {useMemo} from "react";

export const selectGraph = (): SigmaGraph | null => useSelector((state: State) =>
    state.batchedGraph?.rawGraph || null
);

export const selectBatchedGraph = (): TimeBatchedGraph[] | null => useSelector((state: State) =>
    state.batchedGraph?.graph || null
);

export const selectCurrentBatchIndex = (): number | null => useSelector((state: State) => {
        if (state.batchedGraph && state.batchedGraph.currentBatchIndex > -1) {
            return state.batchedGraph.currentBatchIndex;
        }
        return null;
    });

export const selectCurrentBatch = (): TimeBatchedGraph | null =>
    useSelector((state: State) => {
        if (state.batchedGraph) {
            return state.batchedGraph.graph[
                state.batchedGraph.currentBatchIndex
            ];
        }
        return null;
    });

export const selectShouldAnimateGraph = (): boolean => useSelector((state: State) =>
    state.batchedGraph?.animate || false
);

export const selectCurrentTimeUnit = (): BatchTimeUnit => useSelector((state: State) =>
    state.batchedGraph?.batchUnit || "week"
);

export const selectPlaybackTimeStep = (): number => useSelector((state: State) =>
    state.batchedGraph?.playbackTimeStep || 100
);

export const selectIsPlaying = (): boolean => useSelector((state: State) =>
    state.batchedGraph?.playback || false
);

export const selectSelectedGenre = (): string | null => useSelector((state: State) =>
    state.batchedGraph?.selectedNode || null
);

export const selectSelectedNodeInformation = (
    genre: string | null
): {
    playlist: PlaylistBaseObject,
    tracks: PlaylistTrackObject[]
}[] | null => {
    const [spotifyTracks, spotifyPlaylists] = useSelector((state: State) => {
        if (
            genre !== null &&
            state.batchedGraph &&
            state.batchedGraph.selectedNode &&
            state.batchedGraph.selectedNode.length > 0 &&
            isSuccessfulFetch(state.spotifyTracks)
        ) {
            return [
                state.spotifyTracks as SpotifyTracksMap,
                state.spotifyPlaylists as PlaylistBaseObject[]
            ];
        }
        return [null, null];
    });

    return useMemo(() => {
        if (genre === null || spotifyTracks === null || spotifyPlaylists === null) {
            return null;
        }

        return getTracksAndPlaylistFromGenre(
            genre as string,
            spotifyTracks as SpotifyTracksMap,
            spotifyPlaylists as PlaylistBaseObject[]
        );
    }, [genre, spotifyTracks, spotifyPlaylists])
};
