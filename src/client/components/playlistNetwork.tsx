import React from "react";
import PlaylistBaseObject = SpotifyApi.PlaylistBaseObject;
import {SpotifyTracksMap} from "../reducers/spotifyTracksReducer";
import {Sigma, RandomizeNodePositions, ForceAtlas2} from 'react-sigma';
import {tracksGraph} from "../util/tracksGraph";

type PlaylistNetworkPropTypes = {
    playlists: PlaylistBaseObject[],
    tracks: SpotifyTracksMap
};

const PlaylistNetwork = ({ playlists, tracks }: PlaylistNetworkPropTypes) => {
    const myGraph = tracksGraph(playlists, tracks);
    console.log(myGraph);
    return (
        <Sigma graph={myGraph} settings={{drawEdges: true}}>
            <RandomizeNodePositions/>
            <ForceAtlas2 linLogMode barnesHutOptimize edgeWeightInfluence={1} gravity={0}/>
        </Sigma>
    );
};

export default PlaylistNetwork;