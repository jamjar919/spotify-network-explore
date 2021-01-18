import React, {FunctionComponent} from "react";


export const OverlayBase: FunctionComponent<void>  = ({ children}) => {
    return (
        <div className="overlay-base">
            {children}
        </div>
    );
};