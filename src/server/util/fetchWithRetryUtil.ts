import fetch from "node-fetch";
import {getFetchOptions, SpotifyEndpoint} from "../api/spotifyApi";

export function fetchWithRetry<T> (
    url: string,
    api: SpotifyEndpoint,
    accessToken: string
): Promise<T> {
    return new Promise((resolve) => {
        fetch(url, getFetchOptions(api, accessToken))
            .then(response => {
                if (response.status === 429) {
                    const retryAfter =
                        Number.parseInt(response.headers.get('retry-after') as string) * 1000
                        + 100;

                    console.log("Retrying after", retryAfter);
                    setTimeout(() => {
                        console.log("Retrying...");
                        resolve(fetchWithRetry(
                            url, api, accessToken
                        ));
                    }, retryAfter);
                }

                resolve(response.json());
            });
    });
}