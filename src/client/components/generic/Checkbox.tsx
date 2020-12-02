import React, {ChangeEvent, FunctionComponent} from "react";

type CheckboxProps = {
    checked: boolean,
    onChange?: (event: ChangeEvent) => void
    label?: string
}
const Checkbox: FunctionComponent<CheckboxProps> = ({
    checked,
    onChange,
    label
}) => <label className="checkbox">
    <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange && onChange(e)}
    />
    {label}
</label>;

export default Checkbox;