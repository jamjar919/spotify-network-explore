import {Action, ActionName} from "../actions/action";
import {AjaxState} from "./ajaxState";
import PlaylistTrackObject = SpotifyApi.PlaylistTrackObject;
import ArtistObjectFull = SpotifyApi.ArtistObjectFull;

export type SpotifyArtistMap = {[artistId: string]: ArtistObjectFull};
export type SpotifyTracksMap = {
    tracksMap: {[playlistId: string]: PlaylistTrackObject[]},
    artistsMap: SpotifyArtistMap
}
export type SpotifyTracksState = SpotifyTracksMap | AjaxState

export default (state: SpotifyTracksState = AjaxState.EMPTY, action: Action<SpotifyTracksMap | void>): SpotifyTracksState => {
    switch (action.type) {
        case ActionName.FETCH_TRACKS: {
            return AjaxState.LOADING;
        }
        case ActionName.FETCH_TRACKS_ERROR: {
            return AjaxState.ERROR;
        }
        case ActionName.FETCH_TRACKS_SUCCESS: {
            return action.payload as SpotifyTracksMap;
        }
    }
    return state;
};