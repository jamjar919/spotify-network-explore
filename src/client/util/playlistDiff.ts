import PlaylistTrackObject = SpotifyApi.PlaylistTrackObject;

type PlaylistDiff = {
    common: PlaylistTrackObject[],
    diff: PlaylistTrackObject[]
};
export const playlistDiff =
    (a: PlaylistTrackObject[], b: PlaylistTrackObject[]): PlaylistDiff => {

    const diff: PlaylistDiff = {
        common: [],
        diff: []
    };

    a.forEach((track) => {
        let match = false;
        b.forEach((otherTrack) => {
            if (track.track.id === otherTrack.track.id) {
                match = true;
                diff.common.push(track);
            }
        });
        if (!match) {
            diff.diff.push(track);
        }
    });

    return diff;
};