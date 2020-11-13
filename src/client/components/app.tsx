import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {fetchProfileAction} from "../actions/spotifyProfileAction";
import {State} from "../reducers/rootReducer";
import {fetchPlaylistsAction} from "../actions/spotifyPlaylistsAction";
import PlaylistBaseObject = SpotifyApi.PlaylistBaseObject;
import UserObjectPrivate = SpotifyApi.UserObjectPrivate;

const App = () => {
    const dispatch = useDispatch();
    const profile: UserObjectPrivate | null  = useSelector((state: State) => state.spotifyProfile);
    const playlists: PlaylistBaseObject[] | null = useSelector((state: State) => state.spotifyPlaylists);

    useEffect(() => {
        dispatch(fetchProfileAction());
        dispatch(fetchPlaylistsAction());
    }, []);

    if (profile === null || playlists === null) {
        return (<>failed to fetch profile/playlists</>);
    }

    return (
    <>
        <div>{JSON.stringify(profile)}</div>
        {
            playlists.map(playlist => {
                return (
                    <div>{playlist.name}</div>
                )
            })
        }
    </>
    );
};

export default App;