import {Request, Response} from "express";
import {SpotifyApi, Endpoint} from "../api/spotifyApi";
import {getAccessTokenFromRequest} from "../util/requestUtil";
import {PaginationUtil} from "../util/paginationUtil";
import PlaylistBaseObject = SpotifyApi.PlaylistBaseObject;

export const playlistList = (req: Request, res: Response) => {
    const accessToken = getAccessTokenFromRequest(req);

    new PaginationUtil<PlaylistBaseObject>(
        SpotifyApi[Endpoint.PLAYLIST_LIST],
        accessToken
    ).getAll().then((playlists: PlaylistBaseObject[]) => res.send(playlists));
};

