import ArtistObjectFull = SpotifyApi.ArtistObjectFull;
import PlaylistTrackObject = SpotifyApi.PlaylistTrackObject;
import {SpotifyArtistMap} from "../reducers/spotifyTracksReducer";

export const getGenresForTrack = (
    track: PlaylistTrackObject,
    artistMap: SpotifyArtistMap
): string[] => {
    const artists = track.track.album.artists
        .map(simpleArtist => simpleArtist.id)
        .map(id => artistMap[id])
        .filter(fullArtist => typeof fullArtist !== "undefined");

    return artists.flatMap(artist => getGenresFromArtist(artist));
};

const getGenresFromArtist = (artist: ArtistObjectFull): string[] => artist.genres || [];