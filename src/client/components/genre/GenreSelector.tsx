import React, {FunctionComponent} from "react";
import {selectSelectedGenre, selectSelectedNodeInformation} from "../../selectors/batchedGraphSelector";
import {SpotifyTracksMap} from "../../reducers/spotifyTracksReducer";
import PlaylistTrackObject = SpotifyApi.PlaylistTrackObject;
import {AjaxState, isSuccessfulFetch} from "../../reducers/ajaxState";
import {selectSpotifyTracks} from "../../selectors/spotifySelector";
import {Badge, BadgeRow} from "../generic/Badge";
import {EveryNoiseLink} from "./EveryNoiseLink";
import {colorFromString} from "../../util/color";

const NothingSelected = () => (
    <div className="genre-selector">
        <h2>Nothing Selected</h2>
        <p>Click on a genre to display information about it</p>
    </div>
);

export const GenreSelector: FunctionComponent<{}> = () => {
    const selectedGenre = selectSelectedGenre();
    const selected = selectSelectedNodeInformation(selectedGenre);
    const tracksOrAjaxState: SpotifyTracksMap | AjaxState = selectSpotifyTracks();

    if (selectedGenre === null || selected === null || !isSuccessfulFetch(tracksOrAjaxState)) {
        return <NothingSelected />
    }

    // const playlists: PlaylistBaseObject[] = selected.map(item => item.playlist);
    const tracksMap: {[playlistId: string]: PlaylistTrackObject[]} = {};
    selected.forEach((item) => {
        tracksMap[item.playlist.id] = item.tracks;
    });
    // const artistsMap: SpotifyArtistMap = (tracksOrAjaxState as SpotifyTracksMap).artistsMap;

    return (
        <div className="genre-selector">
            <h2>{selectedGenre}</h2>
            <BadgeRow>
                <Badge color={colorFromString(selectedGenre)}>
                    <EveryNoiseLink genre={selectedGenre}>
                        Every Noise
                    </EveryNoiseLink>
                </Badge>
            </BadgeRow>
            {
                selected.map(({ playlist, tracks }) => (
                    <div key={playlist.id}>
                        <h4>{playlist.name}</h4>
                        <ul>
                            {tracks.map((track) => (
                                <li key={track.track.id}>{track.track.name}</li>
                            ))}
                        </ul>
                    </div>
                ))
            }
        </div>
    );
};
