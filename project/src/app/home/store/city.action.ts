
import {Action} from '@ngrx/store';

export const GET_CITIES = "GET_CITIES";

export class GetCityList implements Action{
    readonly type = GET_CITIES;
}


export type CityActions = GetCityList;