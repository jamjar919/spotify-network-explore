import {Action, ActionName} from "../actions/action";
import {TimeBatchedGraph} from "../graph/graphTimeBatcher";

export type BatchTimeUnit = "day" | "week" | "month" | "year";
export type BatchedGraphState = {
    graph: TimeBatchedGraph[],
    rawGraph: SigmaGraph,
    currentBatchIndex: number,
    selectedNode: string | null,
    animate: boolean,
    batchUnit: BatchTimeUnit,
    playback: boolean,
    playbackTimeStep: number
} | null;

export default (state: BatchedGraphState = null, action: Action<any>): BatchedGraphState => {
    switch (action.type) {
        case ActionName.SET_GRAPH: {
            return {
                graph: action.payload.batchedGraph as TimeBatchedGraph[],
                rawGraph: action.payload.graph as SigmaGraph,
                batchUnit: action.payload.batchUnit as BatchTimeUnit,
                currentBatchIndex: 0,
                selectedNode: null,
                animate: state ? state.animate : false,
                playback: false,
                playbackTimeStep: 100
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
                    playback: state.playback && isBatchNumberValid(state.currentBatchIndex + 2, state),
                    currentBatchIndex: state.currentBatchIndex + 1
                }
            }
            return state;
        }
        case ActionName.DECREMENT_BATCH_NUMBER: {
            if (state && isBatchNumberValid(state.currentBatchIndex - 1, state)) {
                return {
                    ...state,
                    playback: state.playback && isBatchNumberValid(state.currentBatchIndex - 2, state),
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
        case ActionName.SET_PLAYBACK_TIMESTEP: {
            if (state) {
                return {
                    ...state,
                    playbackTimeStep: action.payload as number
                }
            }
            return state;
        }
        case ActionName.SELECT_NODE: {
            if (state) {
                return {
                    ...state,
                    selectedNode: updateSelectedNode(state.selectedNode, action.payload as string)
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

const updateSelectedNode = (current: string | null, newNode: string): string | null => {
    if (current === newNode) {
        return null;
    }

    return newNode;
};