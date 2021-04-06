import {Action, ActionName} from "../actions/action";
import {AjaxState} from "./ajaxState";
import ArtistObjectFull = SpotifyApi.ArtistObjectFull;
import AudioFeaturesObject = SpotifyApi.AudioFeaturesObject;

export type TrackObjectWithAudioFeature  = SpotifyApi.PlaylistTrackObject & {
    audioFeatures: AudioFeaturesObject
};
export type SpotifyArtistMap = {[artistId: string]: ArtistObjectFull};
export type SpotifyTracksMap = {
    tracksMap: {[playlistId: string]: TrackObjectWithAudioFeature[]},
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