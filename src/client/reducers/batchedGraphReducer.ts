import {Action, ActionName} from "../actions/action";
import {TimeBatchedGraph} from "../graph/graphTimeBatcher";

export type BatchedGraphState = {
    graph: TimeBatchedGraph[],
    currentBatchIndex: number,
    selectedNodes: string[]
} | null;

export default (state: BatchedGraphState = null, action: Action<TimeBatchedGraph[] | string | number>): BatchedGraphState => {
    switch (action.type) {
        case ActionName.SET_GRAPH: {
            return {
                graph: action.payload as TimeBatchedGraph[],
                currentBatchIndex: 0,
                selectedNodes: []
            };
        }
        case ActionName.SET_BATCH_NUMBER: {
            if (state) {
                return {
                    ...state,
                    currentBatchIndex: action.payload as number
                };
            }
            return state;
        }
        case ActionName.SELECT_NODE: {
            if (state) {
                return {
                    ...state,
                    selectedNodes: updateSelectedNodesList(state.selectedNodes, action.payload as string)
                }
            }
            return state;
        }
    }
    return state;
};

const updateSelectedNodesList = (list: string[], newNode: string): string[] => {
    if (list.length === 0) {
        return [newNode];
    }

    // Deselect a node if it was last selected
    if (list[0] === newNode) {
        list.pop();
    } else {
        list.push(newNode);
    }

    return Object.assign([], list);
};