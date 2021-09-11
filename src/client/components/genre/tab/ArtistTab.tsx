import React, {FunctionComponent} from "react";
import PlaylistBaseObject = SpotifyApi.PlaylistBaseObject;
import PlaylistTrackObject = SpotifyApi.PlaylistTrackObject;
import {NothingSelected} from "../NothingSelected";
import {SpotifyArtistMap} from "../../../reducers/spotifyTracksReducer";
import TrackObjectFull = SpotifyApi.TrackObjectFull;
import {Artist} from "../../generic/spotify/Artist";

type ArtistTabProps = {
    selectedGenre: string | null;
    selectedNodeInformation: {
        playlist: PlaylistBaseObject,
        tracks: PlaylistTrackObject[]
    }[] | null,
    artistsMap: SpotifyArtistMap | null
}

export const ArtistTab: FunctionComponent<ArtistTabProps> = ({
    selectedGenre,
    selectedNodeInformation,
    artistsMap
}) => {

    if (selectedGenre === null || selectedNodeInformation === null || artistsMap == null) {
        return <NothingSelected />
    }

    // Get artists from selected node info
    const artistToTracksMap: {[artistId: string]: TrackObjectFull[]} = {};
    selectedNodeInformation
        .flatMap(({ tracks }) => tracks.map(track => track.track))
        .forEach((track) => {
            track.artists.forEach((artist) => {
                if (!(artist.id in artistToTracksMap)) {
                    artistToTracksMap[artist.id] = [];
                }

                artistToTracksMap[artist.id].push(track);
            })
        })

    const sorted = Object.entries(artistToTracksMap).sort(([_, a], [__, b ]) =>
        b.length - a.length
    );

    return (
        <>
            {sorted.map(([artistId, tracks]) => {
                const artist = artistsMap[artistId];
                if (artist) {
                    return (
                        <Artist key={artist.id} artist={artist} tracks={tracks}/>
                    )
                } else {
                    console.error(artist, artistId, artistsMap);
                }
            })}
        </>
    )
};