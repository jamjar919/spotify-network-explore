import { combineReducers } from 'redux';
import spotifyProfileReducer, {SpotifyProfileState} from "./spotifyProfileReducer";
import spotifyPlaylistsReducer, {SpotifyPlaylistsState} from "./spotifyPlaylistsReducer";

const reducers = {
    spotifyProfile: spotifyProfileReducer,
    spotifyPlaylists: spotifyPlaylistsReducer
};

export type State = {
    spotifyProfile: SpotifyProfileState,
    spotifyPlaylists: SpotifyPlaylistsState
};

export default combineReducers(reducers);