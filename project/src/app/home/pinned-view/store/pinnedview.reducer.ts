import { City } from '../../../models/city.model';

import * as PinnedViewActions from './pinnedview.action';
import { Place } from '../../../models/place.model';
import { ErrorModel } from '../../../models/error.model';


export interface State {
    cities:City[],
    selectedCity : City,
    loading:boolean,
    error:ErrorModel
}

const initialState:State = {
    cities : [],
    selectedCity:null,
    loading:false,
    error:null

}

export function pinnedViewReducer (state=initialState , action:PinnedViewActions.PinnedViewActions){

    switch(action.type){
        case PinnedViewActions.SET_PINNED_CITIES:{
            return {
                ...state,
                cities:[...action.payload],
                loading:false,
                error:null
            }
        }
        case PinnedViewActions.START_LOADING_PINS_PINNED_VIEW:{
            return {
                ...state,
                loading:true,
                error:null
            }
        }
        case PinnedViewActions.SET_ERROR_LOADING_PINS:{
            return {
                ...state,
                error: {...action.payload}
            }
        }
        case PinnedViewActions.SET_SELECTED_PINNED_CITY:{
            return {
                ...state,
                selectedCity:{...action.payload}
            }
        }
        case PinnedViewActions.ADD_SELECTED_PINNED_CITY:{

            const index = state.cities.findIndex((city:City) => {
                return state.selectedCity.id === city.id;
            }) ;

            if(index < 0){
                const selectedCity = {...state.selectedCity}; 
                const updatedCities = [...state.cities,selectedCity];
                return {
                    ...state,
                    cities:updatedCities
                }
            }
            else{
                 return state;
            }
        }
        case PinnedViewActions.REMOVE_SELECTED_PINNED_CITY:{
            const index = state.cities.findIndex((city:City) => {
                return state.selectedCity.id === city.id;
            }) ;

            if(index >= 0){

                const updatedCities = [...state.cities];
                updatedCities.splice(index,1);
                return {
                    ...state,
                    cities:updatedCities
                }
            }
            else{
                return state;
            }
        }
        case PinnedViewActions.UPDATE_SELECTED_PINNED_CITY:{
            
            const index = state.cities.findIndex((city:City) => {
                return action.payload.id === city.id;
            })

            if(index < 0){
                return state;
            }

            let updatedCities = [...state.cities];

            updatedCities[index] = action.payload;


            return {
                ...state,
                cities:updatedCities,
                selectedCity:action.payload
            }
        }
        case PinnedViewActions.ADD_PLACE_TO_SELECTED_PINNED_CITY:{
            if(state.selectedCity != null){
                const index = state.cities.findIndex((city:City) => ( state.selectedCity.id === city.id ));
                
                const updatedCity = {...state.selectedCity};
                updatedCity.savedPlaces = state.selectedCity.savedPlaces ? state.selectedCity.savedPlaces.concat(action.payload):[action.payload];
                
                const updatedCities = [...state.cities];
                if(index >= 0){
                 updatedCities[index] = updatedCity;
                }
                else{
                    updatedCities.push(state.selectedCity);
                }

                return {
                    ...state,
                    cities:updatedCities,
                    selectedCity:updatedCity
                }
                

            }
            return state;
        }
        case PinnedViewActions.REMOVE_PLACE_FROM_SELECTED_PINNED_CITY:{
            if(state.selectedCity != null && state.selectedCity.savedPlaces != null){
                const index = state.cities.findIndex((city:City) => ( state.selectedCity.id === city.id ));
                
                const updatedCity = {...state.selectedCity};
                
                updatedCity.savedPlaces = state.selectedCity.savedPlaces.filter( (place:Place) => (place.placeId !== action.payload.placeId) );
                
                const updatedCities = [...state.cities];
                
                   

                if(index >= 0){
                 updatedCities[index] = updatedCity;
                }
                
                return {
                    ...state,
                    cities:updatedCities,
                    selectedCity:updatedCity
                }
                

            }
            return state;
        }
        case PinnedViewActions.RESET_SELECTED_PINNED_CITY:{
            return {
                ...state,
                selectedCity:null
            }
        }   
        case PinnedViewActions.RESET_PINNED_STATE:{
            return {
                ...state,
                cities : [],
                selectedCity:null,
                error:null
            }
        }   
    }

    return state;
}