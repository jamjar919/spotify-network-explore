import React, {FunctionComponent} from "react";
import Notification from "./Notification";
import {selectNotifications} from "../../selectors/notificationSelector";
import useNotificationGenerator from "../../hooks/useNotificationGenerator";
import { v4 as uuidv4 } from 'uuid';

const NotificationsBar: FunctionComponent<{}> = () => {
    // Listen to events
    useNotificationGenerator();

    const notifications = selectNotifications();

    return (
        <div className="notifications-bar">
            {
                notifications.map((notification) =>
                    <Notification
                        key={uuidv4()}
                        content={notification.content}
                    />
                )
            }
        </div>
    );
};

export default NotificationsBar;