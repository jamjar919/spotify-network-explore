import React, {FunctionComponent} from "react";

export const OverlayBox: FunctionComponent<{}>  = ({ children}) => (
    <div className="overlay-box">
        {children}
    </div>
);