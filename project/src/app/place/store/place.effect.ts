import { Actions, Effect } from '@ngrx/effects';
import { ElementRef, Injectable } from '@angular/core';

import { GooglePlacesService } from '../../shared/google.places.service';
import * as PlaceActions from './place.action';
import * as fromPlaceReducer from './place.reducer';
import { Place } from '../../models/place.model';



@Injectable()
export class PlacesEffect {

    @Effect() getPlaceDetails = this.actions$.ofType(PlaceActions.GET_PLACE_DETAILS)
                                        .map((action:PlaceActions.GetPlaceDetails) =>{
                                            console.log("Coming here 1111");
                                            console.log(action.payload);
                                            return action.payload;
                                        })
                                        .switchMap((payload:{id:string,map:HTMLDivElement}) => {
                                            console.log("Coming here 2222");
                                            console.log(payload);
                                              return this.googlePlaces.getDetails(payload.id,payload.map);
                                        }).map((place:Place) =>{
                                            console.log("Coming here 3333");
                                            return {
                                                type:PlaceActions.SET_PLACE_DETAILS,
                                                payload:place
                                            }
                                        });

    @Effect() getLocation = this.actions$.ofType(PlaceActions.GET_CITY_LOCATION)
                                        .map((action:PlaceActions.GetCityLocation) =>{
                                            console.log("Coming here 1111");
                                            console.log(action.payload);
                                            return action.payload;
                                        })
                                        .switchMap((payload:string) => {
                                            console.log("Coming here 2222");
                                            console.log(payload);
                                              return this.googlePlaces.getGeoCode(payload);
                                        }).map((location:{lat:number,lng:number}) =>{
                                            console.log("Coming here 3333");
                                            return {
                                                type:PlaceActions.SET_CITY_LOCATION,
                                                payload:location
                                            }
                                        });                                   
    @Effect({dispatch:false})
            addPlaceChange = this.actions$.ofType(PlaceActions.ADD_PLACE_CHANGE_LISTENER)
                                            .map((action:PlaceActions.AddPlaceChangeListener) =>{
                                                return action.payload;
                                            } ).do((payload:{input:ElementRef,boundary:google.maps.LatLngBounds}) =>{
                                                console.log(payload);
                                                this.googlePlaces.addPlaceChangeListener(payload.input,payload.boundary);
                                            })                                     
    constructor(private actions$:Actions , private googlePlaces:GooglePlacesService){}
}