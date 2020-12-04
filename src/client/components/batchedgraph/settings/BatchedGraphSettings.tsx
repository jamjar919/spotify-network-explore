import React, {useState} from "react";
import {FunctionComponent} from "react";
import Cog from "../../../svg/cog.svg";
import BatchedGraphSettingsModal from "./BatchedGraphSettingsModal";

type BatchedGraphSettingsProps = {}
const BatchedGraphSettings: FunctionComponent<BatchedGraphSettingsProps> = () => {
    const [showSettings, setShowSettings] = useState<boolean>(false);

    return (
        <>
            <div className="settings-icon-container">
                <Cog
                    className="settings-icon"
                    onClick={() => setShowSettings(true)}
                />
            </div>
            {showSettings ? <BatchedGraphSettingsModal
                onClickClose={() => setShowSettings(false)}
                visible={showSettings}
            /> : ""}
        </>
    );
};

export default BatchedGraphSettings;