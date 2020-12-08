import Modal from "../../generic/Modal";
import React, {FunctionComponent} from "react";
import Checkbox from "../../generic/Checkbox";
import {
    selectCurrentTimeUnit,
    selectPlaybackTimeStep,
    selectShouldAnimateGraph
} from "../../../selectors/batchedGraphSelector";
import {useDispatch} from "react-redux";
import {
    setGraphBatchUnitAction,
    setPlaybackTimestepAction,
    toggleGraphAnimationAction
} from "../../../actions/batchedGraphActions";
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
    const playbackTimeStep = selectPlaybackTimeStep();

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
            <DiscreteSelector
                options={[
                    { label: "1ms", value: "1" },
                    { label: "10ms", value: "10" },
                    { label: "100ms", value: "100" },
                    { label: "1s", value: "1000" },
                    { label: "3s", value: "3000" },
                    { label: "5s", value: "5000" },
                    { label: "10s", value: "10000" }
                ]}
                currentSelectedOption={playbackTimeStep.toString()}
                groupName={"playback-speed"}
                groupLabel={"Playback speed"}
                onSelectOption={(selectedValue: string) => setPlaybackTimestepAction(parseInt(selectedValue))(dispatch)}
            />
        </Modal>
    );
};

export default BatchedGraphSettingsModal;