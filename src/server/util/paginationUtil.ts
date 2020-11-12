import {getFetchOptions, SpotifyEndpoint, urlWithQueryParams} from "../api/spotifyApi";
import fetch from "node-fetch";
import PagingObject = SpotifyApi.PagingObject;

export class PaginationUtil<PagedObject> {
    private static readonly DEFAULT_LIMIT = 500;
    private static readonly DEFAULT_MAX_PER_REQUEST = 50;

    private readonly api: SpotifyEndpoint;
    private readonly accessToken: string;
    private readonly totalLimit: number;
    private readonly maxPerRequest: number;

    constructor(
        api: SpotifyEndpoint,
        accessToken: string,
        options: {
            totalLimit?: number,
            maxPerRequest?: number,
        } = {}
    ) {
        this.api = api;
        this.accessToken = accessToken;
        this.totalLimit = options.totalLimit || PaginationUtil.DEFAULT_LIMIT;
        this.maxPerRequest = options.maxPerRequest || PaginationUtil.DEFAULT_MAX_PER_REQUEST;
    }

    public getAll = (): Promise<PagedObject[]> => this.recursivelyPaginateApi(0, []);

    private recursivelyPaginateApi = (
        offset: number,
        currentItems: any[]
    ): Promise<any> => {
        return this.callApi(offset)
            .then((result: PagingObject<PagedObject>) => {
                const items: PagedObject[] = currentItems.concat(result.items);
                if (items.length < this.totalLimit && result.next !== null) {
                    return this.recursivelyPaginateApi(
                        offset + this.maxPerRequest,
                        items
                    )
                }
                return items;
            });
    };

    private callApi = (offset: number): Promise<PagingObject<PagedObject>> => {
        const url = urlWithQueryParams(this.api, {
            offset: offset,
            limit: this.maxPerRequest
        });

        return fetch(url, getFetchOptions(this.api, this.accessToken))
            .then(spotifyResponse => spotifyResponse.json())
    };

}
