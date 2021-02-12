import React, {FunctionComponent} from "react";
import Infinite from '../../../svg/infinite.svg';
import classNames from "classnames";
import {selectShouldAnimateGraph} from "../../../selectors/batchedGraphSelector";
import {toggleGraphAnimationAction} from "../../../actions/batchedGraphActions";
import {useDispatch} from "react-redux";

export const AnimationControl: FunctionComponent<{}> = () => {
    const dispatch = useDispatch();
    const shouldAnimate = selectShouldAnimateGraph();

    return (
        <div className="animation-control-wrapper">
            <button
                className={classNames(shouldAnimate ? "active" : "")}
                onClick={() => toggleGraphAnimationAction()(dispatch)}
            >
                <Infinite />
            </button>
        </div>
    )
};