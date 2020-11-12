import {PaginationUtil} from "../../../src/server/util/paginationUtil";
import {Endpoint, SpotifyApi} from "../../../src/server/api/spotifyApi";
import fetch from 'node-fetch';

jest.mock('node-fetch');

describe('PaginationUtil', () => {
    const API = SpotifyApi[Endpoint.PLAYLIST_LIST];
    const ACCESS_TOKEN = "abc";
    const EXPECTED_AUTH_TOKEN = "Bearer " + ACCESS_TOKEN;
    const MAX_PER_REQUEST = 5;

    let paginationUtil: PaginationUtil;

    beforeEach(() => {
        paginationUtil = new PaginationUtil(
            API,
            ACCESS_TOKEN,
            {
                maxPerRequest: MAX_PER_REQUEST
            }
        );
    });

    it('Returns no items if no results are returned', (done) => {
        // @ts-ignore
        fetch.mockReturnValue(Promise.resolve({ json: () => ({
                items: [],
                next: null
            })
        }));

        paginationUtil.getAll()
            .then((result) => {
                expect(result).toStrictEqual([]);
                done();
            })
    });

    it('Returns the requested items in one page', (done) => {
        const items = [1, 2, 3, 4, 5];

        // @ts-ignore
        fetch.mockReturnValue(Promise.resolve({ json: () => ({
                items,
                next: null
            })
        }));

        paginationUtil.getAll()
            .then((result) => {
                expect(result).toStrictEqual(items);

                expect(fetch).toHaveBeenCalledWith(`${API.url}?offset=0&limit=${MAX_PER_REQUEST}`, {
                    method: 'GET',
                    headers: {
                        "Authorization": EXPECTED_AUTH_TOKEN,
                    }
                });

                done();
            });

    });

    it('Returns the requested items in multiple pages', (done) => {
        const items = [1, 2, 3, 4, 5];
        const itemsTwo = [6, 7, 8, 9, 10];
        const allItems = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

        // @ts-ignore
        fetch.mockReturnValueOnce(Promise.resolve({ json: () => ({
                items,
                next: 'some url'
            })
        })).mockReturnValueOnce(Promise.resolve({ json: () => ({
                items: itemsTwo,
                next: null
            })
        }));

        paginationUtil.getAll()
            .then((result) => {
                expect(result).toStrictEqual(allItems);

                expect(fetch).toHaveBeenCalledWith(`${API.url}?offset=0&limit=${MAX_PER_REQUEST}`, {
                    method: 'GET',
                    headers: {
                        "Authorization": EXPECTED_AUTH_TOKEN,
                    }
                });
                expect(fetch).toHaveBeenCalledWith(`${API.url}?offset=5&limit=${MAX_PER_REQUEST}`, {
                    method: 'GET',
                    headers: {
                        "Authorization": EXPECTED_AUTH_TOKEN,
                    }
                });

                done();
            });
    })
});