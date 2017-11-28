
import { Place } from '../../models/place.model';
import * as PlaceActions from './place.action';
import * as fromApp from '../../store/app.reducer';
import { City } from '../../models/city.model';

export interface FeatureState extends fromApp.AppState{
    place:State
}

export interface State {
    city:City,
    selectedPlace : Place,
    savedPlaces:Place[]
}

const initialState:State = {
    city:null,
    selectedPlace : null,
    savedPlaces:[]
}

export function placeReducer(state=initialState,action:PlaceActions.PlaceActions){

    switch(action.type){
        case PlaceActions.SET_PLACE_DETAILS:{
            return {
                ...state,
                selectedPlace : action.payload
            }
        }
        case PlaceActions.SET_CITY:{
            console.log("Coming here setting city");
            return {
                ...state,
                city:action.payload
            }
        }
        case PlaceActions.SET_CITY_LOCATION:{

            const city = state.city;

            let newCity = new City(city.getId(),city.getName(),action.payload.lat , action.payload.lng);

            return {
                ...state,
                city:newCity
            }
        }
        case PlaceActions.SAVE_SELECTED_PLACE:{
            let savedPlaces = [ ...state.savedPlaces];
            savedPlaces.push(state.selectedPlace);
            return {
                ...state,
                savedPlaces:savedPlaces
            }
        }
        case PlaceActions.REMOVE_SELECTED_PLACE:{
            let savedPlaces = [ ...state.savedPlaces];

            let index = savedPlaces.findIndex((place) => {
                return state.selectedPlace.getPlaceId() == place.getPlaceId();
            } )

            savedPlaces.splice(index,1);

            return {
                ...state,
                savedPlaces:savedPlaces
            }
        }
        case PlaceActions.RESET_SELECTED_PLACE:{
            return {
                ...state,
                selectedPlace:null
            }
        }
        case PlaceActions.RESET_STATE:{
            return {
                ...this.initialState
            }
        }
    }

    return state;
}