import {SpotifyTracksMap} from "../reducers/spotifyTracksReducer";
import PlaylistBaseObject = SpotifyApi.PlaylistBaseObject;
import React, {useEffect} from "react";
import BatchedNetwork from "./BatchedNetwork";
import BatchedGraphControl from "./BatchedGraphControl";
import {graphTimeBatcher} from "../graph/graphTimeBatcher";
import {tracksGraph} from "../graph/tracksGraph";
import {StatelessLoader} from "./StatelessLoader";
import {selectCurrentBatchIndex, selectCurrentGraph} from "../selectors/batchedGraphSelector";
import {useDispatch} from "react-redux";
import {setBatchNumber, setGraphAction} from "../actions/batchedGraphActions";

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

    // Load the graph on render
    useEffect(() => {
        const graph = graphTimeBatcher(
            tracksGraph(playlists, tracks),
            { timeUnit: 'month', removeEmpty: false }
        );

        setGraphAction(graph)(dispatch);
    }, []);

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
            <BatchedGraphControl
                batchedGraph={graph}
                currentBatch={currentBatchIndex}
                onClickSlice={(batch, batchIndex) => {
                    console.log(batch, batchIndex);
                    setBatchNumber(batchIndex)(dispatch);
                }}
            />
        </>
    );
};

export default PlaylistNetworkViewer;