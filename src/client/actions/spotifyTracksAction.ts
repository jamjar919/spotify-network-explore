import {Action, ActionName} from "./action";
import {Path} from "../../common/path";
import PlaylistBaseObject = SpotifyApi.PlaylistBaseObject;
import {RequestParameter} from "../../common/requestParameter";
import {ContentType} from "../../common/contentType";
import {Method} from "../../common/method";

const fetchTracks = (playlistIds: string[]): Promise<PlaylistBaseObject[]> => fetch(Path.Spotify.TRACKS, {
    method: Method.POST,
    body: JSON.stringify(playlistIds),
    headers: {
        [RequestParameter.CONTENT_TYPE]: ContentType.JSON
    }
}).then(res => res.json());

const fetchTracksSuccess = (playlists: PlaylistBaseObject[]): Action<PlaylistBaseObject[]> => ({
    type: ActionName.FETCH_TRACKS_SUCCESS,
    payload: playlists
});

const fetchTracksError: Action<void> = {
    type: ActionName.FETCH_TRACKS_ERROR,
};

const fetchTracksLoading: Action<void> = {
    type: ActionName.FETCH_TRACKS
};

export const fetchTracksAction = (playlistIds: string[]) => {
    return (dispatch: (action: Action<PlaylistBaseObject[] | void>) => void) => {
        dispatch(fetchTracksLoading);
        fetchTracks(playlistIds)
            .then((result: PlaylistBaseObject[]) => dispatch(fetchTracksSuccess(result)))
            .catch(() => dispatch(fetchTracksError));
    }
};
