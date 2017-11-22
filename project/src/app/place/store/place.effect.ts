import { Actions, Effect } from '@ngrx/effects';
import { GooglePlacesService } from '../../shared/google.places.service';
import { ElementRef, Injectable } from '@angular/core';
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

    constructor(private actions$:Actions , private googlePlaces:GooglePlacesService){}
}