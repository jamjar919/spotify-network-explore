import React, {FunctionComponent} from "react";


export const OverlayBase: FunctionComponent<{}>  = ({ children}) => {
    return (
        <div className="overlay-base">
            {children}
        </div>
    );
};