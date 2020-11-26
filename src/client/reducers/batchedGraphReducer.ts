import {Action, ActionName} from "../actions/action";
import {TimeBatchedGraph} from "../graph/graphTimeBatcher";

export type BatchedGraphState = {
    graph: TimeBatchedGraph[],
    currentBatchIndex: number
} | null;

export default (state: BatchedGraphState = null, action: Action<TimeBatchedGraph[] | number>): BatchedGraphState => {
    switch (action.type) {
        case ActionName.SET_GRAPH: {
            return {
                graph: action.payload as TimeBatchedGraph[],
                currentBatchIndex: 0
            };
        }
        case ActionName.SET_BATCH_NUMBER: {
            if (state) {
                return {
                    graph: Object.assign({}, state.graph),
                    currentBatchIndex: action.payload as number
                };
            }
        }
    }
    return state;
};