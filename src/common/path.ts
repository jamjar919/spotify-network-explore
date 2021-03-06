export class Path {
    public static readonly SignIn = {
        SPOTIFY_SIGN_IN: '/spotify/login',
        SPOTIFY_SIGN_OUT: '/spotify/logout',
        SPOTIFY_CALLBACK: '/spotify/callback',
        SPOTIFY_REFRESH_TOKEN: '/spotify/refreshToken'
    };

    public static readonly Spotify = {
        USER: '/spotify/user',
        PLAYLISTS: '/spotify/playlists',
        TRACKS: '/spotify/tracks',
        AFFINITY: '/spotify/affinity'
    }
}
