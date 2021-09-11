import {SpotifyTracksMap} from "../reducers/spotifyTracksReducer";
import PlaylistBaseObject = SpotifyApi.PlaylistBaseObject;
import React, {useEffect, useState} from "react";
import BatchedNetwork from "./batchedgraph/BatchedNetwork";
import BatchedGraphControl from "./batchedgraph/control/BatchedGraphControl";
import {graphTimeBatcher} from "../graph/graphTimeBatcher";
import {StatelessLoader} from "./StatelessLoader";
import {
    selectCurrentBatchIndex,
    selectBatchedGraph,
    selectCurrentTimeUnit,
    selectSelectedGenre, selectSelectedNodeInformation
} from "../selectors/batchedGraphSelector";
import {useDispatch} from "react-redux";
import {setGraphAction} from "../actions/batchedGraphActions";
import NotificationsBar from "./notificationsbar/NotificationsBar";
import {genreGraph} from "../graph/genreGraph";
import {OverlayBase} from "./overlayui/OverlayBase";
import {OverlayBox} from "./overlayui/OverlayBox";
import {OverlayHeader} from "./overlayui/OverlayHeader";
import {GenreSelector} from "./genre/GenreSelector";
import {MainMenu} from "./MainMenu";
import {AnimationControl} from "./batchedgraph/settings/AnimationControl";
import {OverlayRow} from "./overlayui/OverlayRow";
import {ArtistTab} from "./genre/tab/ArtistTab";

type PlaylistNetworkViewerPropTypes = {
    playlists: PlaylistBaseObject[],
    tracks: SpotifyTracksMap,
};

const PlaylistNetworkViewer = ({
    playlists,
    tracks,
 }: PlaylistNetworkViewerPropTypes) => {
    const dispatch = useDispatch();
    const graph = selectBatchedGraph();
    const currentBatchIndex = selectCurrentBatchIndex();
    const timeUnit = selectCurrentTimeUnit();
    const selectedGenre = selectSelectedGenre();
    const selectedNodeInformation = selectSelectedNodeInformation(selectedGenre);

    // Load the graph on render
    useEffect(() => {
        const graph = genreGraph(playlists, tracks);
        const batchedGraph = graphTimeBatcher(graph, { timeUnit, removeEmpty: false });

        setGraphAction(graph, batchedGraph, timeUnit)(dispatch);
    }, [timeUnit]);

    const [panelsExpanded, setPanelsExpanded] = useState(false);

    if (
        graph === null ||
        currentBatchIndex === null
    ) {
        return <StatelessLoader />;
    }

    return (
        <>
            <NotificationsBar />
            <div className="networkContainer">
                <BatchedNetwork
                    batchedGraph={graph}
                    currentBatch={currentBatchIndex}
                    selectedId={selectedGenre || undefined}
                />
            </div>
            <AnimationControl />
            <OverlayBase>
                <OverlayHeader className="batched-graph-control-overlay" />
                <OverlayBox className="batched-graph-control-overlay">
                    <BatchedGraphControl />
                </OverlayBox>
                <OverlayRow expanded={panelsExpanded} onClick={() => setPanelsExpanded(!panelsExpanded)}>
                    <OverlayBox>
                        <GenreSelector selectedGenre={selectedGenre} selectedNodeInformation={selectedNodeInformation} />
                    </OverlayBox>
                    <OverlayBox>
                        <ArtistTab selectedGenre={selectedGenre} selectedNodeInformation={selectedNodeInformation} artistsMap={tracks.artistsMap} />
                    </OverlayBox>
                </OverlayRow>
            </OverlayBase>
            <MainMenu />
        </>
    );
};

export default PlaylistNetworkViewer;