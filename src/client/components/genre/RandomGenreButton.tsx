import React, {FunctionComponent} from "react";
import {getRandomInt} from "../../graph/positionUtil";
import {selectNodeAction} from "../../actions/batchedGraphActions";
import {useDispatch} from "react-redux";
import {selectGraph} from "../../selectors/batchedGraphSelector";
import Shuffle from "../../svg/shuffle.svg";

export const RandomGenreButton: FunctionComponent<{}> = () => {
    const dispatch = useDispatch();
    const graph: SigmaGraph | null = selectGraph();

    const handleClickRandomGenre = () => {
        if (graph !== null) {
            const allNodesIds = graph.nodes.map(node => node.id);

            const nodeId = allNodesIds[getRandomInt(allNodesIds.length)];
            selectNodeAction(nodeId)(dispatch);
        }
    };

    return (
        <button className="randomGenreButton" onClick={handleClickRandomGenre}>
            <Shuffle />
        </button>
    );
};
