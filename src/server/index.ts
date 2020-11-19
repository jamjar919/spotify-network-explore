import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import {callback, login, refreshToken} from "./routes/spotifyLogin";
import {userInformation} from "./routes/user";
import {Path} from "../common/path";
import {playlistList} from "./routes/playlist";
import {tracks} from "./routes/tracks";

dotenv.config();

const app = express();
const port = process.env.PORT || 80;

app.use(cookieParser());
app.use(express.json());
app.use(express.static(__dirname + "/public"));
app.use(express.static(__dirname + "/client"));

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