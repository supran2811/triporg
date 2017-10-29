import { City } from '../../models/city.model';
import * as CityActions from './city.action';

export interface State {
    cities: City[]
};

const initialState :State = {
    cities:[
        new City(1,"Jaipur"),
        new City(2,"Kanpur"),
    ]
}

export function citylistReducer (state=initialState , action:CityActions.CityActions){
    return state;
}