
import { Place } from '../../models/place.model';
import * as PlaceActions from './place.action';
import * as fromApp from '../../store/app.reducer';

export interface FeatureState extends fromApp.AppState{
    place:State
}

export interface State {
    id:string,
    lat:number,
    lng:number,
    selectedPlace : Place
}

const initialState:State = {
    id:'',
    lat:0,
    lng:0,
    selectedPlace : null
}

export function placeReducer(state=initialState,action:PlaceActions.PlaceActions){

    switch(action.type){
        case PlaceActions.SET_PLACE_DETAILS:{
            return {
                ...state,
                selectedPlace : action.payload
            }
        }
        case PlaceActions.SET_PLACE_ID:{
            return {
                ...state,
                id:action.payload
            }
        }
        case PlaceActions.SET_CITY_LOCATION:{
            return {
                ...state,
                lat:action.payload.lat,
                lng:action.payload.lng
            }
        }
    }

    return state;
}