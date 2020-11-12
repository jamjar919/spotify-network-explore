import {Request, Response} from "express";
import fetch from "node-fetch";
import {SpotifyApi, Endpoint, getFetchOptions} from "../api/spotifyApi";
import {getAccessTokenFromRequest} from "../util/requestUtil";

export const playlistList = (req: Request, res: Response) => {
    const accessToken = getAccessTokenFromRequest(req);
    const api = SpotifyApi[Endpoint.PLAYLIST_LIST];

    fetch(api.url, getFetchOptions(api, accessToken))
        .then(spotifyResponse => spotifyResponse.json())
        .then((spotifyResponse) => res.send(spotifyResponse));
};
