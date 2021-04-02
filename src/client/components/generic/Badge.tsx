import React, {FunctionComponent} from "react";
import classNames from "classnames";

type BadgeProps = {
    color?: string;
    className?: string;
};

export const BadgeRow: FunctionComponent<{}> = ({ children }) => (
    <div className="badgeRow">{children}</div>
);

export const Badge: FunctionComponent<BadgeProps> = ({ color, className, children }) => (
    <span className={classNames("badge", className)} style={{ backgroundColor: color }}>
        {children}
    </span>
);