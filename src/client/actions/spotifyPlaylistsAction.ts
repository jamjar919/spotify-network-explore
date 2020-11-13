import {Action, ActionName} from "./action";
import {Path} from "../../common/path";
import PlaylistBaseObject = SpotifyApi.PlaylistBaseObject;

const fetchPlaylists = (): Promise<PlaylistBaseObject[]> => fetch(Path.Spotify.PLAYLISTS)
    .then(res => res.json());

const fetchPlaylistsSuccess = (playlists: PlaylistBaseObject[]): Action<PlaylistBaseObject[]> => ({
    type: ActionName.FETCH_PLAYLISTS_SUCCESS,
    payload: playlists
});

const fetchProfileError: Action<void> = {
    type: ActionName.FETCH_PLAYLISTS_ERROR,
};

export const fetchPlaylistsAction = () => {
    return (dispatch: (action: Action<PlaylistBaseObject[] | void>) => void) => fetchPlaylists()
        .then((result: PlaylistBaseObject[]) => dispatch(fetchPlaylistsSuccess(result)))
        .catch(() => dispatch(fetchProfileError));
};
