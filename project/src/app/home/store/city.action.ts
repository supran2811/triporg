import { City } from './../../models/city.model';

import {Action} from '@ngrx/store';

export const SEARCH_CITIES = "SEARCH_CITIES";
export const SET_RESULT    = "SET_RESULT";

export class SearchCityList implements Action{
    readonly type = SEARCH_CITIES;
    constructor(public payload:string){}
}

export class SetResult implements Action {
    readonly type = SET_RESULT;
    constructor(public payload:City[]){}
}

export type CityActions = SearchCityList|SetResult;