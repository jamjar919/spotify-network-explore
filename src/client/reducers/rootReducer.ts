import { combineReducers } from 'redux';
import spotifyProfileReducer, {SpotifyProfileState} from "./spotifyProfileReducer";
import spotifyPlaylistsReducer, {SpotifyPlaylistsState} from "./spotifyPlaylistsReducer";
import spotifyTracksReducer, {SpotifyTracksState} from "./spotifyTracksReducer";
import batchedGraphReducer, {BatchedGraphState} from "./batchedGraphReducer";
import notificationReducer, { NotificationState } from "./notificationReducer";

const reducers = {
    spotifyProfile: spotifyProfileReducer,
    spotifyPlaylists: spotifyPlaylistsReducer,
    spotifyTracks: spotifyTracksReducer,
    batchedGraph: batchedGraphReducer,
    notifications: notificationReducer
};

export type State = {
    spotifyProfile: SpotifyProfileState,
    spotifyPlaylists: SpotifyPlaylistsState,
    spotifyTracks: SpotifyTracksState,
    batchedGraph: BatchedGraphState,
    notifications: NotificationState
};

export default combineReducers(reducers);