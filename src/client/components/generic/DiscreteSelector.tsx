import React, {FunctionComponent} from "react";
import DiscreteSelectorOption from "./DiscreteSelectorOption";

type Option = { label: string, value: string }
type DiscreteSelectorProps = {
    options: Option[];
    currentSelectedOption: string;
    groupName: string;
    groupLabel: string;
    onSelectOption: (selectedValue: string) => void
};
const DiscreteSelector: FunctionComponent<DiscreteSelectorProps> = ({
    options,
    currentSelectedOption,
    groupName,
    groupLabel,
    onSelectOption
}) => {
    return (
        <div className="discrete-selector">
            <div className="discrete-selector-group-label">{groupLabel}</div>
            <div className="discrete-selector-options">
                {
                    options.map(option => (
                        <DiscreteSelectorOption
                            key={option.value}
                            option={option}
                            selected={currentSelectedOption === option.value}
                            groupName={groupName}
                            onSelect={onSelectOption}
                        />
                    ))
                }
            </div>
        </div>
    )
};

export default DiscreteSelector;
