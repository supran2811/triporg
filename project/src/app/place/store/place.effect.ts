import { withLatestFrom } from 'rxjs/operator/withLatestFrom';

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
    @Effect()
            addPlaceChange = this.actions$.ofType(PlaceActions.ADD_PLACE_CHANGE_LISTENER)
                                            .map((action:PlaceActions.AddPlaceChangeListener) =>{
                                                return action.payload;
                                            } ).switchMap((payload:{input:ElementRef,boundary:google.maps.LatLngBounds}) =>{
                                                return this.googlePlaces.addPlaceChangeListener(payload.input,payload.boundary);
                                            }).map( (res:any) => {
                                                    console.log(res);
                                                     
                                                     

                                                     const place  = new Place (res.place_id , 
                                                                                res.geometry.location.lat() , 
                                                                                res.geometry.location.lng() , 
                                                                                res.name ,
                                                                              res.formatted_address   );
                                                      if(res.photos){
                                                            place.photos = res.photos.map(photo => (
                                                                 {small:photo.getUrl({'maxWidth': 200}) , 
                                                                  large:photo.getUrl({'maxWidth': 800 })}
                                                            ));
                                                      }  

                                                      console.log("After getting place",place);
                                                     return {
                                                         type:PlaceActions.SET_PLACE_DETAILS,
                                                         payload:{place:place,isHover:false}

                                                     }                           

                                            } ).catch(errr => {
                                                console.log(errr);
                                                return Observable.of([]); /// TODO Need to handle error cases
                                            });
    
                                            
    @Effect()
            savePlaceToServer = this.actions$.ofType(PlaceActions.SAVE_SELECTED_PLACE_TO_SERVER)
                                                    .withLatestFrom(this.store.select('place'))
                                                        .switchMap(([action,state]) =>{
                                                          
                                                          const savedPlaces = state.city.savedPlaces;
                                                          const selectedPlace = state.selectedPlace;
                                                          console.log("[PlaceEffects]",selectedPlace);
                                                          const city = state.city;
                                                          const uid = sessionStorage.getItem('uid');
                                                          let url = this.USER_SAVE_PLACES_URL+"/"+uid+"/"+city.id;  

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
                                            .withLatestFrom(this.store.select('place'))
                                                    .switchMap(([action,state]) => {
                                                        const selectedPlace = state.selectedPlace;
                                                        const city = state.city;
                                                        const savedPlaces  = state.city.savedPlaces;
                                                        const uid = sessionStorage.getItem('uid');
                                                        let url = this.USER_SAVE_PLACES_URL+"/"+uid+"/"+city.id;         
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
                                                    .withLatestFrom(this.store.select('auth'))
                                                     .map(([action,state]) =>{
                                                        
                                                            if(!state.authorised){
                                                                throw new Error("Not authorised!!");
                                                            }
                                                            else
                                                            return state.authorised;
                                                     })
                                                     .withLatestFrom(this.store.select('place'))
                                                     .switchMap(([action,state]) => {
                                                        
                                                        const city = state.city;
                                                        const uid = sessionStorage.getItem('uid');
                                                        const url = this.USER_SAVE_PLACES_URL+"/"+uid+"/"+city.id+"/places/";         
                                                        return this.http.get<any>(url,null)
                                                                    .catch((err) => {
                                                                        return Observable.throw({type:"error",message:err});
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
                                                            console.log("[PlaceEffects]",savedPlaces);
                                                            return {
                                                                type:PlaceActions.ADD_SAVED_PLACED_TO_STATE,
                                                                payload:savedPlaces
                                                            }

                                                     })
                                                     .catch(errr => {
                                                         console.log("[PlaceEffects]",errr);
                                                         return Observable.of(new PlaceActions.AddSavedPlacedToState([]));
                                                     });
                                                    
    @Effect()
            getCityDetails = this.actions$.ofType(PlaceActions.GET_CITY_DETAILS)
                                                            .map((action:PlaceActions.GetCityDetails) => {
                                                                return action.payload
                                                            })
                                                            .switchMap((payload:{id:string,map:any}) => {
                                                                return this.googlePlaces.getDetails(payload.id,payload.map);
                                                            } )
                                                            .withLatestFrom(this.store.select('place'))
                                                            .map( ([res,state]) => {
                                                                console.log("[PlaceEffetcs]",res,state);
                                                                
                                                                state.city.photos = res.photos.map(photo => {

                                                                    return {small:photo.getUrl({'maxWidth': 200}) , 
                                                                            large:photo.getUrl({'maxWidth': 800 })};
                                                                })
                                                                console.log(state.city.photos);
                                                                
                                                                return {
                                                                    type:PlaceActions.SET_CITY,
                                                                    payload:state.city
                                                                }
                                                            } )
                                                            .catch( errr => {
                                                                console.log(errr);
                                                                return Observable.of([]);
                                                            })

                @Effect()
                getPlaceDetails = this.actions$.ofType(PlaceActions.GET_PLACE_DETAILS)
                                                                .map((action:PlaceActions.GetPlaceDetails) => {
                                                                    return action.payload
                                                                })
                                                                .switchMap((payload:{id:string,map:any}) => {
                                                                    return this.googlePlaces.getDetails(payload.id,payload.map);
                                                                } )
                                                                .withLatestFrom(this.store.select('place'))
                                                                .map( ([res,state]) => {
                                                                    console.log("[PlaceEffetcs]","GET_PLACE_DETAILS",res,state);
                                                                    
                                                                    state.detailsPlace.address =  res.formatted_address;
                                                                    state.detailsPlace.opening_text = (res.opening_hours && res.opening_hours.weekday_text) || null;
                                                                    state.detailsPlace.phoneNumber = res.formatted_phone_number;      
                                                                    state.detailsPlace.reviews = (res.reviews && res.reviews.map(review => (
                                                                            {text:review.text , author_name:review.author_name , profile_photo_url:review.profile_photo_url }
                                                                    )));
                                                                    state.detailsPlace.website = res.website;
                                                                    return {
                                                                        type:PlaceActions.SET_PLACE_TO_NAVIGATE,
                                                                        payload:state.detailsPlace
                                                                    }
                                                                } )
                                                                .catch( errr => {
                                                                    console.log(errr);
                                                                    return Observable.of([]);
                                                                })
                                                            
                                                            

    constructor(private actions$:Actions , 
                    private googlePlaces:GooglePlacesService,
                    private store:Store<fromPlaceReducer.FeatureState>,
                    private http:HttpService){}
}