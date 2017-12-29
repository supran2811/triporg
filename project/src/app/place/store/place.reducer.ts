
import { Place } from '../../models/place.model';
import * as PlaceActions from './place.action';
import * as fromApp from '../../store/app.reducer';
import { City } from '../../models/city.model';
import { getInitialState } from '../../shared/cache.state.service';
export interface FeatureState extends fromApp.AppState{
    place:State
}

export interface State{
    city:City,
    selectedPlace : Place,
    isHover:boolean
}

const initialState:State = getInitialState('place') || {
    city:null,
    selectedPlace : null,
    isHover:false

}

export function placeReducer(state=initialState,action:PlaceActions.PlaceActions){

    switch(action.type){
        case PlaceActions.SET_PLACE_DETAILS:{
            return {
                ...state,
                selectedPlace : action.payload.place,
                isHover:action.payload.isHover
            }
        }
        case PlaceActions.SET_CITY:{
            console.log("Setting city state ",action.payload);
            return {
                ...state,
                city:action.payload
            }
        }
        case PlaceActions.SET_CITY_LOCATION:{

            const city = state.city;

            let newCity = new City(city.id,city.name,action.payload.lat , action.payload.lng);

            return {
                ...state,
                city:newCity
            }
        }
        case PlaceActions.SAVE_SELECTED_PLACE:{
            let newSavedPlaces = [ ...state.city.savedPlaces];
            newSavedPlaces.push({...state.selectedPlace});

            const updatedCity = {...state.city , savedPlaces:newSavedPlaces}    
            console.log("[PlaceReducer]","Added new place ",updatedCity);
            return {
                ...state,
                city:updatedCity
            }
        }
        case PlaceActions.REMOVE_SELECTED_PLACE:{
            let updatedSavedPlaces = [ ...state.city.savedPlaces];

            let index = updatedSavedPlaces.findIndex((place) => {
                return state.selectedPlace.placeId == place.placeId;
            } )

            updatedSavedPlaces.splice(index,1);
            const updatedCity = {...state.city , savedPlaces:updatedSavedPlaces}

            return {
                ...state,
                city:updatedCity
            }
        }
        case PlaceActions.RESET_SELECTED_PLACE:{
            return {
                ...state,
                selectedPlace:null
            }
        }
        case PlaceActions.ADD_SAVED_PLACED_TO_STATE:{

            const updatedCity = {...state.city , savedPlaces:action.payload};
            

            return {
                ...state,
                city:updatedCity
            }
        }
        case PlaceActions.RESET_STATE:{
            console.log("Coming here in reset state...");
            return {
                city:null,
                selectedPlace : null
            }
        }
    }

    return state;
}