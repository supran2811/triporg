
import { Place } from '../../models/place.model';
import * as PlaceActions from './place.action';
import * as fromApp from '../../store/app.reducer';

export interface FeatureState extends fromApp.AppState{
    place:State
}

export interface State {
    id:string
    selectedPlace : Place
}

const initialState:State = {
    id:'',
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
    }

    return state;
}