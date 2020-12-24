import {Request, Response} from "express";
import {getAccessTokenFromRequest} from "../util/requestUtil";
import {PaginationUtil} from "../util/paginationUtil";
import {Endpoint, SpotifyApi} from "../api/spotifyApi";
import PlaylistTrackObject = SpotifyApi.PlaylistTrackObject;
import {getArtists} from "../util/artistsUtil";
import ArtistObjectFull = SpotifyApi.ArtistObjectFull;

export const tracks = (req: Request, res: Response) => {
    const accessToken = getAccessTokenFromRequest(req);
    const playListIds: string[] = req.body;
    const playlistToTracks: {
        [playlistId: string] : PlaylistTrackObject[]
    } = {};

    const requests = playListIds.map(id => new PaginationUtil<PlaylistTrackObject>(
            SpotifyApi[Endpoint.PLAYLIST_TRACKS],
            accessToken,
        {
                totalLimit: 1000,
                maxPerRequest: 100,
                getUrl: (url) => `${url}/${id}/tracks`
            }
        ).getAll().then((tracks: PlaylistTrackObject[]) => {
            playlistToTracks[id] = tracks;
        })
    );

    Promise.all(requests)
        .then(() => {
            // Extract unique artists
            const artistIds: string[] = Object.values(playlistToTracks)
                .flatMap(array => array)
                .flatMap(track => track.track.album.artists)
                .map(artist => artist.id);

            const uniqueArtistIds = artistIds
                .filter((v,i) => artistIds.indexOf(v) === i);

            getArtists(uniqueArtistIds, accessToken)
                .then((artists) => {
                    const artistsMap: {
                        [artistId: string]: ArtistObjectFull
                    } = { };

                    artists.forEach(artist => {
                        artistsMap[artist.id] = artist;
                    });

                    res.send({
                        tracksMap: playlistToTracks,
                        artistsMap
                    });
                });
        })
        .catch((err) => {
            res.status(500);
            res.send({error: err});
        })
};