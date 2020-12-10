import {useSelector} from "react-redux";
import {State} from "../reducers/rootReducer";

export const selectNotifications = () => useSelector((state: State) => state.notifications);