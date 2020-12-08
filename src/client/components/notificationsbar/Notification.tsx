import React, {FunctionComponent} from "react";

type NotificationProps = {
    content: string
}
const Notification: FunctionComponent<NotificationProps> = ({ content }) => {
    return (<div className="notification">{content}</div>)
};

export default Notification;