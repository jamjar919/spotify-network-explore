import React, {FunctionComponent} from "react";

export const OverlayBase: FunctionComponent<{}>  = ({ children}) => (
    <div className="overlay-base">
        {children}
    </div>
);