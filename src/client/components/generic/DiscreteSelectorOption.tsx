import React, {FunctionComponent} from "react";
import classNames from "classnames";

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
    <label className={classNames("discrete-selector-option", selected ? "selected" : "")}>
        <input
            type="radio"
            value={option.value}
            name={groupName}
            checked={selected}
            onChange={() => onSelect(option.value)}
        />
        <div className="discrete-selector-label">{option.label}</div>
    </label>
);

export default DiscreteSelectorOption;