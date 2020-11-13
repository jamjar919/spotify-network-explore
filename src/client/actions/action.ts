export type Action<PayloadType> = {
    type: ActionName,
    payload?: PayloadType
}

export enum ActionName {
    FETCH_PROFILE = "FETCH_PROFILE",
    FETCH_PROFILE_ERROR = "FETCH_PROFILE_ERROR",
    FETCH_PROFILE_SUCCESS = "FETCH_PROFILE_SUCCESS"
}