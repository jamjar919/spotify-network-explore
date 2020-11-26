import {Action, ActionName} from "./action";
import {TimeBatchedGraph} from "../graph/graphTimeBatcher";

export const setGraphAction = (graph: TimeBatchedGraph[]) => {
    return (dispatch: (action: Action<TimeBatchedGraph[]>) => void) => dispatch({
        type: ActionName.SET_GRAPH,
        payload: graph
    })
};

export const setBatchNumber = (batchIndex: number) => {
    return (dispatch: (action: Action<number>) => void) => dispatch({
        type: ActionName.SET_BATCH_NUMBER,
        payload: batchIndex
    })
};