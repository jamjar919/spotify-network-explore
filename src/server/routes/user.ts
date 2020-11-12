import {Request, Response} from "express";
import fetch from "node-fetch";
import {SpotifyApi, Endpoint, getFetchOptions} from "../api/spotifyApi";
import {getAccessTokenFromRequest} from "../util/requestUtil";

export const userInformation = (req: Request, res: Response) => {
    const accessToken = getAccessTokenFromRequest(req);

    fetch(SpotifyApi[Endpoint.ME].url, getFetchOptions(SpotifyApi[Endpoint.ME], accessToken))
        .then(spotifyResponse => spotifyResponse.json())
        .then((spotifyResponse) => res.send(spotifyResponse));
};