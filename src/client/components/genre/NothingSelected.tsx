import React from "react";
import {RandomGenreButton} from "./RandomGenreButton";

export const NothingSelected = () => {

    return (
        <div className="genre-selector">
            <h2 className="genre-title">
                <div>Nothing Selected</div>
                <div className="inline-random-genre-button">
                    <RandomGenreButton/>
                </div>
            </h2>
            <p>Click on a genre to display information about it, or select one below</p>
        </div>
    );
};
