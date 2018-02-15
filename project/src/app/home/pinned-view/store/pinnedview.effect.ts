import { Place } from '../../../models/place.model';
import { City } from '../../../models/city.model';
import { Store } from '@ngrx/store';
import { Actions,Effect } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { Observable } from 'rxjs/Observable';

import { HttpService } from '../../../shared/http.service';
import * as PinnedViewActions from './pinnedview.action';
import * as fromApp from '../../../store/app.reducer';
import * as AppConstants from '../../../shared/constants';

@Injectable()
export class PinnedViewEffects{

    PINS_URL = "/pins/";

    @Effect()
        getPinnedCities = this.actions$.ofType(PinnedViewActions.GET_PINNED_CITIES_FROM_SERVER)
                                    .withLatestFrom(this.store.select('auth'))
                                    .map( ([action,state]) =>{
                                            return {auth:state.authorised,uid:state.uid};
                                    } )
                                    .switchMap((res:{auth:boolean,uid:string}) => {
                                        console.log("[GET_PINNED_CITIES_FROM_SERVER]","Entering http");

                                        if(!res.auth){
                                            console.log("[GET_PINNED_CITIES_FROM_SERVER]","Not authorised to send");
                                            return Observable.of(new PinnedViewActions.SetPinnedCities([]));
                                        }
                                        const url = this.PINS_URL+"/"+res.uid;
                                        
                                        return this.http.get(url,null)
                                                    .catch(err =>{
                                                            console.log("[GET_PINNED_CITIES_FROM_SERVER]",err);
                                                            return Observable.of(new PinnedViewActions.SetPinnedCities([]));
                                                     })
                                                    .map((response) =>{

                                                        console.log("[GET_PINNED_CITIES_FROM_SERVER]",response);
                                                         
                                                        let cities = [];   
                                                        if(response != null){
                                                         cities = Object.values(response).map(res =>{
                                                              let savedPlaces = [];
                                                              if(res.places != null){
                                                                savedPlaces = Object.values(res.places).map(place =>{
                                                                    return new Place(place.placeId,place.lat,place.lng,place.displayName,
                                                                                place.address,place.photos);
                                                                })
                                                              }

                                                              return new City(res.id,res.name,res.lat,res.lng,savedPlaces , res.photos);
                                                         });
                                                        }

                                                         return {
                                                             type:PinnedViewActions.SET_PINNED_CITIES,
                                                             payload:cities
                                                         }
                                                    })
                                    })
                                    




    constructor(private actions$:Actions,
                private http:HttpService,
                private store:Store<fromApp.AppState>){}
}