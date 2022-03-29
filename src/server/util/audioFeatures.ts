import {Endpoint, SpotifyApi, urlWithQueryParams} from "../api/spotifyApi";
import {fetchWithRetry} from "./fetchWithRetryUtil";
import PlaylistTrackObject = SpotifyApi.PlaylistTrackObject;
import AudioFeaturesResponse = SpotifyApi.AudioFeaturesResponse;
import {partition} from "./partitionUtil";
import AudioFeaturesObject = SpotifyApi.AudioFeaturesObject;

const MAX_TRACKS_PER_REQUEST = 100;
export const getAudioFeaturesForTracks = (
    tracks: PlaylistTrackObject[],
    accessToken: string
): Promise<{[trackId: string]: AudioFeaturesObject }>  => {
    const trackIds = tracks.map(track => track?.track?.id)
        .filter(track => track);

    const partitions = partition<string>(
        trackIds,
        MAX_TRACKS_PER_REQUEST
    );

    // Create requests
    const requests = partitions.map(partition => {
        const url = urlWithQueryParams(SpotifyApi[Endpoint.AUDIO_FEATURES].url, {
            ids: partition.join(',')
        });

        return fetchWithRetry<AudioFeaturesResponse>(
            url,
            SpotifyApi[Endpoint.AUDIO_FEATURES],
            accessToken
        );
    });

    return Promise.all(requests)
        .then(requests => {
            const audioFeatures = requests
                .flatMap((response: any) => response.audio_features);

            const featureMap = {} as { [trackId: string]: AudioFeaturesResponse };
            audioFeatures.forEach((feature: AudioFeaturesObject) => {
                if (feature) {
                    featureMap[feature.id] = feature;
                } else {
                    console.info("Null or undefined feature from API", feature)
                }
            });

            return featureMap
        });
};

