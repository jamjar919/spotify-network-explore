import ArtistObjectFull = SpotifyApi.ArtistObjectFull;
import {SpotifyApi, Endpoint, urlWithQueryParams} from "../api/spotifyApi";
import {fetchWithRetry} from "./fetchWithRetryUtil";
import MultipleArtistsResponse = SpotifyApi.MultipleArtistsResponse;

const MAX_ARTISTS_PER_REQUEST = 50;
export const getArtists = (
    artistIds: string[],
    accessToken: string
): Promise<ArtistObjectFull[]> => {
    // Partition into chunks
    const partitions: Array<string[]> = [];
    let currentPartition: string[] = [];
    for (let i = 0; i < artistIds.length; i += 1) {
        if (currentPartition.length >= MAX_ARTISTS_PER_REQUEST) {
            partitions.push(currentPartition);
            currentPartition = []
        }
        currentPartition.push(artistIds[i]);
    }

    if (currentPartition.length > 0) {
        partitions.push(currentPartition);
    }

    // Create requests
    const requests = partitions.map(partition => {
        const url = urlWithQueryParams(SpotifyApi[Endpoint.ARTISTS].url, {
            ids: partition.join(',')
        });

        return fetchWithRetry<MultipleArtistsResponse>(
            url,
            SpotifyApi[Endpoint.ARTISTS],
            accessToken
        );
    });

    // Flatmap and return
    return Promise.all(requests)
        .then(requests => requests.flatMap(r => r.artists));
};