import React from "react";
import Logo from "../svg/logo-white.svg";

const Login = () => (
    <div className="login-container">
        <div className="login-content">
            <div className="login-left">
                <div className="login-cta">
                    <div className="login-logo">
                        <Logo height="128px" width="128px" />
                    </div>
                    <h1>Genre Explorer for Spotify</h1>
                    <p>You'll need to log in with Spotify to get started.</p>
                    <a href={"/spotify/login"} className="login-link">Log in with Spotify</a>
                </div>
            </div>
            <div className="login-demo">
                // demo here
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

export default Login;