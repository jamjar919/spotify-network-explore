import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import {root, clientJavascript, style} from "./routes/root";
import {callback, login, refreshToken} from "./routes/spotifyLogin";
import {userInformation} from "./routes/user";
import {Path} from "../common/path";
import {playlistList} from "./routes/playlist";
import {tracks} from "./routes/tracks";

dotenv.config();
const app = express();
const port = process.env.PORT || 80;

app.use(express.static('public'))
    .use(cookieParser())
    .use(express.json());

// React
app.get(Path.ROOT, root);
app.get(Path.CLIENTJS, clientJavascript);
app.get(Path.STYLE, style);

// Spotify sign in
app.get(Path.SignIn.SPOTIFY_SIGN_IN, login);
app.get(Path.SignIn.SPOTIFY_CALLBACK, callback);
app.get(Path.SignIn.SPOTIFY_REFRESH_TOKEN, refreshToken);

// Spotify API
app.get(Path.Spotify.USER, userInformation);
app.get(Path.Spotify.PLAYLISTS, playlistList);
app.post(Path.Spotify.TRACKS, tracks);

app.listen(port, () => {
    console.log(`Active on port ${port}!`)
});