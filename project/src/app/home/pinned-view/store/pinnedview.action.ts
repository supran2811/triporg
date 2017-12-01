import { Action } from '@ngrx/store';

import { City } from '../../../models/city.model';

export const GET_PINNED_CITIES_FROM_SERVER = "GET_PINNED_CITIES_FROM_SERVER";
export const SET_PINNED_CITIES = "SET_PINNED_CITIES";
export const ADD_SELECTED_PINNED_CITY = "ADD_SELECTED_PINNED_CITY";
export const REMOVE_SELECTED_PINNED_CITY = "REMOVE_SELECTED_PINNED_CITY";
export const REMOVE_PINNED_CITY_FROM_SERVER = "REMOVE_PINNED_CITIES_FROM_SERVER";

export class GetPinnedCitiesFromServer{
    readonly type = GET_PINNED_CITIES_FROM_SERVER
}

export class RemovePinnedCityFromServer{
    readonly type = REMOVE_PINNED_CITY_FROM_SERVER
}

export class SetPinnedCities {
    readonly type  = SET_PINNED_CITIES;
    public constructor(public payload:City[]){}
}

export class AddSelectedPinnedCity {
    readonly type = ADD_SELECTED_PINNED_CITY;
}

export class RemoveSelectedPinnedCity {
    readonly type = REMOVE_SELECTED_PINNED_CITY;
}

export type PinnedViewActions = GetPinnedCitiesFromServer|
                                RemovePinnedCityFromServer|
                                    SetPinnedCities|
                                    AddSelectedPinnedCity|
                                    RemoveSelectedPinnedCity;