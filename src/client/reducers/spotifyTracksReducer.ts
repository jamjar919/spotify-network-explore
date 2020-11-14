import {Action, ActionName} from "../actions/action";
import PlaylistTrackObject = SpotifyApi.PlaylistTrackObject;

export type SpotifyTracksMap = { [playlistId: string]: PlaylistTrackObject[] }
export type SpotifyTracksState = SpotifyTracksMap | null

export default (state: SpotifyTracksState = null, action: Action<SpotifyTracksMap | void>): SpotifyTracksState => {
    switch (action.type) {
        case ActionName.FETCH_TRACKS_ERROR: {
            return null;
        }
        case ActionName.FETCH_TRACKS_SUCCESS: {
            return action.payload as SpotifyTracksMap;
        }
    }
    return state;
};