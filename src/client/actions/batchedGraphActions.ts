import {Action, ActionName} from "./action";
import {TimeBatchedGraph} from "../graph/graphTimeBatcher";
import {BatchTimeUnit} from "../reducers/batchedGraphReducer";

export const setGraphAction = (graph: TimeBatchedGraph[]) => {
    return (dispatch: (action: Action<TimeBatchedGraph[]>) => void) => dispatch({
        type: ActionName.SET_GRAPH,
        payload: graph
    })
};

export const setBatchNumberAction = (batchIndex: number) => {
    return (dispatch: (action: Action<number>) => void) => dispatch({
        type: ActionName.SET_BATCH_NUMBER,
        payload: batchIndex
    })
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

export const updateBatchUnitAction = (unit: BatchTimeUnit) => {
    return (dispatch: (action: Action<BatchTimeUnit>) => void) => dispatch({
        type: ActionName.UPDATE_BATCH_UNIT,
        payload: unit
    });
};