import Modal from "../../generic/Modal";
import React, {FunctionComponent} from "react";
import Checkbox from "../../generic/Checkbox";
import {selectCurrentTimeUnit, selectShouldAnimateGraph} from "../../../selectors/batchedGraphSelector";
import {useDispatch} from "react-redux";
import {setGraphBatchUnitAction, toggleGraphAnimationAction} from "../../../actions/batchedGraphActions";
import DiscreteSelector from "../../generic/DiscreteSelector";
import {BatchTimeUnit} from "../../../reducers/batchedGraphReducer";

type BatchedGraphSettingsModalProps = {
    visible: boolean,
    onClickClose: () => void
}
const BatchedGraphSettingsModal: FunctionComponent<BatchedGraphSettingsModalProps> = ({ visible, onClickClose }) => {
    const dispatch = useDispatch();
    const shouldAnimate = selectShouldAnimateGraph();
    const timeUnit = selectCurrentTimeUnit();

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
            <DiscreteSelector
                options={[
                    { label: "Day", value: "day" },
                    { label: "Week", value: "week" },
                    { label: "Month", value: "month" },
                    { label: "Year", value: "year" }
                ]}
                currentSelectedOption={timeUnit}
                groupName={"time-unit"}
                groupLabel={"Graph Time Step"}
                onSelectOption={(selectedValue: string) => setGraphBatchUnitAction(selectedValue as BatchTimeUnit)(dispatch)}
            />
        </Modal>
    );
};

export default BatchedGraphSettingsModal;