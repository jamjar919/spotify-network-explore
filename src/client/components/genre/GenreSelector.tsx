import React, {FunctionComponent} from "react";
import {selectSelectedGenre, selectSelectedNodeInformation} from "../../selectors/batchedGraphSelector";
import PlaylistBaseObject = SpotifyApi.PlaylistBaseObject;
import {SpotifyArtistMap, SpotifyTracksMap} from "../../reducers/spotifyTracksReducer";
import PlaylistTrackObject = SpotifyApi.PlaylistTrackObject;
import {AjaxState, isSuccessfulFetch} from "../../reducers/ajaxState";
import {selectSpotifyTracks} from "../../selectors/spotifySelector";
import {Sigma} from "react-sigma";
import {graphSettings} from "../../graph/graphSettings";
import GraphLoader from "../GraphLoader";
import {tracksGraph} from "../../graph/tracksGraph";
import CustomForceAtlas2 from "../CustomForceAtlas2";

const NothingSelected = () => (
    <div className="genre-selector">
        <h2>Nothing Selected</h2>
        <p>Click on a genre to display information about it</p>
    </div>
);

export const GenreSelector: FunctionComponent<{}> = () => {
    const selectedGenre = selectSelectedGenre();
    const selected = selectSelectedNodeInformation(selectedGenre);
    const tracksOrAjaxState: SpotifyTracksMap | AjaxState = selectSpotifyTracks();

    if (selected === null || !isSuccessfulFetch(tracksOrAjaxState)) {
        return <NothingSelected />
    }

    const playlists: PlaylistBaseObject[] = selected.map(item => item.playlist);
    const tracksMap: {[playlistId: string]: PlaylistTrackObject[]} = {};
    selected.forEach((item) => {
        tracksMap[item.playlist.id] = item.tracks;
    });
    const artistsMap: SpotifyArtistMap = (tracksOrAjaxState as SpotifyTracksMap).artistsMap;

    const graph = tracksGraph(
        playlists,
        {tracksMap, artistsMap}
    );

    console.log(selectedGenre, selected, graph);

    return (
        <div className="genre-selector">
            <h2>{selectedGenre}</h2>
            <Sigma
                renderer="canvas"
                settings={{
                    ...graphSettings,
                    drawEdges: true
                }}
            >
                <GraphLoader graph={graph}>
                    <CustomForceAtlas2
                        slowDown={2}
                        iterationsPerRender={1}
                        linLogMode={true}
                        worker
                    />
                </GraphLoader>
            </Sigma>
            {
                selected.map(({ playlist, tracks }) => (
                    <div key={playlist.id}>
                        <h4>{playlist.name}</h4>
                        <ul>
                            {tracks.map((track) => (
                                <li key={track.track.id}>{track.track.name}</li>
                            ))}
                        </ul>
                    </div>
                ))
            }
        </div>
    );
};
