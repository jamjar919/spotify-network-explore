import { combineReducers } from 'redux';
import spotifyProfileReducer from "./spotifyProfileReducer";

export default () => combineReducers({
    spotifyReducer: spotifyProfileReducer
});