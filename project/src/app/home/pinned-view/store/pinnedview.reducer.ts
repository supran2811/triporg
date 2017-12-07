import { City } from '../../../models/city.model';

import * as PinnedViewActions from './pinnedview.action';


export interface State {
    cities:City[],
    selectedCity : City
}

const initialState:State = {
    cities : [],
    selectedCity:null
}

export function pinnedViewReducer (state=initialState , action:PinnedViewActions.PinnedViewActions){

    switch(action.type){
        case PinnedViewActions.SET_PINNED_CITIES:{
            return {
                ...state,
                cities:action.payload
            }
        }
        case PinnedViewActions.SET_SELECTED_PINNED_CITY:{
            return {
                ...state,
                selectedCity:action.payload
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
                return state.selectedCity.id === city.id;
            })

            let updatedCities = [...state.cities];

            updatedCities[index] = action.payload;


            return {
                ...state,
                cities:updatedCities,
                selectedCity:action.payload
            }
        }
        case PinnedViewActions.RESET_PINNED_STATE:{
            return {
                cities : [],
                selectedCity:null
            }
        }   
    }

    return state;
}