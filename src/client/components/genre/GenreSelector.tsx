import React, {FunctionComponent} from "react";
import {Badge, BadgeRow} from "../generic/Badge";
import {EveryNoiseButton} from "./EveryNoiseButton";
import {colorFromString} from "../../util/color";
import {PlaylistTab} from "./tab/PlaylistTab";
import {NothingSelected} from "./NothingSelected";
import {RandomGenreButton} from "./RandomGenreButton";
import PlaylistBaseObject = SpotifyApi.PlaylistBaseObject;
import PlaylistTrackObject = SpotifyApi.PlaylistTrackObject;

type GenreSelectorProps = {
    selectedGenre: string | null;
    selectedNodeInformation: {
        playlist: PlaylistBaseObject,
        tracks: PlaylistTrackObject[]
    }[] | null
}

export const GenreSelector: FunctionComponent<GenreSelectorProps> = ({ selectedGenre, selectedNodeInformation }) => {
    if (selectedGenre === null || selectedNodeInformation === null) {
        return <NothingSelected />
    }

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
            {<PlaylistTab selected={selectedNodeInformation} />}
        </div>
    );
};
