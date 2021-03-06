export type Action<PayloadType> = {
    type: ActionName,
    payload?: PayloadType
}

export enum ActionName {
    FETCH_PROFILE = "FETCH_PROFILE",
    FETCH_PROFILE_ERROR = "FETCH_PROFILE_ERROR",
    FETCH_PROFILE_SUCCESS = "FETCH_PROFILE_SUCCESS",

    FETCH_PLAYLISTS = "FETCH_PLAYLISTS",
    FETCH_PLAYLISTS_ERROR = "FETCH_PLAYLISTS_ERROR",
    FETCH_PLAYLISTS_SUCCESS = "FETCH_PLAYLISTS_SUCCESS",

    FETCH_TRACKS = "FETCH_TRACKS",
    FETCH_TRACKS_ERROR = "FETCH_TRACKS_ERROR",
    FETCH_TRACKS_SUCCESS = "FETCH_TRACKS_SUCCESS",

    SET_GRAPH = "SET_GRAPH",
    SET_BATCH_NUMBER = "SET_BATCH_NUMBER",
    SELECT_NODE = "SELECT_NODE",
    TOGGLE_GRAPH_ANIMATION = "TOGGLE_GRAPH_ANIMATION",
    UPDATE_BATCH_UNIT = "UPDATE_BATCH_UNIT",
    INCREMENT_BATCH_NUMBER = "INCREMENT_BATCH_NUMBER",
    DECREMENT_BATCH_NUMBER = "DECREMENT_BATCH_NUMBER",
    TOGGLE_GRAPH_PLAYBACK = "TOGGLE_GRAPH_PLAYBACK",
    SET_PLAYBACK_TIMESTEP = "SET_PLAYBACK_TIMESTEP",

    DISPLAY_NOTIFICATION = "DISPLAY_NOTIFICATION",
    REMOVE_NOTIFICATION = "REMOVE_NOTIFICATION",
    CLEAR_NOTIFICATIONS = "CLEAR_NOTIFICATIONS"
}