export class Path {
    public static readonly ROOT = '/';
    public static readonly CLIENTJS = '/client.js';
    public static readonly STYLE = '/style.css';

    public static readonly SignIn = {
        SPOTIFY_SIGN_IN: '/spotify/login',
        SPOTIFY_CALLBACK: '/spotify/callback',
        SPOTIFY_REFRESH_TOKEN: '/spotify/refreshToken'
    };

    public static readonly Spotify = {
        USER: '/spotify/user',
        PLAYLISTS: '/spotify/playlists',
        TRACKS: '/spotify/tracks'
    }
}
