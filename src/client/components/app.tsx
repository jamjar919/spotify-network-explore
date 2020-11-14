import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {fetchProfileAction} from "../actions/spotifyProfileAction";
import {State} from "../reducers/rootReducer";
import {fetchPlaylistsAction} from "../actions/spotifyPlaylistsAction";
import PlaylistBaseObject = SpotifyApi.PlaylistBaseObject;
import UserObjectPrivate = SpotifyApi.UserObjectPrivate;
import {fetchTracksAction} from "../actions/spotifyTracksAction";
import {SpotifyTracksMap} from "../reducers/spotifyTracksReducer";
import PlaylistTrackObject = SpotifyApi.PlaylistTrackObject;

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
            fetchTracksAction(playlistIds);
        }
    });

    if (profile === null || playlists === null) {
        return (<>fetching profile/playlists</>);
    }

    return (
    <>
        <strong>{profile?.display_name}</strong>
        {
            playlists && playlists.map(playlist => (<>
                <div>{playlist.name}</div>
                <ul>
                    {
                        tracks && tracks[playlist.id].map((track: PlaylistTrackObject) => {
                            <li>{track.track.name}</li>
                        })
                    }
                </ul>
            </>))
        }
    </>
    );
};

export default App;