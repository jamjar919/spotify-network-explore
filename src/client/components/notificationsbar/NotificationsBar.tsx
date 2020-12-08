import React, {FunctionComponent} from "react";
import Notification from "./Notification";

const NotificationsBar: FunctionComponent<{}> = () => {
    return (
        <div className="notifications-bar">
            <Notification content={"example content"}/>
        </div>
    );
};

export default NotificationsBar;