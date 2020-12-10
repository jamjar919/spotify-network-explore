import React, {FunctionComponent} from "react";
import Notification from "./Notification";
import {selectNotifications} from "../../selectors/notificationSelector";
import useNotificationGenerator from "../../hooks/useNotificationGenerator";

const NotificationsBar: FunctionComponent<{}> = () => {
    // Listen to events
    useNotificationGenerator();

    const notifications = selectNotifications();

    return (
        <div className="notifications-bar">
            {
                notifications.map((notification) =>
                    <Notification content={notification.content}/>
                )
            }
        </div>
    );
};

export default NotificationsBar;