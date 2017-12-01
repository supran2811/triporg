
import { Observable } from 'rxjs/Rx';
import { Store } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import { ElementRef, Injectable } from '@angular/core';
import * as firebase from 'firebase';

import { HttpService } from '../../shared/http.service';
import { GooglePlacesService } from '../../shared/google.places.service';
import * as PlaceActions from './place.action';
import * as fromPlaceReducer from './place.reducer';
import * as fromAuthReducer from '../../auth/store/auth.reducer';
import { Place } from '../../models/place.model';
import { City } from '../../models/city.model';




@Injectable()
export class PlacesEffect {

    USER_SAVE_PLACES_URL = "https://triporg-1508486982436.firebaseio.com/pins";
    

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
    
                                            
    @Effect()
            savePlaceToServer = this.actions$.ofType(PlaceActions.SAVE_SELECTED_PLACE_TO_SERVER)
                                                    .switchMap(() => this.store.select('place').take(1))
                                                        .switchMap((state:fromPlaceReducer.State) =>{
                                                          
                                                          const savedPlaces = state.savedPlaces;
                                                          const selectedPlace = state.selectedPlace;
                                                          const city = state.city;
                                                          let url = this.USER_SAVE_PLACES_URL+"/"+firebase.auth().currentUser.uid+"/"+city.id;  

                                                          if(savedPlaces.length == 0){
                                                            return this.http.put(url,city)
                                                                    .catch((err) => Observable.of({type:"error",message:err}))
                                                                    .switchMap(() => {
                                                                        url = url+"/places/"+selectedPlace.placeId;
                                                                        return this.http.put(url, selectedPlace)
                                                                                    .catch((err) => Observable.of({type:"error",message:err}));
                                                                    });
                                                          }
                                                          else{
                                                            url = url+"/places/"+selectedPlace.placeId;
                                                            return this.http.put(url, selectedPlace)
                                                                        .catch((err) => Observable.of({type:"error",message:err}));
                                                          }
                                                          
                                                    }).map((response) => {
                                                        console.log(response);

                                                        return {
                                                           type:PlaceActions.SAVE_SELECTED_PLACE
                                                         }
                                                    }); 
    @Effect()                                                                             
          removePlaceFromServer = this.actions$.ofType(PlaceActions.REMOVE_SELECTED_PLACE_FROM_SERVER)
                                            .switchMap(() => this.store.select('place').take(1))
                                                    .switchMap((state:fromPlaceReducer.State) => {
                                                        const selectedPlace = state.selectedPlace;
                                                        const city = state.city;
                                                        const savedPlaces  = state.savedPlaces;
                                                        let url = this.USER_SAVE_PLACES_URL+"/"+firebase.auth().currentUser.uid+"/"+city.id;         
                                                        if(savedPlaces.length > 1){
                                                            url = url +"/places/"+selectedPlace.placeId;
                                                        }
                                                        return this.http.remove(url).catch((err) => Observable.of({type:"error" , message:err }));
                                                                    
                                                    }).map(res => {
                                                        
                                                        return {
                                                            type:PlaceActions.REMOVE_SELECTED_PLACE
                                                        }
                                                    });

    @Effect()
        getSavedPlaceFrmServerByCity = this.actions$.ofType(PlaceActions.GET_SAVED_PLACES_FROM_SERVER_BY_CITY)
                                                    .switchMap(() => this.store.select('auth').take(1))
                                                     .map((state:fromAuthReducer.State) =>{
                                                        console.log("1111",state);
                                                            return state.authorised;
                                                     })
                                                     .switchMap((authorised:boolean) => {
                                                         console.log("2222");
                                                         if(authorised){
                                                             return this.store.select('place').take(1);
                                                         }
                                                         else{
                                                            return Observable.of({type:"error",message:"Not authorised"});
                                                         }
                                                     })
                                                     .switchMap((res:any) => {
                                                        
                                                        if(res && res.type){
                                                            return Observable.of(res);
                                                        }

                                                        const state:fromPlaceReducer.State = <fromPlaceReducer.State>res;
                                                        
                                                        const city = state.city;
                                                        const url = this.USER_SAVE_PLACES_URL+"/"+firebase.auth().currentUser.uid+"/"+city.id+"/places/";         
                                                        return this.http.get<any>(url,null)
                                                                    .catch((err) => {
                                                                        return Observable.of({type:"error",message:err});
                                                                    })
                                                                
                                                     })
                                                     .map((res:any) => {
                                                            console.log(res);
                                                            let savedPlaces:Place[] = [];
                                                            
                                                            if(res && !res.type){
                                                                 savedPlaces = Object.values(res).map( (place:Place) =>{
                                                                    return place;
                                                                } )
                                                            }
                                                            console.log(savedPlaces);
                                                            return {
                                                                type:PlaceActions.ADD_SAVED_PLACED_TO_STATE,
                                                                payload:savedPlaces
                                                            }

                                                     });
                                                    
                                                                                                                    
    constructor(private actions$:Actions , 
                    private googlePlaces:GooglePlacesService,
                    private store:Store<fromPlaceReducer.FeatureState>,
                    private http:HttpService){}
}