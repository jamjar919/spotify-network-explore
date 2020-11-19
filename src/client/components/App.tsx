import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {fetchProfileAction} from "../actions/spotifyProfileAction";
import {State} from "../reducers/rootReducer";
import {fetchPlaylistsAction} from "../actions/spotifyPlaylistsAction";
import {fetchTracksAction} from "../actions/spotifyTracksAction";
import {SpotifyTracksMap} from "../reducers/spotifyTracksReducer";
import PlaylistNetwork from "./PlaylistNetwork";
import Login from "./Login";
import {AjaxState, isFailedFetch, isLoadingOrEmpty, isSuccessfulFetch} from "../reducers/ajaxState";
import PlaylistBaseObject = SpotifyApi.PlaylistBaseObject;
import UserObjectPrivate = SpotifyApi.UserObjectPrivate;
import {LoadingSpotifyData} from "./LoadingSpotifyData";

const App = () => {
    const dispatch = useDispatch();
    const profileOrAjaxState: UserObjectPrivate | AjaxState  = useSelector((state: State) => state.spotifyProfile);
    const playlistsOrAjaxState: PlaylistBaseObject[] | AjaxState = useSelector((state: State) => state.spotifyPlaylists);
    const tracksOrAjaxState: SpotifyTracksMap | AjaxState = useSelector((state: State) => state.spotifyTracks);

    useEffect(() => {
        dispatch(fetchProfileAction());
        dispatch(fetchPlaylistsAction());
    }, []);

    useEffect(() => {
        if (isSuccessfulFetch(playlistsOrAjaxState)) {
            const playlists = playlistsOrAjaxState as PlaylistBaseObject[];
            const playlistIds = playlists.map((playlist: PlaylistBaseObject) => playlist.id);
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

    const playlists = playlistsOrAjaxState as PlaylistBaseObject[];
    const tracks = tracksOrAjaxState as SpotifyTracksMap;

    return (<PlaylistNetwork playlists={playlists} tracks={tracks}/>);
};

export default App;