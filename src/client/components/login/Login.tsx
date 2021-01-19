import React from "react";
import Logo from "../../svg/logo-white.svg";
import {DemoGraph} from "./DemoGraph";

const Login = () => (
    <div className="login-container">
        <div className="login-content">
            <div className="login-left">
                <div className="login-cta">
                    <div className="login-logo">
                        <Logo height="128px" width="128px" />
                    </div>
                    <h1>Genre Explorer for Spotify</h1>
                    <p>
                        Genre Explorer uses your playlist and listening data to create a custom visualisation of the musical genres
                        that you listen to on Spotify. Ever wondered what <strong>{getWeirdGenre()}</strong> or <strong>{getWeirdGenre()}</strong> sound like,
                        or why they showed up on your Spotify discover?
                    </p>
                    <p>You'll need to log in with Spotify to get started.</p>
                    <a href={"/spotify/login"} className="login-link">Log in with Spotify</a>
                </div>
            </div>
            <div className="login-demo">
                <DemoGraph />
            </div>
        </div>
        <div className="login-footer">
            <div className="login-footer-content">
                Created by <a href="http://thejamespaterson.com">James Paterson</a> •
                Fork on <a href="https://github.com/jamjar919/spotify-network-explore">Github</a> •
                Not endorsed or supported by <a href="https://www.spotify.com/">Spotify</a>
            </div>
        </div>
    </div>
);

const getWeirdGenre = (): string => {
    const genres = [
        "escape room",
        "microhouse",
        "swirl psych",
        "wonky",
        "vegan straight edge",
        "shimmer pop",
        "nerdcore",
        "martial industrial",
        "lowercase",
        "freakbeat",
        "deep psychobilly",
        "destroy techno",
        "black sludge",
        "brostep",
        "abstracto",
        "gauze pop",
        "jerk",
        "stomp and flutter",
        "shiver pop",
        "skwee",
        "unblack metal"
    ];

    return genres[Math.floor(Math.random() * genres.length)];
};

export default Login;