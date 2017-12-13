import {ActionReducerMap} from '@ngrx/store'

import * as fromAuth from '../auth/store/auth.reducer';
import * as fromPinnedView from '../home/pinned-view/store/pinnedview.reducer';
export interface AppState{
    auth:fromAuth.State,
    pinnedcities:fromPinnedView.State
}

export const globalReducer : ActionReducerMap<AppState> = {
    auth:fromAuth.AuthReducer,
    pinnedcities:fromPinnedView.pinnedViewReducer
}