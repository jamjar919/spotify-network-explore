import Modal from "./generic/Modal";
import React, {FunctionComponent} from "react";
import Checkbox from "./generic/Checkbox";
import {selectShouldAnimateGraph} from "../selectors/batchedGraphSelector";
import {useDispatch} from "react-redux";
import {toggleGraphAnimation} from "../actions/batchedGraphActions";

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
                label="Animate the graph"
                onChange={() => toggleGraphAnimation()(dispatch)}
            />
        </Modal>
    );
};

export default BatchedGraphSettingsModal;