import {Request, Response} from "express";
import {getAccessTokenFromRequest} from "../util/requestUtil";
import {PaginationUtil} from "../util/paginationUtil";
import {Endpoint, SpotifyApi} from "../api/spotifyApi";
import PlaylistTrackObject = SpotifyApi.PlaylistTrackObject;
import {getArtists} from "../util/artistsUtil";
import ArtistObjectFull = SpotifyApi.ArtistObjectFull;
import {getAudioFeaturesForTracks} from "../util/audioFeatures";

export const tracks = (req: Request, res: Response) => {
    const accessToken = getAccessTokenFromRequest(req);
    const playListIds: string[] = req.body;
    const playlistToTracks: {
        [playlistId: string] : PlaylistTrackObject[]
    } = {};

    const requests = playListIds.map(id => new PaginationUtil<PlaylistTrackObject>(
            SpotifyApi[Endpoint.PLAYLIST_TRACKS],
            accessToken,
        {
                totalLimit: 1000,
                maxPerRequest: 100,
                getUrl: (url) => `${url}/${id}/tracks`
            }
        ).getAll().then((tracks: PlaylistTrackObject[]) => {
            playlistToTracks[id] = tracks;
        })
    );

    Promise.all(requests)
        .then(() => {
            const tracks = Object.values(playlistToTracks)
                .flatMap(array => array);

            // Extract audio features
            getAudioFeaturesForTracks(
                tracks,
                accessToken
            ).then(audioFeatures => {
                Object.keys(playlistToTracks).forEach(playlistId => {
                    playlistToTracks[playlistId] = playlistToTracks[playlistId]
                        .map((track) => {
                            if (track?.track?.id) {
                                return {
                                    ...track,
                                    audioFeatures: audioFeatures[track.track.id]
                                }
                            }

                            return track;
                        })
                });

                console.log("got audiofeatures")

                // Extract unique artists
                const artistIds: string[] = tracks
                    .flatMap(track => track.track.album.artists)
                    .filter(artist => typeof artist !== "undefined")
                    .map(artist => artist.id);

                const uniqueArtistIds = artistIds
                    .filter((v,i) => artistIds.indexOf(v) === i);

                // Missing artist id: 6KvhWUaXr9UGemUf3WSsNL

                getArtists(uniqueArtistIds, accessToken)
                    .then((artists) => {
                        const artistsMap: {
                            [artistId: string]: ArtistObjectFull
                        } = { };

                        artists.forEach(artist => {
                            if (artist) {
                                artistsMap[artist.id] = artist;
                            }
                        });

                        console.log("Sending!")

                        res.send({
                            tracksMap: playlistToTracks,
                            artistsMap
                        });
                    });

            }).catch((err) => {
                console.error(err);
                res.status(500);
                res.send({error: err});
            });
        })
        .catch((err) => {
            console.error(err);
            res.status(500);
            res.send({error: err});
        })
};