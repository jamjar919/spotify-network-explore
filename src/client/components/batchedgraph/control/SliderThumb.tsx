import React, {FunctionComponent} from "react";
import classNames from "classnames";
import {ValueLabelProps} from "@material-ui/core";

const SliderThumb: FunctionComponent<ValueLabelProps> = (props) => (
    <div
        className={classNames(props.className, "slider-thumb-wrapper")}
        {...props.children.props}
    >
        <div className="slider-thumb">
            <span className="slider-thumb-content">{props.value}</span>
        </div>
    </div>
);



export default SliderThumb;