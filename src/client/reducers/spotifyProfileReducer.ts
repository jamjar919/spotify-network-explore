import UserObjectPrivate = SpotifyApi.UserObjectPrivate;
import {Action, ActionName} from "../actions/action";
import {AjaxState} from "./ajaxState";

export type SpotifyProfileState = UserObjectPrivate | AjaxState

export default (state: SpotifyProfileState = AjaxState.EMPTY, action: Action<UserObjectPrivate | void>): SpotifyProfileState => {
    switch (action.type) {
        case ActionName.FETCH_PROFILE: {
            return AjaxState.LOADING;
        }
        case ActionName.FETCH_PROFILE_ERROR: {
            return AjaxState.ERROR;
        }
        case ActionName.FETCH_PROFILE_SUCCESS: {
            return action.payload as UserObjectPrivate;
        }
    }
    return state;
};