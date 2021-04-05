import React from "react";
import {RandomGenreButton} from "./RandomGenreButton";

export const NothingSelected = () => {

    return (
        <div className="genre-selector">
            <h2>Nothing Selected</h2>
            <p>Click on a genre to display information about it, or select one below</p>
            <h2>Random: <RandomGenreButton/></h2>
        </div>
    );
};
