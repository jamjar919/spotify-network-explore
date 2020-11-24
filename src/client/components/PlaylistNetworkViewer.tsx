import {SpotifyTracksMap} from "../reducers/spotifyTracksReducer";
import PlaylistBaseObject = SpotifyApi.PlaylistBaseObject;
import React, {useEffect, useState} from "react";
import BatchedNetwork from "./BatchedNetwork";
import BatchedGraphControl from "./BatchedGraphControl";
import {graphTimeBatcher, TimeBatchedGraph} from "../graph/graphTimeBatcher";
import {tracksGraph} from "../graph/tracksGraph";
import {StatelessLoader} from "./StatelessLoader";

type PlaylistNetworkViewerPropTypes = {
    playlists: PlaylistBaseObject[],
    tracks: SpotifyTracksMap,
};

const PlaylistNetworkViewer = ({
    playlists,
    tracks,
 }: PlaylistNetworkViewerPropTypes) => {
    const [graph, setGraph] = useState<TimeBatchedGraph[] | null>(null);
    const [currentBatch, setCurrentBatch] = useState<number>(0);

    // Load the graph on render
    useEffect(() => {
        const batched = graphTimeBatcher(
            tracksGraph(playlists, tracks),
            { timeUnit: 'month', removeEmpty: false }
        );
        setGraph(batched);
    }, []);

    if (graph === null) {
        return <StatelessLoader />;
    }

    return (
        <>
            <BatchedNetwork
                batchedGraph={graph}
                currentBatch={currentBatch}
            />
            <BatchedGraphControl
                batchedGraph={graph}
                currentBatch={currentBatch}
                onClickSlice={(batch, batchIndex) => {
                    console.log(batch, batchIndex);
                    setCurrentBatch(batchIndex);
                }}
                onHoverSlice={(batch, batchIndex) => {
                    console.log(batch, batchIndex)
                }}
            />
        </>
    );
};

export default PlaylistNetworkViewer;