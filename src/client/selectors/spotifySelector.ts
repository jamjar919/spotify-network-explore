import {AjaxState} from "../reducers/ajaxState";
import {useSelector} from "react-redux";
import {State} from "../reducers/rootReducer";
import {SpotifyTracksMap} from "../reducers/spotifyTracksReducer";
import UserObjectPrivate = SpotifyApi.UserObjectPrivate;
import PlaylistBaseObject = SpotifyApi.PlaylistBaseObject;

export const selectSpotifyProfile = (): UserObjectPrivate | AjaxState =>
    useSelector((state: State) => state.spotifyProfile);

export const selectSpotifyPlaylists = (): PlaylistBaseObject[] | AjaxState =>
    useSelector((state: State) => state.spotifyPlaylists);

export const selectSpotifyTracks = (): SpotifyTracksMap | AjaxState =>
    useSelector((state: State) => state.spotifyTracks);
