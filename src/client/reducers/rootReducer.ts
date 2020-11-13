import { combineReducers } from 'redux';
import spotifyProfileReducer, {SpotifyProfileState} from "./spotifyProfileReducer";

export default combineReducers({
    spotifyProfile: spotifyProfileReducer
});

export type State = {
    spotifyProfile: SpotifyProfileState
}