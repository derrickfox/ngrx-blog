import { Action } from "@ngrx/store";

export const START_LOADING = '[UI] Start Loading';
export const STOP_LOADING = '[UI] Stop Loading';

export const POST_TWEET = '[UI] Post Tweet';

export class StartLoading implements Action {
    readonly type = START_LOADING
}

export class StopLoading implements Action {
    readonly type = STOP_LOADING
}

export class PostTweet implements Action {
    readonly type = POST_TWEET
}

export type UIActions = StartLoading | StopLoading | PostTweet;