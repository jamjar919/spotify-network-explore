import {SpotifyTracksMap} from "../reducers/spotifyTracksReducer";
import PlaylistBaseObject = SpotifyApi.PlaylistBaseObject;
import React, {useEffect} from "react";
import BatchedNetwork from "./batchedgraph/BatchedNetwork";
import BatchedGraphControl from "./batchedgraph/control/BatchedGraphControl";
import {graphTimeBatcher} from "../graph/graphTimeBatcher";
import {StatelessLoader} from "./StatelessLoader";
import {
    selectCurrentBatchIndex,
    selectCurrentGraph,
    selectCurrentTimeUnit,
    selectSelectedGenre
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
    const timeUnit = selectCurrentTimeUnit();
    const selectedGenre = selectSelectedGenre();

    // Load the graph on render
    useEffect(() => {
        const graph = graphTimeBatcher(
            genreGraph(playlists, tracks),
            { timeUnit, removeEmpty: false }
        );

        setGraphAction(graph, timeUnit)(dispatch);
    }, [timeUnit]);

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
                <OverlayHeader />
                <OverlayBox>
                    <BatchedGraphControl />
                </OverlayBox>
                <OverlayBox>
                    <GenreSelector/>
                </OverlayBox>
            </OverlayBase>
            <MainMenu />
        </>
    );
};

export default PlaylistNetworkViewer;