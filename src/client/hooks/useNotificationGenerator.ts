import {useEffect} from "react";
import {selectCurrentBatch} from "../selectors/batchedGraphSelector";
import {useDispatch} from "react-redux";
import {selectSpotifyPlaylists, selectSpotifyTracks} from "../selectors/spotifySelector";
import {isSuccessfulFetch} from "../reducers/ajaxState";
import {SpotifyTracksMap} from "../reducers/spotifyTracksReducer";
import PlaylistBaseObject = SpotifyApi.PlaylistBaseObject;
import {clearNotificationsAction, displayNotificationAction} from "../actions/notificationBarActions";
import { v4 as uuidv4 } from 'uuid';

export default () => {
    const dispatch = useDispatch();
    const currentBatch = selectCurrentBatch();
    const playlistsOrAjaxState = selectSpotifyPlaylists();
    const tracksOrAjaxState = selectSpotifyTracks();
    useEffect(() => {
        const hasLoadedSpotifyContent = isSuccessfulFetch(playlistsOrAjaxState) && isSuccessfulFetch(tracksOrAjaxState);
        const hasLoadedGraph = currentBatch && currentBatch.graph;

        if (hasLoadedSpotifyContent && hasLoadedGraph) {
            clearNotificationsAction()(dispatch);
            const playlists = playlistsOrAjaxState as PlaylistBaseObject[];
            const tracks = tracksOrAjaxState as SpotifyTracksMap;

            currentBatch?.graph.edges.forEach((edge) => {
                const playlist = playlists.filter(p => p.id === edge.target)[0];
                const track = tracks[playlist.id].filter(track => track.track.id === edge.source)[0];

                const id = uuidv4();
                const text = `Added ${track.track.name} to ${playlist.name}`;
                displayNotificationAction(id, text)(dispatch);
            })
        }
    }, [currentBatch])
}