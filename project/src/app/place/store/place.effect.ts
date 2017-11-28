import { Actions, Effect } from '@ngrx/effects';
import { ElementRef, Injectable } from '@angular/core';

import { GooglePlacesService } from '../../shared/google.places.service';
import * as PlaceActions from './place.action';
import * as fromPlaceReducer from './place.reducer';
import { Place } from '../../models/place.model';
import { City } from '../../models/city.model';



@Injectable()
export class PlacesEffect {

    USER_SAVE_PLACES_URL = "https://triporg-1508486982436.firebaseio.com/places";
    

    @Effect() getPlaceDetails = this.actions$.ofType(PlaceActions.GET_PLACE_DETAILS)
                                        .map((action:PlaceActions.GetPlaceDetails) =>{
                                            return action.payload;
                                        })
                                        .switchMap((payload:{id:string,map:HTMLDivElement}) => {
                                              return this.googlePlaces.getDetails(payload.id,payload.map);
                                        }).map((place:Place) =>{
                                            return {
                                                type:PlaceActions.SET_PLACE_DETAILS,
                                                payload:place
                                            }
                                        });

    @Effect() getLocation = this.actions$.ofType(PlaceActions.GET_CITY_LOCATION)
                                        .map((action:PlaceActions.GetCityLocation) =>{
                                            return action.payload;
                                        })
                                        .switchMap((payload:string) => {
                                              return this.googlePlaces.getGeoCode(payload);
                                        }).map((city:City) =>{
                                            return {
                                                type:PlaceActions.SET_CITY,
                                                payload:city
                                            }
                                        });                                   
    @Effect({dispatch:false})
            addPlaceChange = this.actions$.ofType(PlaceActions.ADD_PLACE_CHANGE_LISTENER)
                                            .map((action:PlaceActions.AddPlaceChangeListener) =>{
                                                return action.payload;
                                            } ).do((payload:{input:ElementRef,boundary:google.maps.LatLngBounds}) =>{
                                                this.googlePlaces.addPlaceChangeListener(payload.input,payload.boundary);
                                            });
                                                                                 
    constructor(private actions$:Actions , private googlePlaces:GooglePlacesService){}
}