import React, {FunctionComponent} from "react";
import classNames from "classnames";

type BadgeProps = {
    color?: string;
    className?: string;
};
export const Badge: FunctionComponent<BadgeProps> = ({ color, className, children }) => (
    <span className={classNames("badge", className)} style={{ backgroundColor: color }}>
        {children}
    </span>
);