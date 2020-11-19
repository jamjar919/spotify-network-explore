import {Action, ActionName} from "../actions/action";
import {AjaxState} from "./ajaxState";
import PlaylistBaseObject = SpotifyApi.PlaylistBaseObject;

export type SpotifyPlaylistsState = PlaylistBaseObject[] | AjaxState

export default (state: SpotifyPlaylistsState = AjaxState.EMPTY, action: Action<PlaylistBaseObject[] | void>): SpotifyPlaylistsState => {
    switch (action.type) {
        case ActionName.FETCH_PLAYLISTS: {
            return AjaxState.LOADING;
        }
        case ActionName.FETCH_PLAYLISTS_ERROR: {
            return AjaxState.ERROR;
        }
        case ActionName.FETCH_PLAYLISTS_SUCCESS: {
            return action.payload as PlaylistBaseObject[]
        }
    }
    return state;
};