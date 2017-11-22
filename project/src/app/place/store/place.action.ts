

export const GET_PLACE_DETAILS  = "GET_PLACE_DETAILS";
export const SET_PLACE_DETAILS  = "SET_PLACE_DETAILS";
export const SET_PLACE_ID       = "SET_PLACE_ID";
import { Place } from '../../models/place.model';


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

export type PlaceActions = GetPlaceDetails|SetPlaceDetails|SetPlaceId;