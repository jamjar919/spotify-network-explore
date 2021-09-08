import {Request, Response} from "express";
import * as querystring from "querystring";
import fetch from "node-fetch";
import cryptoRandomString from "crypto-random-string";
import {RequestParameter} from "../../common/requestParameter";
import {Cookies} from "../constants/cookies";
import URLSearchParams from 'url-search-params';
import {SpotifyApi, Endpoint, urlWithQueryParams} from "../api/spotifyApi";

import dotenv from "dotenv";
dotenv.config();

const permissionsNeeded = 'user-read-private playlist-read-private user-read-email user-top-read';

const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;
const REDIRECT_URI = `${process.env.URL}/spotify/callback`;

export const login = (_req: Request, res: Response) => {
    const state = cryptoRandomString({length: 16, type: 'base64'});

    res.cookie(Cookies.STATE_KEY, state);
    res.redirect(urlWithQueryParams(
        SpotifyApi[Endpoint.AUTHORISE].url, {
            response_type: 'code',
            client_id: CLIENT_ID,
            redirect_uri: REDIRECT_URI,
            scope: permissionsNeeded,
            state
        }
    ));
};

export const callback = (req: Request, res: Response) => {
    const code = req.query.code as string;
    const state = req.query.state || null;
    const storedState = req.cookies ? req.cookies[Cookies.STATE_KEY] : null;

    if (state === null || state !== storedState) {
        redirectToError(res, "state_mismatch");
        return;
    }
    res.clearCookie(Cookies.STATE_KEY);

    const data = new URLSearchParams();
    data.set("code", code);
    data.set("redirect_uri", REDIRECT_URI);
    data.set("grant_type", "authorization_code");

    fetch(SpotifyApi[Endpoint.TOKEN].url, {
        method: SpotifyApi[Endpoint.TOKEN].method,
        body: data,
        headers: {
            [RequestParameter.CONTENT_TYPE]: SpotifyApi[Endpoint.TOKEN].requestContentType as string,
            ...getAuthorisationHeaderWithSecret()
        }
    })
    .then(res => res.json())
    .then((response: any) => {
        res.cookie(Cookies.ACCESS_TOKEN, response.access_token);
        res.cookie(Cookies.REFRESH_TOKEN, response.refresh_token);
        res.redirect(`/`);
    }).catch(() => {
        redirectToError(res, "invalid_token");
    });
};

export const refreshToken = (req: Request, res: Response) => {
    const refresh_token = req.query.refresh_token as string;

    const data = new URLSearchParams();
    data.set("refresh_token", refresh_token);
    data.set("grant_type", "refresh_token");

    fetch(SpotifyApi[Endpoint.TOKEN].url, {
        method: SpotifyApi[Endpoint.TOKEN].method,
        headers: {
            [RequestParameter.CONTENT_TYPE]: SpotifyApi[Endpoint.TOKEN].requestContentType as string,
            ...getAuthorisationHeaderWithSecret()
        },
        body: data
    })
    .then(res => res.json())
    .then((response: any) => {
        res.send({ access_token: response.access_token });
    });
};

const getAuthorisationHeaderWithSecret = () => ({
    [RequestParameter.AUTHORISATION]: 'Basic ' + (new Buffer(CLIENT_ID + ':' + CLIENT_SECRET).toString('base64'))
});

const redirectToError = (res: Response, error: string) => {
    const queryString = querystring.stringify({ error });
    res.redirect(`/#${queryString}`);
};
