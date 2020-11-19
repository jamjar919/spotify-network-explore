export enum AjaxState {
    EMPTY = "AJAX_EMPTY",
    LOADING = "AJAX_LOADING",
    ERROR = "AJAX_ERROR"
}

export const isSuccessfulFetch = (result: any) => (
    result !== AjaxState.EMPTY &&
    result !== AjaxState.LOADING &&
    result !== AjaxState.ERROR
);

export const isFailedFetch = (result: any) => (
    result === AjaxState.ERROR
);

export const isLoadingOrEmpty = (result: any) => (
    result === AjaxState.LOADING ||
    result === AjaxState.EMPTY
);