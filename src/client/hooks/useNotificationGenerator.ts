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

            const playlistsAddedToMap: { [id: string]: {
                    name: string,
                    trackNames: string[]
                }
            } = {};

            currentBatch?.graph.edges.forEach((edge) => {
                const playlist = playlists.filter(p => p.id === edge.target)[0];

                if (!playlist) {
                    return;
                }

                const track = tracks.tracksMap[playlist.id].filter(track => track.track.id === edge.source)[0];

                if (!(playlist.id in playlistsAddedToMap)) {
                    playlistsAddedToMap[playlist.id] = {
                        name: playlist.name,
                        trackNames: []
                    }
                }

                playlistsAddedToMap[playlist.id].trackNames.push(track.track.name);
            });

            Object.entries(playlistsAddedToMap).forEach(([_id, data]) => {
                if (data.trackNames.length > 0) {
                    let text = `Added ${data.trackNames[0]}`;
                    if (data.trackNames.length > 1) {
                        text += ` and ${data.trackNames.length - 1} others`;
                    }
                    text += ` to ${data.name}`;

                    const id = uuidv4();
                    displayNotificationAction(id, text)(dispatch);
                }
            })
        }
    }, [currentBatch])
}