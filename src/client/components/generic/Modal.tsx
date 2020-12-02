import React, {FunctionComponent, ReactNode} from "react";
import classNames from "classnames";

type ModalProps = {
    visible: boolean;
    onClickClose: () => void,
    title: ReactNode
};

const Modal: FunctionComponent<ModalProps> = ({ title, visible, onClickClose, children }) =>
<aside className={classNames("modal-wrapper", visible ? "visible" : "")}>
    <div className="modal">
        <header className="modal-header">
            <h1 className="modal-title">{title}</h1>
            <div className="modal-close"><button onClick={() => onClickClose()}>x</button></div>
        </header>
        <div className="modal-content">
            {children}
        </div>
    </div>
</aside>;

export default Modal;