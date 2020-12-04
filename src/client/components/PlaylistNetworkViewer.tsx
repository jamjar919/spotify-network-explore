import {SpotifyTracksMap} from "../reducers/spotifyTracksReducer";
import PlaylistBaseObject = SpotifyApi.PlaylistBaseObject;
import React, {useEffect} from "react";
import BatchedNetwork from "./batchedgraph/BatchedNetwork";
import BatchedGraphControl from "./batchedgraph/control/BatchedGraphControl";
import {graphTimeBatcher} from "../graph/graphTimeBatcher";
import {tracksGraph} from "../graph/tracksGraph";
import {StatelessLoader} from "./StatelessLoader";
import {selectCurrentBatchIndex, selectCurrentGraph, selectCurrentTimeUnit} from "../selectors/batchedGraphSelector";
import {useDispatch} from "react-redux";
import {setGraphAction} from "../actions/batchedGraphActions";
import BatchedGraphSettings from "./batchedgraph/settings/BatchedGraphSettings";

type PlaylistNetworkViewerPropTypes = {
    playlists: PlaylistBaseObject[],
    tracks: SpotifyTracksMap,
};

const PlaylistNetworkViewer = ({
    playlists,
    tracks,
 }: PlaylistNetworkViewerPropTypes) => {
    const dispatch = useDispatch();
    const graph = selectCurrentGraph();
    const currentBatchIndex = selectCurrentBatchIndex();
    const timeUnit = selectCurrentTimeUnit();

    // Load the graph on render
    useEffect(() => {
        const graph = graphTimeBatcher(
            tracksGraph(playlists, tracks),
            { timeUnit, removeEmpty: false }
        );

        setGraphAction(graph, timeUnit)(dispatch);
    }, [timeUnit]);

    if (
        graph === null ||
        currentBatchIndex === null
    ) {
        return <StatelessLoader />;
    }

    return (
        <>
            <BatchedNetwork
                batchedGraph={graph}
                currentBatch={currentBatchIndex}
            />
            <BatchedGraphControl />
            <BatchedGraphSettings />
        </>
    );
};

export default PlaylistNetworkViewer;