import React, {useEffect, useState} from "react";
import PlaylistBaseObject = SpotifyApi.PlaylistBaseObject;
import {SpotifyTracksMap} from "../reducers/spotifyTracksReducer";
import {Sigma, ForceAtlas2, NodeShapes} from 'react-sigma';
import {tracksGraph} from "../graph/tracksGraph";
import GraphLoader from "./GraphLoader";
import {graphTimeBatcher} from "../graph/graphTimeBatcher";
import {StatelessLoader} from "./StatelessLoader";

type PlaylistNetworkPropTypes = {
    playlists: PlaylistBaseObject[],
    tracks: SpotifyTracksMap,
    animate?: boolean
};

const PlaylistNetwork = ({
     playlists,
     tracks,
     animate = true
}: PlaylistNetworkPropTypes) => {
    const [graph, setGraph] = useState<SigmaGraph | null>(null);
    useEffect(() => {
        const batched = graphTimeBatcher(
            tracksGraph(playlists, tracks)
        );
        setGraph(batched[0].graph);
    }, []);

    if (graph === null) {
        return <StatelessLoader />;
    }

    return (
        <Sigma
            renderer="canvas"
            settings={{
                clone: false,
                batchEdgesDrawing: true
            }}
            style={{
                height: "100vh"
            }}
            onSigmaException={(e: any) => console.error(e)}
        >
            <NodeShapes />
            <GraphLoader graph={graph}>
                {animate && <ForceAtlas2
                    slowDown={5}
                    iterationsPerRender={1}
                    barnesHutOptimize
                    barnesHutTheta={1}
                    timeout={50000}
                    worker
                />}
            </GraphLoader>
        </Sigma>
    );
};

export default PlaylistNetwork;