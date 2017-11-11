import {ActionReducerMap} from '@ngrx/store'

import * as fromCity from '../home/store/city.reducer';
import * as fromAuth from '../auth/store/auth.reducer';
export interface AppState{
    cities:fromCity.State,
    auth:fromAuth.State
}

export const globalReducer : ActionReducerMap<AppState> = {
    cities : fromCity.citylistReducer,
    auth:fromAuth.AuthReducer
}