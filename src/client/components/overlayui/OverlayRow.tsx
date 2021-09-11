import React, {FunctionComponent} from "react";
import classNames from "classnames";

type OverlayRowProps = {
    expanded: boolean;
    onClick: () => void;
}

export const OverlayRow: FunctionComponent<OverlayRowProps>  = ({ children, expanded, onClick }) => (
    <div className={classNames("overlay-row", expanded ? "overlay-row-expanded" : "")}>
        {children}
        <div className="overlay-row-expand-control" onClick={onClick}>
            <svg className={classNames("transition", expanded ? "rotate-90" : "rotate-270")} viewBox="0 0 20 20" fill="#000">
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"/>
            </svg>
        </div>
    </div>
);
