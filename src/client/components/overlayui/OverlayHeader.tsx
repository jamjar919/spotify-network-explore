import React, {FunctionComponent} from "react";
import Logo from "../../svg/logo-white.svg";

type OverlayHeaderProps = {
    className?: string;
}

export const OverlayHeader: FunctionComponent<OverlayHeaderProps> = ({ className }) => (
    <div className={`overlay-header ${className ? className : ""}`}>
        <Logo className="overlay-logo" height="45px" width="45px" />
        <div className="overlay-header-text">
            <h1>Genre Explorer</h1>
            <span>for Spotify</span>
        </div>
    </div>
);