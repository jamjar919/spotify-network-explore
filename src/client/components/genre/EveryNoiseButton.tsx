import React, {FunctionComponent} from "react";

type EveryNoiseLinkProps = {
    genre: string;
};

const getCompressedGenre = (genre: string) =>
    genre.trim()
        .replace(/[\W_]+/g,"")
        .replace(" ", "");

export const EveryNoiseButton: FunctionComponent<EveryNoiseLinkProps> = ({ genre, children }) => (
    <a href={`https://everynoise.com/engenremap-${getCompressedGenre(genre)}.html`} target="_blank">{children}</a>
);