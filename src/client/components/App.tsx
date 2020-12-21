import React, {useEffect} from 'react';
import {useDispatch} from "react-redux";
import {fetchProfileAction} from "../actions/spotifyProfileAction";
import {fetchPlaylistsAction} from "../actions/spotifyPlaylistsAction";
import {fetchTracksAction} from "../actions/spotifyTracksAction";
import {SpotifyTracksMap} from "../reducers/spotifyTracksReducer";
import Login from "./Login";
import {AjaxState, isFailedFetch, isLoadingOrEmpty, isSuccessfulFetch} from "../reducers/ajaxState";
import PlaylistBaseObject = SpotifyApi.PlaylistBaseObject;
import UserObjectPrivate = SpotifyApi.UserObjectPrivate;
import {LoadingSpotifyData} from "./LoadingSpotifyData";
import PlaylistNetworkViewer from "./PlaylistNetworkViewer";
import {selectSpotifyPlaylists, selectSpotifyProfile, selectSpotifyTracks} from "../selectors/spotifySelector";

/**
 * Class responsible for loading data + deciding what to render
 */
const App = () => {
    const dispatch = useDispatch();
    const profileOrAjaxState: UserObjectPrivate | AjaxState = selectSpotifyProfile();
    const playlistsOrAjaxState: PlaylistBaseObject[] | AjaxState = selectSpotifyPlaylists();
    const tracksOrAjaxState: SpotifyTracksMap | AjaxState = selectSpotifyTracks();

    useEffect(() => {
        dispatch(fetchProfileAction());
        dispatch(fetchPlaylistsAction());
    }, []);

    useEffect(() => {
        if (isSuccessfulFetch(playlistsOrAjaxState) && isSuccessfulFetch(profileOrAjaxState)) {
            const playlists = playlistsOrAjaxState as PlaylistBaseObject[];
            const profile = profileOrAjaxState as UserObjectPrivate;
            const playlistIds = playlists
                .filter(playlist => playlist.owner.id === profile.id)
                .map((playlist: PlaylistBaseObject) => playlist.id);
            dispatch(fetchTracksAction(playlistIds));
        }
    }, [playlistsOrAjaxState]);

    // Failed fetch for profile probably means they need to log in
    if (isFailedFetch(profileOrAjaxState)) {
        return (<Login />);
    }

    // Failed fetch for playlist/tracks - who knows
    if (isFailedFetch(playlistsOrAjaxState) || isFailedFetch(tracksOrAjaxState)) {
        return (<>Failed to load playlists or tracks</>);
    }

    // Show the loading screen when we're loading anything
    if (isLoadingOrEmpty(profileOrAjaxState) || isLoadingOrEmpty(playlistsOrAjaxState) || isLoadingOrEmpty(tracksOrAjaxState)) {
        return <LoadingSpotifyData
            profile={profileOrAjaxState}
            playlists={playlistsOrAjaxState}
            tracks={tracksOrAjaxState}
        />
    }

    const profile = profileOrAjaxState as UserObjectPrivate;
    const playlists = playlistsOrAjaxState as PlaylistBaseObject[];
    const tracks = tracksOrAjaxState as SpotifyTracksMap;

    return (<PlaylistNetworkViewer
        playlists={playlists.filter(playlist => playlist.owner.id === profile.id)}
        tracks={tracks}
    />);
};

export default App;