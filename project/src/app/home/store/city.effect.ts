import { Injectable } from '@angular/core';
import {Effect,Actions} from '@ngrx/effects';

import  {GooglePlacesService}  from './../../shared/google.places.service';
import { City } from './../../models/city.model';
import * as CityActions from './city.action';


@Injectable()
export class CityEffects{

    @Effect() searchCity = this.actions$.ofType(CityActions.SEARCH_CITIES).
                                                switchMap((action:CityActions.SearchCityList) => {
                                                    return this.googlePlace.searchPlace(action.payload);
                                                }).map((cities:City[]) => {

                                                      return {
                                                          type  : CityActions.SET_RESULT,
                                                          payload:cities 
                                                        }
                                                })

    constructor(private actions$:Actions , private googlePlace:GooglePlacesService){}
}