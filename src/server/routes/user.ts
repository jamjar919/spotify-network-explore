import {Request, Response} from "express";
import fetch from "node-fetch";
import {SpotifyApi, Endpoint, getFetchOptions} from "../api/spotifyApi";
import {getAccessTokenFromRequest} from "../util/requestUtil";
import UserObjectPrivate = SpotifyApi.UserObjectPrivate;
import {sendJSON} from "../util/responseUtil";

export const userInformation = (req: Request, res: Response) => {
    const accessToken = getAccessTokenFromRequest(req);

    if (typeof accessToken === "undefined" || accessToken.trim() == "") {
        res.status(500);
        res.send({ error: "User is not logged in" });
    }

    fetch(SpotifyApi[Endpoint.ME].url, getFetchOptions(SpotifyApi[Endpoint.ME], accessToken))
        .then(spotifyResponse => spotifyResponse.json())
        .then((spotifyResponse: UserObjectPrivate) => sendJSON(spotifyResponse, res));
};