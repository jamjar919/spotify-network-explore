import React from "react";
import PlaylistBaseObject = SpotifyApi.PlaylistBaseObject;
import {SpotifyTracksMap} from "../reducers/spotifyTracksReducer";
import {Sigma, RandomizeNodePositions, RelativeSize} from 'react-sigma';
import {playlistDiff} from "../util/playlistDiff";

type PlaylistNetworkPropTypes = {
    playlists: PlaylistBaseObject[],
    tracks: SpotifyTracksMap
};

const PlaylistNetwork = ({ playlists, tracks }: PlaylistNetworkPropTypes) => {
    const nodes = playlists.map(playlist => ({
        id: playlist.id,
        label: playlist.name
    }));

    const edges: any[] = [];
    playlists.forEach((playlistOne) => {
        const playlistOneId = playlistOne.id;
        playlists.forEach((playlistTwo) => {
            const playlistTwoId = playlistTwo.id;

            if (playlistOneId === playlistTwoId) {
                return;
            }

            const diff = playlistDiff(tracks[playlistOneId], tracks[playlistTwoId]);
            if (diff.common.length > 0) {
                edges.push({
                    id: `${playlistOneId}:${playlistTwoId}`,
                    source: playlistOneId,
                    target: playlistTwoId
                })
            }
        });
    });

    console.log(nodes, edges);

    const myGraph = { nodes, edges };
    return (
        <Sigma graph={myGraph} settings={{drawEdges: true, clone: false}}>
            <RelativeSize initialSize={15}/>
            <RandomizeNodePositions/>
        </Sigma>
    );
};

export default PlaylistNetwork;