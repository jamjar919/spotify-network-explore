import {Request, Response} from "express";
import {SpotifyApi, Endpoint} from "../api/spotifyApi";
import {getAccessTokenFromRequest} from "../util/requestUtil";
import {PaginationUtil} from "../util/paginationUtil";

export const playlistList = (req: Request, res: Response) => {
    const accessToken = getAccessTokenFromRequest(req);

    new PaginationUtil(
        SpotifyApi[Endpoint.PLAYLIST_LIST],
        accessToken
    ).getAll().then((playlist) => res.send(playlist));
};

