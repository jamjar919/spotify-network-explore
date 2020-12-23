import {Method} from "../../common/method";
import {ContentType} from "../../common/contentType";
import * as querystring from "querystring";
import {RequestParameter} from "../../common/requestParameter";

export const enum Endpoint {
    AUTHORISE = 'authorise',
    TOKEN = 'token',
    ME = 'me',
    PLAYLIST_LIST = 'playlist_list',
    PLAYLIST_TRACKS = 'playlist_tracks',
    AFFINITY_ARTISTS = 'affinity_artists',
    AFFINITY_TRACKS = 'affinity_tracks'
}

export const SpotifyApi: {[key: string]: SpotifyEndpoint} = {
    [Endpoint.AUTHORISE]: {
        url: 'https://accounts.spotify.com/authorize',
        method: Method.GET,
    },
    [Endpoint.TOKEN]: {
        url: 'https://accounts.spotify.com/api/token',
        method: Method.POST,
        requestContentType: ContentType.FORM
    },
    [Endpoint.ME]: {
        url: 'https://api.spotify.com/v1/me',
        method: Method.GET,
        requiresAuth: true
    },
    [Endpoint.PLAYLIST_LIST]: {
        url: 'https://api.spotify.com/v1/me/playlists',
        method: Method.GET,
        requiresAuth: true
    },[Endpoint.PLAYLIST_TRACKS]: {
        url: 'https://api.spotify.com/v1/playlists',
        method: Method.GET,
        requiresAuth: true
    },[Endpoint.AFFINITY_ARTISTS]: {
        url: 'https://api.spotify.com/v1/me/top/artists',
        method: Method.GET,
        requiresAuth: true
    },[Endpoint.AFFINITY_TRACKS]: {
        url: 'https://api.spotify.com/v1/me/top/tracks',
        method: Method.GET,
        requiresAuth: true
    }
};

export const getFetchOptions = (
    apiEndpoint: SpotifyEndpoint,
    authToken?: string,
    body?: any
) => {
    const options: any = {
        method: apiEndpoint.method,
        body,
        headers: {}
    };

    if (apiEndpoint.requiresAuth) {
        options.headers[RequestParameter.AUTHORISATION] = `Bearer ${authToken}`
    }

    if (apiEndpoint.method !== Method.GET && apiEndpoint.requestContentType) {
        options.headers[RequestParameter.CONTENT_TYPE] = apiEndpoint.requestContentType
    }

    return options;
};

export const urlWithQueryParams = (url: string, params: QueryParametersMap) => {
    const queryParams = querystring.encode(params);
    return `${url}?${queryParams}`
};

export type SpotifyEndpoint = {
    url: string,
    method: Method,
    requiresAuth?: boolean,
    requestContentType?: ContentType
};

type QueryParametersMap = {
    [key: string]: any
}