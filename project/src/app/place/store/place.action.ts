
import { ElementRef } from '@angular/core';


import { Place } from '../../models/place.model';

export const GET_PLACE_DETAILS  = "GET_PLACE_DETAILS";
export const SET_PLACE_DETAILS  = "SET_PLACE_DETAILS";
export const SET_PLACE_ID       = "SET_PLACE_ID";
export const SET_CITY_LOCATION  = "SET_CITY_LOCATION";
export const GET_CITY_LOCATION  = "GET_CITY_LOCATION";
export const ADD_PLACE_CHANGE_LISTENER  = "ADD_PLACE_CHANGE_LISTENER";




export class GetPlaceDetails {
    readonly type = GET_PLACE_DETAILS;
    public constructor(public payload:{id:string,map:HTMLDivElement}){}
}

export class SetPlaceId{
    readonly type = SET_PLACE_ID;
    public constructor(public payload:string){}
}

export class SetPlaceDetails {
    readonly type = SET_PLACE_DETAILS;
    public constructor(public payload:Place){}
}

export class GetCityLocation {
    readonly type = GET_CITY_LOCATION;
    public constructor(public payload:string){}
}

export class SetCityLocation {
    readonly type = SET_CITY_LOCATION;
    public constructor(public payload:{lat:number,lng:number}){}
}

export class AddPlaceChangeListener {
    readonly type = ADD_PLACE_CHANGE_LISTENER;
    public constructor(public payload:{input:ElementRef,boundary:google.maps.LatLngBounds}){}
}

export type PlaceActions = GetPlaceDetails|SetPlaceDetails|SetPlaceId|SetCityLocation|AddPlaceChangeListener;