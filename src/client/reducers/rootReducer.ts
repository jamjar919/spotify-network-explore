import { combineReducers } from 'redux';
import spotifyProfileReducer, {SpotifyProfileState} from "./spotifyProfileReducer";
import spotifyPlaylistsReducer, {SpotifyPlaylistsState} from "./spotifyPlaylistsReducer";
import spotifyTracksReducer, {SpotifyTracksState} from "./spotifyTracksReducer";

const reducers = {
    spotifyProfile: spotifyProfileReducer,
    spotifyPlaylists: spotifyPlaylistsReducer,
    spotifyTracks: spotifyTracksReducer
};

export type State = {
    spotifyProfile: SpotifyProfileState,
    spotifyPlaylists: SpotifyPlaylistsState,
    spotifyTracks: SpotifyTracksState
};

export default combineReducers(reducers);