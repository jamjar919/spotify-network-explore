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

export const LoadingSpotifyData: FunctionComponent<LoadingProps> = ({
    profile,
    playlists,
    tracks
}) => (
    <div className="loading-container">
        <div className="loading">
            <div className="loading-spinner">
                <img src={"/images/spotify-spin-fast.gif"} alt="Loading..." />
            </div>
            {profile || playlists || tracks ? (
                <ul className="loading-items">
                    <li className={isLoadingOrEmpty(profile) ? "" : "finished-loading" }>
                        Loading profile...
                    </li>
                    <li className={isLoadingOrEmpty(playlists) ? "" : "finished-loading" }>
                        Loading playlists...
                    </li>
                    <li className={isLoadingOrEmpty(tracks) ? "" : "finished-loading" }>
                        Loading tracks...
                    </li>
                </ul>
            ) : ""}
        </div>
    </div>
);