
import { Place } from '../../models/place.model';
import * as PlaceActions from './place.action';
import * as fromApp from '../../store/app.reducer';
import { City } from '../../models/city.model';
import { ErrorModel } from '../../models/error.model';

export interface FeatureState extends fromApp.AppState{
    place:State
}

export interface State{
    city:City,
    selectedPlace : Place,
    isHover:boolean,
    detailsPlace:Place,
    loadingCity : boolean,
    loadingPlace:boolean,
    loadingPins:boolean,
    removingPins:boolean,
    savingPins:boolean,
    error:ErrorModel
}

const initialState:State = {
    city:null,
    selectedPlace : null,
    isHover:false,
    detailsPlace:null,
    loadingCity:false,
    loadingPins:false,
    loadingPlace:false,
    removingPins:false,
    savingPins:false,
    error:null

}

export function placeReducer(state=initialState,action:PlaceActions.PlaceActions){

    switch(action.type){
        case PlaceActions.SET_PLACE_DETAILS:{
            return {
                ...state,
                selectedPlace : {...action.payload.place},
                isHover:action.payload.isHover
            }
        }
        case PlaceActions.SET_CITY:{
            return {
                ...state,
                loadingCity:false,
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
        case PlaceActions.START_SAVING_PLACE_TO_SERVER:{
            return {
                ...state,
                savingPins:true,
                error:null
            }
        }
        case PlaceActions.SAVE_PLACE:{

            if(action.payload.city && state.city && action.payload.city.id === state.city.id){
                
                let newSavedPlaces =state.city.savedPlaces ? [ ...state.city.savedPlaces]:[];
                newSavedPlaces.push({...action.payload.place});

                const updatedCity = {...state.city , savedPlaces:newSavedPlaces}    
                
                return {
                    ...state,
                    city:updatedCity,
                    savingPins:false,
                    error:null
                }
            }
            return {...state,savingPins:false,error:null};

            
        }
        case PlaceActions.START_REMOVING_PLACE_FROM_SERVER:{
            return {
                ...state,
                removingPins:true,
                error:null
            }
        }
        case PlaceActions.REMOVE_PLACE:{
            
            if(action.payload.city && state.city && action.payload.city.id === state.city.id){

            

                let updatedSavedPlaces = [ ...state.city.savedPlaces];

            

                let index = updatedSavedPlaces.findIndex((place) => {
                    return action.payload.place.placeId == place.placeId;
                } )
                if(index >= 0){
                    updatedSavedPlaces.splice(index,1);
                    const updatedCity = {...state.city , savedPlaces:updatedSavedPlaces}

                    return {
                        ...state,
                        city:updatedCity,
                        removingPins:false,
                        error:null
                    }
                }
                else{
                    return {
                        ...state,
                        removingPins:false,
                        error:null
                    };
                }
            }
            else{
                 return {
                    ...state,
                    removingPins:false,
                    error:null
                };;
            }
        }
        case PlaceActions.RESET_SELECTED_PLACE:{
            
            return {
                ...state,
                selectedPlace:null,
                isHover : false,
                error:null
            }
        }
        case PlaceActions.ADD_SAVED_PLACED_TO_STATE:{
           
            const updatedCity = {...state.city , savedPlaces:action.payload};
            

            return {
                ...state,
                loadingPins:false,
                city:updatedCity
            }
        }
        case PlaceActions.SET_PLACE_TO_NAVIGATE:{
            return {
                ...state,
                detailsPlace:{...action.payload}
            }
        }
        case PlaceActions.RESET_PLACE_TO_NAVIGATE:{
            return {
                ...state,
                detailsPlace:null
            }
        }
        case PlaceActions.RESET_STATE:{
            return {
                ...state,
                city:null,
                isHover:false,
                selectedPlace : null,
                detailsPlace:null,
                error:null
            }
        }
        case PlaceActions.START_LOADING_CITY:{
            return {
                ...state,
                loadingCity:true,
                error:null
            }
        }
        case PlaceActions.START_LOADING_PINS:{
            return {
                ...state,
                loadingPins:true,
                error:null
            }
        }
        case PlaceActions.ERROR_OCCURED:{
            return {
                ...state,
                error:action.payload
            }
        }
    }

    return state;
}