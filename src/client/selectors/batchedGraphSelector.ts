import {useSelector} from "react-redux";
import {State} from "../reducers/rootReducer";
import {TimeBatchedGraph} from "../graph/graphTimeBatcher";

export const selectCurrentGraph = (): TimeBatchedGraph[] | null =>
    useSelector((state: State) => state.batchedGraph?.graph || null);

export const selectCurrentBatchIndex = (): number | null =>
    useSelector((state: State) => state.batchedGraph?.currentBatchIndex || null);

export const selectCurrentBatch = (): TimeBatchedGraph | null =>
    useSelector((state: State) => {
        if (state.batchedGraph) {
            return state.batchedGraph.graph[
                state.batchedGraph.currentBatchIndex
            ];
        }
        return null;
    });