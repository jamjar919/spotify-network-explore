import UserObjectPrivate = SpotifyApi.UserObjectPrivate;
import {Action, ActionName} from "../actions/action";

export type SpotifyProfileState = UserObjectPrivate | null

export default (state: SpotifyProfileState = null, action: Action<UserObjectPrivate | void>): SpotifyProfileState => {
    switch (action.type) {
        case ActionName.FETCH_PROFILE_ERROR: {
            return null;
        }
        case ActionName.FETCH_PROFILE_SUCCESS: {
            return action.payload as UserObjectPrivate;
        }
    }
    return state;
};