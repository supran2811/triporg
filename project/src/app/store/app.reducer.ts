import {ActionReducerMap} from '@ngrx/store'

import * as fromCity from '../home/store/city.reducer';
import * as fromAuth from '../auth/store/auth.reducer';
import * as fromPinnedView from '../home/pinned-view/store/pinnedview.reducer';
export interface AppState{
    cities:fromCity.State,
    auth:fromAuth.State,
    pinnedcities:fromPinnedView.State
}

export const globalReducer : ActionReducerMap<AppState> = {
    cities : fromCity.citylistReducer,
    auth:fromAuth.AuthReducer,
    pinnedcities:fromPinnedView.pinnedViewReducer
}