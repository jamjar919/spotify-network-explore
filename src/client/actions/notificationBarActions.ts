import {Action, ActionName} from "./action";
import {NotificationData, NotificationId} from "../reducers/notificationReducer";

export const displayNotificationAction = (id: NotificationId, content: string) => {
    return (dispatch: (action: Action<NotificationData>) => void) => dispatch({
        type: ActionName.DISPLAY_NOTIFICATION,
        payload: { id, content }
    })
};

export const removeNotificationAction = (id: NotificationId) => {
    return (dispatch: (action: Action<NotificationId>) => void) => dispatch({
        type: ActionName.REMOVE_NOTIFICATION,
        payload: id
    })
};

export const clearNotificationsAction = () => {
    return (dispatch: (action: Action<void>) => void) => dispatch({
        type: ActionName.CLEAR_NOTIFICATIONS,
    })
};

