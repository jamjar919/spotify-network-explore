import Modal from "./generic/Modal";
import React, {FunctionComponent} from "react";
import Checkbox from "./generic/Checkbox";
import {selectShouldAnimateGraph} from "../selectors/batchedGraphSelector";
import {useDispatch} from "react-redux";
import {toggleGraphAnimationAction} from "../actions/batchedGraphActions";

type BatchedGraphSettingsModalProps = {
    visible: boolean,
    onClickClose: () => void
}
const BatchedGraphSettingsModal: FunctionComponent<BatchedGraphSettingsModalProps> = ({ visible, onClickClose }) => {
    const dispatch = useDispatch();
    const shouldAnimate = selectShouldAnimateGraph();

    return (
        <Modal
            visible={visible}
            onClickClose={onClickClose}
            title={"Settings"}
        >
            <Checkbox
                checked={shouldAnimate}
                label="Enable ForceAtlas2 (graph animation)"
                onChange={() => toggleGraphAnimationAction()(dispatch)}
            />
        </Modal>
    );
};

export default BatchedGraphSettingsModal;