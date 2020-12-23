import {useSelector} from "react-redux";
import {State} from "../reducers/rootReducer";
import {TimeBatchedGraph} from "../graph/graphTimeBatcher";
import {BatchTimeUnit} from "../reducers/batchedGraphReducer";

export const selectCurrentGraph = (): TimeBatchedGraph[] | null => useSelector((state: State) =>
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

export const selectSelectedNodes = (): string[] => useSelector((state: State) =>
    state.batchedGraph?.selectedNodes || []
);