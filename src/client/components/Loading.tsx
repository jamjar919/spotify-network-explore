import React, {FunctionComponent} from "react";
import {AjaxState, isLoadingOrEmpty} from "../reducers/ajaxState";
import UserObjectPrivate = SpotifyApi.UserObjectPrivate;
import {SpotifyTracksMap} from "../reducers/spotifyTracksReducer";
import PlaylistBaseObject = SpotifyApi.PlaylistBaseObject;

type LoadingProps = {
    profile?: UserObjectPrivate | AjaxState,
    playlists?: PlaylistBaseObject[] | AjaxState,
    tracks?: SpotifyTracksMap | AjaxState
}

export const Loading: FunctionComponent<LoadingProps> = ({
    profile,
    playlists,
    tracks
}) => (
    <div className="loading">
        <div className="loading-spinner">
            <img src={"/images/spotify-spin-fast.gif"} alt="Loading..." />
        </div>
        <ul>
            <li>
                Loading profile... {isLoadingOrEmpty(profile) ? "" : "Done" }
            </li>
            <li>
                Loading playlists... {isLoadingOrEmpty(playlists) ? "" : "Done" }
            </li>
            <li>
                Loading tracks... {isLoadingOrEmpty(tracks) ? "" : "Done" }
            </li>
        </ul>
    </div>
);