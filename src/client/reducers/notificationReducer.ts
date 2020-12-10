import {Action, ActionName} from "../actions/action";

export type NotificationId = string;
export type NotificationData = {
    id: NotificationId,
    content: string
}
export type NotificationState = NotificationData[];

export default (state: NotificationState = [], action: Action<any>): NotificationState => {
    switch(action.type) {
        case ActionName.DISPLAY_NOTIFICATION: {
            const newState = Object.assign([], state);
            newState.push(action.payload as NotificationData);
            return newState;
        }
        case ActionName.REMOVE_NOTIFICATION: {
            const id = action.payload as NotificationId;
            return state.filter((notification) => notification.id !== id);
        }
        case ActionName.CLEAR_NOTIFICATIONS: {
            return [];
        }
    }
    return state;
}