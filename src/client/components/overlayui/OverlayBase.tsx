import React, {FunctionComponent} from "react";
import Logo from "../../svg/logo-white.svg";


export const OverlayBase: FunctionComponent<{}>  = ({ children}) => {
    return (
        <div className="overlay-base">
            <div className="overlay-header">
                <Logo className="overlay-logo" height="45px" width="45px" />
                <div className="overlay-header-text">
                    <h1>Genre Explorer</h1>
                    <span>for Spotify</span>
                </div>
            </div>
            <div>
                {children}
            </div>
        </div>
    );
};