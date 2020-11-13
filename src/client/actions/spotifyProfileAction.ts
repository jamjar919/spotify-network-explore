import UserObjectPrivate = SpotifyApi.UserObjectPrivate;
import {Action, ActionName} from "./action";
import {Path} from "../../common/path";

const fetchProfile = (): Promise<UserObjectPrivate> => fetch(Path.Spotify.USER)
    .then(res => res.json());

const fetchProfileSuccess = (profile: UserObjectPrivate): Action<UserObjectPrivate> => ({
    type: ActionName.FETCH_PROFILE_SUCCESS,
    payload: profile
});

const fetchProfileError: Action<void> = {
    type: ActionName.FETCH_PROFILE_ERROR,
};

export const fetchProfileAction = () => {
    return (dispatch: (action: Action<UserObjectPrivate | void>) => void) => fetchProfile()
        .then((result: UserObjectPrivate) => dispatch(fetchProfileSuccess(result)))
        .catch(() => dispatch(fetchProfileError));
};
