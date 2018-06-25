import { Store } from '@ngrx/store';
import { Actions,Effect } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { Observable } from 'rxjs/Observable';

import { Place } from '../../../models/place.model';
import { City } from '../../../models/city.model';
import { HttpService } from '../../../shared/http.service';
import * as PinnedViewActions from './pinnedview.action';
import * as fromApp from '../../../store/app.reducer';
import * as AppConstants from '../../../shared/constants';
import { ErrorModel } from '../../../models/error.model';


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
                                        if(!res.auth){
                                            return Observable.of(new PinnedViewActions.SetPinnedCities([]));
                                        }
                                        const url = this.PINS_URL+"/"+res.uid;
                                        
                                        return this.http.get(url,null)
                                                    .catch(error =>{
                                                           return Observable.of(new PinnedViewActions.SetErrorInLoadingPins(error)); 
                                                     })
                                                    .map((response:any) =>{
                                                        let cities = [];   
                                                        if(response != null){

                                                         if(response.type){
                                                            return {
                                                               type : response.type,
                                                               payload:response.payload
                                                            }
                                                         }   

                                                         cities = Object.values(response).map((res:any) =>{
                                                              let savedPlaces = [];
                                                              if(res.places != null){
                                                                savedPlaces = Object.values(res.places).map((place:any) =>{
                                                                    return new Place(place.placeId,place.lat,place.lng,place.displayName,
                                                                                place.iconUrl,place.address,place.photos);
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