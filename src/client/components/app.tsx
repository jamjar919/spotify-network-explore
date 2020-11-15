import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {fetchProfileAction} from "../actions/spotifyProfileAction";
import {State} from "../reducers/rootReducer";
import {fetchPlaylistsAction} from "../actions/spotifyPlaylistsAction";
import PlaylistBaseObject = SpotifyApi.PlaylistBaseObject;
import UserObjectPrivate = SpotifyApi.UserObjectPrivate;
import {fetchTracksAction} from "../actions/spotifyTracksAction";
import {SpotifyTracksMap} from "../reducers/spotifyTracksReducer";
import PlaylistNetwork from "./playlistNetwork";

const App = () => {
    const dispatch = useDispatch();
    const profile: UserObjectPrivate | null  = useSelector((state: State) => state.spotifyProfile);
    const playlists: PlaylistBaseObject[] | null = useSelector((state: State) => state.spotifyPlaylists);
    const tracks: SpotifyTracksMap | null = useSelector((state: State) => state.spotifyTracks);

    useEffect(() => {
        dispatch(fetchProfileAction());
        dispatch(fetchPlaylistsAction());
    }, []);

    useEffect(() => {
        if (playlists !== null) {
            const playlistIds = playlists.map(playlist => playlist.id);
            dispatch(fetchTracksAction(playlistIds));
        }
    }, [playlists]);

    if (profile === null || playlists === null || tracks === null) {
        return (<>fetching profile/playlists</>);
    }

    return (<PlaylistNetwork playlists={playlists} tracks={tracks}/>);
};

export default App;