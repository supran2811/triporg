
import { Place } from '../../models/place.model';
import * as PlaceActions from './place.action';
import * as fromApp from '../../store/app.reducer';
import { City } from '../../models/city.model';

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
    savingPins:boolean
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
    savingPins:false

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
            console.log("[PlaceReducer] SET_CITY",action.payload);
            return {
                ...state,
                loadingCity:false,
                city:action.payload
            }
        }
        case PlaceActions.SET_CITY_LOCATION:{
            console.log("[PlaceReducer] SET_CITY_LOCATION",action.payload);
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
                savingPins:true
            }
        }
        case PlaceActions.SAVE_PLACE:{

            if(action.payload.city && state.city && action.payload.city.id === state.city.id){
                console.log("[PlaceReducer]","Coming here to save place");
                let newSavedPlaces =state.city.savedPlaces ? [ ...state.city.savedPlaces]:[];
                newSavedPlaces.push({...action.payload.place});

                const updatedCity = {...state.city , savedPlaces:newSavedPlaces}    
                console.log("[PlaceReducer]","Added new place ",updatedCity);
                return {
                    ...state,
                    city:updatedCity,
                    savingPins:false
                }
            }
            return {...state,savingPins:false};

            
        }
        case PlaceActions.START_REMOVING_PLACE_FROM_SERVER:{
            return {
                ...state,
                removingPins:true
            }
        }
        case PlaceActions.REMOVE_PLACE:{
            console.log("[PlaceReducer]","Coming here to remove place",action.payload,state);
            if(action.payload.city && state.city && action.payload.city.id === state.city.id){

                console.log("[PlaceReducer]","Coming here to remove place");

                let updatedSavedPlaces = [ ...state.city.savedPlaces];

                console.log("[PlaceReducer]",updatedSavedPlaces,action.payload.place);

                let index = updatedSavedPlaces.findIndex((place) => {
                    return action.payload.place.placeId == place.placeId;
                } )
                if(index >= 0){
                    updatedSavedPlaces.splice(index,1);
                    const updatedCity = {...state.city , savedPlaces:updatedSavedPlaces}

                    return {
                        ...state,
                        city:updatedCity,
                        removingPins:false
                    }
                }
                else{
                    return {
                        ...state,
                        removingPins:false
                    };
                }
            }
            else{
                 return {
                    ...state,
                    removingPins:false
                };;
            }
        }
        case PlaceActions.RESET_SELECTED_PLACE:{
            console.log("[PlaceReducer]","Coming here to reset place");
            return {
                ...state,
                selectedPlace:null,
                isHover : false
            }
        }
        case PlaceActions.ADD_SAVED_PLACED_TO_STATE:{
            console.log("[PlaceReducer] ADD_SAVED_PLACED_TO_STATE",action.payload);
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
            console.log("Coming here in reset state...");
            return {
                ...state,
                city:null,
                isHover:false,
                selectedPlace : null
            }
        }
        case PlaceActions.START_LOADING_CITY:{
            return {
                ...state,
                loadingCity:true
            }
        }
        case PlaceActions.START_LOADING_PINS:{
            return {
                ...state,
                loadingPins:true
            }
        }
    }

    return state;
}