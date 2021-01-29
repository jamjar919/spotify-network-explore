import React, {FunctionComponent} from "react";
import {selectSelectedGenre, selectSelectedNodeInformation} from "../../selectors/batchedGraphSelector";

const NothingSelected = () => (
    <div className="genre-selector">
        <h2>Nothing Selected</h2>
        <p>Click on a genre to display information about it</p>
    </div>
);

export const GenreSelector: FunctionComponent<{}> = () => {
    const selectedGenre = selectSelectedGenre();
    const selected =
        selectSelectedNodeInformation(selectedGenre);

    if (selected === null) {
        return <NothingSelected />
    }

    console.log(selectedGenre, selected);

    return (
        <div className="genre-selector">
            {selectedGenre}
            {JSON.stringify(selected)}
        </div>
    );
};