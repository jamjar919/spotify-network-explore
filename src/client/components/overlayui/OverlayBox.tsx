import React, {FunctionComponent} from "react";

type OverlayBoxProps = {
    className?: string;
}

export const OverlayBox: FunctionComponent<OverlayBoxProps>  = ({ className, children}) => (
    <div className={`overlay-box ${className ? className : ""}`}>
        {children}
    </div>
);