import {Action, ActionName} from "../actions/action";
import PlaylistBaseObject = SpotifyApi.PlaylistBaseObject;

export type SpotifyPlaylistsState = PlaylistBaseObject[] | null

export default (state: SpotifyPlaylistsState = null, action: Action<PlaylistBaseObject[] | void>): SpotifyPlaylistsState => {
    switch (action.type) {
        case ActionName.FETCH_PLAYLISTS_ERROR: {
            return null;
        }
        case ActionName.FETCH_PLAYLISTS_SUCCESS: {
            return action.payload as PlaylistBaseObject[]
        }
    }
    return state;
};