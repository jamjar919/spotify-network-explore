import ArtistObjectFull = SpotifyApi.ArtistObjectFull;
import PlaylistTrackObject = SpotifyApi.PlaylistTrackObject;
import {SpotifyArtistMap, SpotifyTracksMap} from "../reducers/spotifyTracksReducer";
import PlaylistBaseObject = SpotifyApi.PlaylistBaseObject;

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

export const getTracksAndPlaylistFromGenre = (
    genre: string,
    tracks: SpotifyTracksMap,
    spotifyPlaylists: PlaylistBaseObject[]
): {
    playlist: PlaylistBaseObject,
    tracks: PlaylistTrackObject[]
}[] => {
    const spotifyArtistMap = tracks.artistsMap;

    return Object.entries(tracks.tracksMap)
            .map(([playlistId, playlistTrackArray]) => {
                const tracksOfGenre = playlistTrackArray.filter(track =>
                    getGenresForTrack(track, spotifyArtistMap).includes(genre)
                );

                return [
                    playlistId,
                    tracksOfGenre
                ];
            })
            .filter(([_, tracksOfGenre]) => tracksOfGenre.length > 0)
            .map(([playlistId, tracksOfGenre]) => ({
                playlist: spotifyPlaylists.find((playlist: PlaylistBaseObject) => playlist.id === playlistId) as PlaylistBaseObject,
                tracks: tracksOfGenre as PlaylistTrackObject[]
            }))
};