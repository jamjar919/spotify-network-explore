import React, {useEffect, useState} from "react";
import PlaylistBaseObject = SpotifyApi.PlaylistBaseObject;
import {SpotifyTracksMap} from "../reducers/spotifyTracksReducer";
import {Sigma, ForceAtlas2, NodeShapes} from 'react-sigma';
import {tracksGraph} from "../graph/tracksGraph";
import GraphLoader from "./GraphLoader";

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
        setGraph(
            tracksGraph(playlists, tracks)
        );
    }, []);

    console.log(graph);

    if (graph === null) {
        return <>loading graph</>;
    }

    return (
        <Sigma
            renderer="canvas"
            settings={{
                clone: false,
            }}
            style={{
                height: "100vh"
            }}
            onSigmaException={(e: any) => console.error(e)}
        >
            <NodeShapes />
            <GraphLoader graph={graph}>
                {animate && <ForceAtlas2
                    linLogMode
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