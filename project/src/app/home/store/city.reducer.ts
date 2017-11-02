import { City } from '../../models/city.model';
import * as CityActions from './city.action';

export interface State {
    cities: City[]
};

const initialState :State = {
    cities:[]
}

export function citylistReducer (state=initialState , action:CityActions.CityActions){
    switch(action.type){
        case CityActions.SET_RESULT : {
            return {
                 ...state,
                 cities:[...action.payload]   
            }
        }
    }
    return state;
}