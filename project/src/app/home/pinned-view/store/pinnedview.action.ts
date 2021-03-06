import { Action } from '@ngrx/store';

import { City } from '../../../models/city.model';
import { Place } from '../../../models/place.model';
import { ErrorModel } from '../../../models/error.model';

export const GET_PINNED_CITIES_FROM_SERVER          = "GET_PINNED_CITIES_FROM_SERVER";
export const SET_PINNED_CITIES                      = "SET_PINNED_CITIES";
export const ADD_SELECTED_PINNED_CITY               = "ADD_SELECTED_PINNED_CITY";
export const REMOVE_SELECTED_PINNED_CITY            = "REMOVE_SELECTED_PINNED_CITY";
export const UPDATE_SELECTED_PINNED_CITY            = "UPDATE_SELECTED_PINNED_CITY";
export const ADD_PLACE_TO_SELECTED_PINNED_CITY      = "ADD_PLACE_TO_SELECTED_PINNED_CITY";
export const REMOVE_PLACE_FROM_SELECTED_PINNED_CITY = "REMOVE_PLACE_FROM_SELECTED_PINNED_CITY";
export const SET_SELECTED_PINNED_CITY               = "SET_SELECTED_PINNED_CITY";
export const REMOVE_PINNED_CITY_FROM_SERVER         = "REMOVE_PINNED_CITIES_FROM_SERVER";
export const RESET_PINNED_STATE                     = "RESET_PINNED_STATE";
export const RESET_SELECTED_PINNED_CITY             = "RESET_SELECTED_PINNED_CITY";
export const START_LOADING_PINS_PINNED_VIEW         = "START_LOADING_PINS_PINNED_VIEW";
export const SET_ERROR_LOADING_PINS                 = "SET_ERROR_LOADING_PINS"

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

export class UpdateSelectedPinnedCity {
    readonly type = UPDATE_SELECTED_PINNED_CITY;
    public constructor(public payload:City){}
}

export class SetSelectedPinnedCity {
    readonly type = SET_SELECTED_PINNED_CITY;
    public constructor(public payload:City){}
}

export class ResetPinnedState {
    readonly type = RESET_PINNED_STATE;
}

export class AddPlaceToSelectedPinnedCity {
    readonly type = ADD_PLACE_TO_SELECTED_PINNED_CITY;
    public constructor(public payload:Place){}
}

export class RemovePlaceFromSelectedPinnedCity {
    readonly type = REMOVE_PLACE_FROM_SELECTED_PINNED_CITY;
    public constructor(public payload:Place){}
}

export class ResetSelectedPinnedCity {
    readonly type = RESET_SELECTED_PINNED_CITY;
}

export class StartLoadingPins {
    readonly type = START_LOADING_PINS_PINNED_VIEW;
}

export class SetErrorInLoadingPins {
    readonly type = SET_ERROR_LOADING_PINS;
    public constructor(public payload:ErrorModel){}
}

export type PinnedViewActions = GetPinnedCitiesFromServer|
                                RemovePinnedCityFromServer|
                                    SetPinnedCities|
                                    AddSelectedPinnedCity|
                                    RemoveSelectedPinnedCity|
                                    UpdateSelectedPinnedCity|
                                    SetSelectedPinnedCity|
                                    ResetPinnedState|
                                    AddPlaceToSelectedPinnedCity|
                                    RemovePlaceFromSelectedPinnedCity|
                                    ResetSelectedPinnedCity|
                                    StartLoadingPins|
                                    SetErrorInLoadingPins;