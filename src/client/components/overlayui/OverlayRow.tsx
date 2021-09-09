import React, {FunctionComponent} from "react";

export const OverlayRow: FunctionComponent<{}>  = ({ children}) => (
    <div className="overlay-row">
        {children}
    </div>
);
