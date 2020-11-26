import { combineReducers } from 'redux';
import spotifyProfileReducer, {SpotifyProfileState} from "./spotifyProfileReducer";
import spotifyPlaylistsReducer, {SpotifyPlaylistsState} from "./spotifyPlaylistsReducer";
import spotifyTracksReducer, {SpotifyTracksState} from "./spotifyTracksReducer";
import batchedGraphReducer, {BatchedGraphState} from "./batchedGraphReducer";

const reducers = {
    spotifyProfile: spotifyProfileReducer,
    spotifyPlaylists: spotifyPlaylistsReducer,
    spotifyTracks: spotifyTracksReducer,
    batchedGraph: batchedGraphReducer,
};

export type State = {
    spotifyProfile: SpotifyProfileState,
    spotifyPlaylists: SpotifyPlaylistsState,
    spotifyTracks: SpotifyTracksState,
    batchedGraph: BatchedGraphState
};

export default combineReducers(reducers);