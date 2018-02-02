
import { ElementRef } from '@angular/core';


import { Place } from '../../models/place.model';
import { City } from '../../models/city.model';


export const SET_PLACE_DETAILS                                  = "SET_PLACE_DETAILS";
export const SET_CITY                                           = "SET_CITY";
export const SET_CITY_LOCATION                                  = "SET_CITY_LOCATION"
export const GET_CITY_LOCATION                                  = "GET_CITY_LOCATION";
export const GET_CITY_DETAILS                                   = "GET_CITY_DETAILS";
export const SET_CITY_DETAILS                                   = "SET_CITY_DETAILS";
export const GET_PLACE_DETAILS                                  = "GET_PLACE_DETAILS";
export const SAVE_SELECTED_PLACE                                = "SAVE_SELECTED_PLACE";
export const SAVE_PLACE                                         = "SAVE_PLACE";
export const ADD_PLACE_CHANGE_LISTENER                          = "ADD_PLACE_CHANGE_LISTENER";
export const RESET_SELECTED_PLACE                               = "RESET_SELECTED_PLACE";
export const REMOVE_SELECTED_PLACE                              = "REMOVE_SELECTED_PLACE";
export const REMOVE_PLACE                                       = "REMOVE_PLACE"

export const START_SAVING_PLACE_TO_SERVER                       = "START_SAVING_PLACE_TO_SERVER";
export const SAVE_SELECTED_PLACE_TO_SERVER                      = "SAVE_SELECTED_PLACE_TO_SERVER";


export const START_REMOVING_PLACE_FROM_SERVER                   = "START_REMOVING_PLACE_FROM_SERVER";
export const REMOVE_SELECTED_PLACE_FROM_SERVER                  = "REMOVE_SELECTED_PLACE_FROM_SERVER";



export const GET_SAVED_PLACES_FROM_SERVER_BY_CITY               = "GET_SAVED_PLACES_FROM_SERVER_BY_CITY";
export const ADD_SAVED_PLACED_TO_STATE                          = "ADD_SAVED_PLACED_TO_STATE";
export const SET_PLACE_TO_NAVIGATE                              = "SET_PLACE_TO_NAVIGATE";
export const RESET_PLACE_TO_NAVIGATE                            = "RESET_PLACE_TO_NAVIGATE";

export const START_LOADING_CITY                                 = "START_LOADING_CITY";
export const START_LOADING_PINS                                 = "START_LOADING_PINS";
export const START_LOADING_PLACE                                 = "START_LOADING_PLACE";

export const RESET_STATE = "RESET_STATE";


export class SetCity{
    readonly type = SET_CITY;
    public constructor(public payload:City){}
}

export class SetPlaceDetails {
    readonly type = SET_PLACE_DETAILS;
    public constructor(public payload:{place:Place , isHover:boolean}){}
}

export class GetCityDetails {
    readonly type = GET_CITY_DETAILS;
    public constructor(public payload:{id:string,map:any}){}
}


export class GetCityLocation {
    readonly type = GET_CITY_LOCATION;
    public constructor(public payload:string){}
}

export class SetCityLocation {
    readonly type  = SET_CITY_LOCATION;
    public constructor(public payload:{lat:number,lng:number}){}
}

export class AddPlaceChangeListener {
    readonly type = ADD_PLACE_CHANGE_LISTENER;
    public constructor(public payload:{input:ElementRef,boundary:google.maps.LatLngBounds}){}
}

export class SaveSelectedPlace {
    readonly type = SAVE_SELECTED_PLACE;
}

export class RemoveSelectedPlace {
    readonly type = REMOVE_SELECTED_PLACE;
}

export class SavePlace {
    readonly type = SAVE_PLACE;
    public constructor(public payload:{city:City,place:Place}){}
}

export class RemovePlace {
    readonly type = REMOVE_PLACE;
    public constructor(public payload:{city:City,place:Place}){}
}

export class ResetSelectedPlace {
    readonly type = RESET_SELECTED_PLACE;
}

export class ResetState {
    readonly type = RESET_STATE;
}

export class SaveSelectedPlaceToServer {
    readonly type = SAVE_SELECTED_PLACE_TO_SERVER;
}

export class RemoveSelectedPlaceFromServer {
    readonly type = REMOVE_SELECTED_PLACE_FROM_SERVER;
}

export class GetSavedPlacesFrmServerByCity {
    readonly type = GET_SAVED_PLACES_FROM_SERVER_BY_CITY;
}

export class AddSavedPlacedToState{
    readonly type = ADD_SAVED_PLACED_TO_STATE;
    public constructor(public payload:Place[]){}
}

export class SetPlaceToNavigate {
    readonly type = SET_PLACE_TO_NAVIGATE;
    public constructor(public payload:Place){}
}

export class ResetPlaceToNavigate {
    readonly type = RESET_PLACE_TO_NAVIGATE;
}

export class GetPlaceDetails {
    readonly type = GET_PLACE_DETAILS;
    public constructor(public payload:{id:string,map:any}){}
}

export class StartLoadingCity {
    readonly type = START_LOADING_CITY;
}

export class StartLoadingPlace {
    readonly type = START_LOADING_PLACE;
}

export class StartLoadingPins {
    readonly type = START_LOADING_PINS;
}

export class StartSavingPlaceToServer {
    readonly type = START_SAVING_PLACE_TO_SERVER;
}

export class StartRemovingPlaceFromServer {
    readonly type = START_REMOVING_PLACE_FROM_SERVER;
}

export type PlaceActions = GetCityDetails|
                            SetPlaceDetails|
                            SetCity|
                            AddPlaceChangeListener|
                            SaveSelectedPlace|
                            RemoveSelectedPlace|
                            ResetSelectedPlace|
                            SaveSelectedPlaceToServer|
                            SetCityLocation|
                            ResetState|
                            RemoveSelectedPlaceFromServer|
                            GetSavedPlacesFrmServerByCity|
                            AddSavedPlacedToState|
                            SetPlaceToNavigate|
                            ResetPlaceToNavigate|
                            GetPlaceDetails|
                            SavePlace|
                            RemovePlace|
                            StartLoadingCity|
                            StartLoadingPins|
                            StartLoadingPlace|
                            StartSavingPlaceToServer|
                            StartRemovingPlaceFromServer;