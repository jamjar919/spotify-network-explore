import React from "react";

export const StatelessLoader = () => (
    <div className="loading-container">
        <div className="loading">
            <div className="loading-spinner">
                <img src={"/images/spotify-excited.gif"} alt="Loaded!" />
            </div>
        </div>
    </div>
);