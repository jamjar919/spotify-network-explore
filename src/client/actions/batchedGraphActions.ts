import {Action, ActionName} from "./action";
import {TimeBatchedGraph} from "../graph/graphTimeBatcher";
import {BatchTimeUnit} from "../reducers/batchedGraphReducer";

export type SetGraphPayload = { graph: TimeBatchedGraph[], batchUnit: BatchTimeUnit };
export const setGraphAction = (graph: TimeBatchedGraph[], batchUnit: BatchTimeUnit) => {
    return (dispatch: (action: Action<SetGraphPayload>) => void) => dispatch({
        type: ActionName.SET_GRAPH,
        payload: { graph, batchUnit }
    })
};

export const setBatchNumberAction = (batchIndex: number) => {
    return (dispatch: (action: Action<number>) => void) => dispatch({
        type: ActionName.SET_BATCH_NUMBER,
        payload: batchIndex
    })
};

export const incrementBatchNumberAction = () => {
    return (dispatch: (action: Action<void>) => void) => dispatch({
        type: ActionName.INCREMENT_BATCH_NUMBER
    })
};

export const decrementBatchNumberAction = () => {
    return (dispatch: (action: Action<void>) => void) => dispatch({
        type: ActionName.DECREMENT_BATCH_NUMBER
    })
};

export const toggleGraphPlaybackAction = () => {
    return (dispatch: (action: Action<void>) => void) => dispatch({
        type: ActionName.TOGGLE_GRAPH_PLAYBACK
    });
};

export const selectNodeAction = (nodeId: string) => {
    return (dispatch: (action: Action<string>) => void) => dispatch({
        type: ActionName.SELECT_NODE,
        payload: nodeId
    })
};

export const toggleGraphAnimationAction = () => {
    return (dispatch: (action: Action<void>) => void) => dispatch({
        type: ActionName.TOGGLE_GRAPH_ANIMATION
    });
};

export const setGraphBatchUnitAction = (unit: BatchTimeUnit) => {
    return (dispatch: (action: Action<BatchTimeUnit>) => void) => dispatch({
        type: ActionName.UPDATE_BATCH_UNIT,
        payload: unit
    });
};