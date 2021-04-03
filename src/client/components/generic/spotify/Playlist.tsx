import React, {FunctionComponent, useState} from "react";
import PlaylistBaseObject = SpotifyApi.PlaylistBaseObject;
import PlaylistTrackObject = SpotifyApi.PlaylistTrackObject;
import {Track} from "./Track";
import classNames from "classnames";
import {Transition} from "@headlessui/react";
import {Badge} from "../Badge";
import {colorFromString} from "../../../util/color";

type PlaylistProps = {
    /** The base playlist object with name/etc */
    playlist: PlaylistBaseObject,
    /** The list of tracks in the playlist */
    tracks: PlaylistTrackObject[]
}

/**
 * Renders a Spotify playlist as a dropdown list of songs.
 */
export const Playlist: FunctionComponent<PlaylistProps> = ({ playlist, tracks }) => {
    const [expanded, setExpanded] = useState<boolean>(false);

    const handleClick = () => setExpanded(!expanded);

    const playlistColor = colorFromString(playlist.name);

    return (
        <div
            key={playlist.id}
            className={classNames("spotify-playlist-dropdown", {
                'expanded': expanded
            })}
            aria-expanded={expanded}
            aria-haspopup={true}
        >
            <div className="dropdown-button" onClick={handleClick} role="button">
                <div className="playlist-name">{playlist.name}</div>
                <Badge
                    className="playlist-size"
                    color={playlistColor}
                >
                    {tracks.length}
                </Badge>
                <div className="caret-down">
                    <svg className={classNames("transition", expanded ? "rotate-180" : "")} viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"/>
                    </svg>
                </div>
            </div>
            <Transition
                show={expanded}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-y-0"
                enterTo="transform opacity-100 scale-y-1"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-y-1"
                leaveTo="transform opacity-0 scale-y-0"
            >
                <div
                    className="tracks-container"
                    style={{ borderColor: playlistColor}}
                >
                    {tracks.map((track) => <Track track={track} />)}
                </div>
            </Transition>
        </div>
    );
};