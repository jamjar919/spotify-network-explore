import {Action, ActionName} from "../actions/action";
import {TimeBatchedGraph} from "../graph/graphTimeBatcher";

export type BatchTimeUnit = "day" | "week" | "month" | "year";
export type BatchedGraphState = {
    graph: TimeBatchedGraph[],
    currentBatchIndex: number,
    selectedNodes: string[],
    animate: boolean,
    batchUnit: BatchTimeUnit,
    playback: boolean
} | null;

export default (state: BatchedGraphState = null, action: Action<any>): BatchedGraphState => {
    switch (action.type) {
        case ActionName.SET_GRAPH: {
            return {
                graph: action.payload.graph as TimeBatchedGraph[],
                batchUnit: action.payload.batchUnit as BatchTimeUnit,
                currentBatchIndex: 0,
                selectedNodes: [],
                animate: state ? state.animate : false,
                playback: false
            };
        }
        case ActionName.SET_BATCH_NUMBER: {
            if (state && isBatchNumberValid(action.payload as number, state)) {
                return {
                    ...state,
                    currentBatchIndex: action.payload as number
                };
            }
            return state;
        }
        case ActionName.INCREMENT_BATCH_NUMBER: {
            if (state && isBatchNumberValid(state.currentBatchIndex + 1, state)) {
                return {
                    ...state,
                    currentBatchIndex: state.currentBatchIndex + 1
                }
            }
            return state;
        }
        case ActionName.DECREMENT_BATCH_NUMBER: {
            if (state && isBatchNumberValid(state.currentBatchIndex - 1, state)) {
                return {
                    ...state,
                    currentBatchIndex: state.currentBatchIndex - 1
                }
            }
            return state;
        }
        case ActionName.TOGGLE_GRAPH_PLAYBACK: {
            if (state) {
                return {
                    ...state,
                    playback: !state.playback
                }
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
        case ActionName.TOGGLE_GRAPH_ANIMATION: {
            if (state) {
                return {
                    ...state,
                    animate: !state.animate
                }
            }
            return state;
        }
        case ActionName.UPDATE_BATCH_UNIT: {
            if (state) {
                return {
                    ...state,
                    batchUnit: action.payload as BatchTimeUnit
                }
            }
            return state;
        }
    }
    return state;
};

const isBatchNumberValid = (batchNumber: number, state: BatchedGraphState): boolean => {
    if (!state) {
        return false;
    }
    return (batchNumber >= 0) && (batchNumber < state.graph.length)
};

const updateSelectedNodesList = (list: string[], newNode: string): string[] => {
    if (list.length === 0) {
        return [newNode];
    }

    // Deselect a node if it was already selected
    if (list.indexOf(newNode) > -1) {
        return Object.assign([], list.filter(id => id !== newNode));
    }

    list.push(newNode);
    return Object.assign([], list);
};