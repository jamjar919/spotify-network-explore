import {getFetchOptions, SpotifyEndpoint, urlWithQueryParams} from "../api/spotifyApi";
import fetch from "node-fetch";
import PagingObject = SpotifyApi.PagingObject;
import ErrorObject = SpotifyApi.ErrorObject;

export class PaginationUtil<PagedObject> {
    private static readonly DEFAULT_LIMIT = 500;
    private static readonly DEFAULT_MAX_PER_REQUEST = 50;

    private readonly api: SpotifyEndpoint;
    private readonly accessToken: string;
    private readonly totalLimit: number;
    private readonly maxPerRequest: number;
    private readonly getUrl: (url: string) => string;

    constructor(
        api: SpotifyEndpoint,
        accessToken: string,
        options: {
            totalLimit?: number,
            maxPerRequest?: number,
            getUrl?: (url: string) => string
        } = {}
    ) {
        this.api = api;
        this.accessToken = accessToken;
        this.totalLimit = options.totalLimit || PaginationUtil.DEFAULT_LIMIT;
        this.maxPerRequest = options.maxPerRequest || PaginationUtil.DEFAULT_MAX_PER_REQUEST;
        this.getUrl = options.getUrl || ((url: string) => url);
    }

    public getAll = (): Promise<PagedObject[]> => this.recursivelyPaginateApi(0, []);

    private recursivelyPaginateApi = (
        offset: number,
        currentItems: any[]
    ): Promise<PagedObject[]> => {
        return this.callApi(offset)
            .then((result: PagingObject<PagedObject> |  { error: ErrorObject }) => {
                if (result.hasOwnProperty("error")) {
                    const errorWrapper = result as { error: ErrorObject };
                    console.error(errorWrapper.error);
                    throw new Error(errorWrapper.error.message);
                }

                const pagedResult = result as PagingObject<PagedObject>;

                const items: PagedObject[] = currentItems.concat(pagedResult.items);
                if (items.length < this.totalLimit && pagedResult.next !== null) {
                    return this.recursivelyPaginateApi(
                        offset + this.maxPerRequest,
                        items
                    )
                }
                return items;
            })
    };

    private callApi = (offset: number): Promise<PagingObject<PagedObject>> => {
        const url = urlWithQueryParams(this.getUrl(this.api.url), {
            offset: offset,
            limit: this.maxPerRequest
        });

        console.log(url);

        return fetch(url, getFetchOptions(this.api, this.accessToken))
            .then(spotifyResponse => spotifyResponse.json())
    };

}
