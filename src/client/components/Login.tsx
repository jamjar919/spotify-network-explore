import React from "react";

const Login = () => (
    <div className="login-container">
        <div className="login">
            <h1>Spotify Network Explorer</h1>
            <p>This a simple app that shows you a visual representation of your playlists.</p>
            <a href={"/spotify/login"}>Log in with Spotify</a>
        </div>
    </div>
);

export default Login;