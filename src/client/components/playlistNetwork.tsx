import React from "react";
import PlaylistBaseObject = SpotifyApi.PlaylistBaseObject;
import {SpotifyTracksMap} from "../reducers/spotifyTracksReducer";
import {Sigma, ForceAtlas2} from 'react-sigma';
import {tracksGraph} from "../util/tracksGraph";

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
    const myGraph = tracksGraph(playlists, tracks);
    console.log(myGraph);
    return (
        <Sigma
            graph={myGraph}
            renderer="webgl"
            settings={{
                clone: false,
                batchEdgesDrawing: true,
            }}
            style={{
                height: "100vh"
            }}
        >
            {animate && <ForceAtlas2
                iterationsPerRender={1}
                barnesHutOptimize
                barnesHutTheta={1}
                timeout={50000}
                worker
            />}
        </Sigma>
    );
};

export default PlaylistNetwork;