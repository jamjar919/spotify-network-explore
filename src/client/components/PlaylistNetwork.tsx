import React, {useEffect, useState} from "react";
import PlaylistBaseObject = SpotifyApi.PlaylistBaseObject;
import {SpotifyTracksMap} from "../reducers/spotifyTracksReducer";
import {Sigma} from 'react-sigma';
import {tracksGraph} from "../graph/tracksGraph";
import {graphTimeBatcher, TimeBatchedGraph} from "../graph/graphTimeBatcher";
import {StatelessLoader} from "./StatelessLoader";
import BatchedGraphLoader from "./BatchedGraphLoader";
import CustomForceAtlas2 from "./CustomForceAtlas2";

type PlaylistNetworkPropTypes = {
    playlists: PlaylistBaseObject[],
    tracks: SpotifyTracksMap,
    animate?: boolean
};

const PlaylistNetwork = ({
    playlists,
    tracks,
}: PlaylistNetworkPropTypes) => {
    const [graph, setGraph] = useState<TimeBatchedGraph[] | null>(null);
    const [batch, setBatch] = useState<number>(0);

    useEffect(() => {
        const batched = graphTimeBatcher(
            tracksGraph(playlists, tracks),
            { removeEmpty: true }
        );
        setGraph(batched);
    }, []);

    if (graph === null) {
        return <StatelessLoader />;
    }

    setTimeout(() => {
        setBatch(batch + 1);
    }, 500);

    return (
        <Sigma
            renderer="canvas"
            settings={{
                clone: true
            }}
            style={{
                height: "100vh"
            }}
            onSigmaException={(e: any) => console.error(e)}
        >
               <CustomForceAtlas2
                    slowDown={2}
                    iterationsPerRender={1}
                    barnesHutOptimize
                    barnesHutTheta={1}
                    timeout={50000}
                    linLogMode={true}
                    worker
                >
                   <BatchedGraphLoader batchedGraph={graph} batchToLoad={batch} />
               </CustomForceAtlas2>
        </Sigma>
    );
};

export default PlaylistNetwork;