import React, {FunctionComponent} from "react";
import {selectSelectedGenre, selectSelectedNodeInformation} from "../../selectors/batchedGraphSelector";
import {SpotifyTracksMap} from "../../reducers/spotifyTracksReducer";
import PlaylistTrackObject = SpotifyApi.PlaylistTrackObject;
import {AjaxState, isSuccessfulFetch} from "../../reducers/ajaxState";
import {selectSpotifyTracks} from "../../selectors/spotifySelector";
import {Badge, BadgeRow} from "../generic/Badge";
import {EveryNoiseButton} from "./EveryNoiseButton";
import {colorFromString} from "../../util/color";
import {PlaylistTab} from "./tab/PlaylistTab";
import {NothingSelected} from "./NothingSelected";
import {RandomGenreButton} from "./RandomGenreButton";

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
            <h2 className="genre-title">
                <div>{selectedGenre}</div>
                <div className="inline-random-genre-button">
                    <RandomGenreButton/>
                </div>
            </h2>
            <BadgeRow>
                <Badge color={colorFromString(selectedGenre)}>
                    <EveryNoiseButton genre={selectedGenre}>
                        Every Noise
                    </EveryNoiseButton>
                </Badge>
            </BadgeRow>
            {<PlaylistTab selected={selected} />}
        </div>
    );
};
