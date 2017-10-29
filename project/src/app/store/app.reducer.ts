import {ActionReducerMap} from '@ngrx/store'

import * as fromCity from '../home/store/city.reducer';

export interface AppState{
    cities:fromCity.State
}

export const globalReducer : ActionReducerMap<AppState> = {
    cities : fromCity.citylistReducer
}