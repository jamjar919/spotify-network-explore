import {Request, Response} from "express";
import {SpotifyApi, Endpoint} from "../api/spotifyApi";
import {getAccessTokenFromRequest} from "../util/requestUtil";
import {PaginationUtil} from "../util/paginationUtil";
import ArtistObjectFull = SpotifyApi.ArtistObjectFull;

export const affinity = (req: Request, res: Response) => {
    const accessToken = getAccessTokenFromRequest(req);

    const topArtists = new PaginationUtil<ArtistObjectFull>(
        SpotifyApi[Endpoint.AFFINITY_ARTISTS],
        accessToken
    ).getAll();

    const topTracks = new PaginationUtil<ArtistObjectFull>(
        SpotifyApi[Endpoint.AFFINITY_TRACKS],
        accessToken
    ).getAll();

    Promise.all([topArtists, topTracks]).then(([artists, tracks]) =>
        res.send({
            artists,
            tracks
        })
    ).catch((err) => {
        res.status(500);
        res.send(err);
    })
};

