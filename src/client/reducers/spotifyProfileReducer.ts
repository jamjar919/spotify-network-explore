import UserObjectPrivate = SpotifyApi.UserObjectPrivate;
import {Action, ActionName} from "../actions/action";

export type SpotifyProfileState = { profile?: UserObjectPrivate }

export default (state: SpotifyProfileState = {}, action: Action<UserObjectPrivate | void>) => {
    switch (action.type) {
        case ActionName.FETCH_PROFILE_ERROR: {
            return {};
        }
        case ActionName.FETCH_PROFILE_SUCCESS: {
            return {
                profile: action.payload as UserObjectPrivate
            };
        }
    }
    return state;
};