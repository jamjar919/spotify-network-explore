import React, {FunctionComponent, useEffect, useState} from "react";
import classNames from "classnames";

const DEFAULT_TIME_LENGTH = 2000;
const ANIMATION_LENGTH = 1000;

type NotificationProps = {
    content: string
}
const Notification: FunctionComponent<NotificationProps> = ({ content }) => {
    const [show, setShow] = useState(0);

    useEffect(() => {
        setShow(0);
        const ids = [
            setTimeout(() => {
                setShow(1);
            }, DEFAULT_TIME_LENGTH),
            setTimeout(() => {
                setShow(2);
            }, DEFAULT_TIME_LENGTH + ANIMATION_LENGTH)
        ];

        return () => ids.forEach((id) => clearTimeout(id));
    }, [content]);

    let classToAdd = "";
    switch(show) {
        case 1:
            classToAdd = "hiding-notification";
            break;
        case 2:
            classToAdd = "hidden-notification";
            break;
    }

    return (
        <div className={classNames("notification", classToAdd)}>
            {content}
        </div>
    )
};

export default Notification;