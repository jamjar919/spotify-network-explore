import {Request, Response} from "express";
import fetch from "node-fetch";
import {SpotifyApi, Endpoint, getFetchOptions, urlWithQueryParams} from "../api/spotifyApi";
import {getAccessTokenFromRequest} from "../util/requestUtil";

const MAX_PER_REQUEST = 50;
const TOTAL_LIMIT = 250; // Actually will be this + MAX_PER_REQUEST, but whatever
const API = SpotifyApi[Endpoint.PLAYLIST_LIST];

export const playlistList = (req: Request, res: Response) => {
    const accessToken = getAccessTokenFromRequest(req);

    recursivelyGetPlaylists(0, accessToken, [])
        .then(result => res.send(result));
};

const recursivelyGetPlaylists = (offset: number, accessToken: string, playlists: any[]): Promise<any> => {
    return getPlaylistsFromApi(offset, accessToken)
        .then(result => {
            const items = playlists.concat(result.items);
            if (items.length < TOTAL_LIMIT && result.next !== null) {
                return recursivelyGetPlaylists(offset + MAX_PER_REQUEST, accessToken, items)
            }
            return items;
        });
};

const getPlaylistsFromApi = (offset: number, accessToken: string): Promise<any> => {
    const url = urlWithQueryParams(API, {
        offset: offset,
        limit: MAX_PER_REQUEST
    });

    return fetch(url, getFetchOptions(API, accessToken))
                .then(spotifyResponse => spotifyResponse.json())
};
