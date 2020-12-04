import React, {FunctionComponent} from "react";

type Option = { label: string, value: string }
type DiscreteSelectorOptionProps = {
    option: Option;
    selected: boolean;
    groupName: string;
    onSelect: (selectedValue: string) => void
}
const DiscreteSelectorOption: FunctionComponent<DiscreteSelectorOptionProps> = ({
    option,
    selected,
    groupName,
    onSelect
}) => (
    <label className="discreet-selector-option">
        <input
            type="radio"
            value={option.value}
            name={groupName}
            checked={selected}
            onChange={() => onSelect(option.value)}
        />
        <span className="discreet-selector-label">{option.label}</span>
    </label>
);

export default DiscreteSelectorOption;