import { Observable , Observer} from 'rxjs';
import { Injectable , ElementRef , NgZone} from '@angular/core';
import {} from 'googlemaps';
import { MapsAPILoader, LatLngBounds ,LatLngBoundsLiteral} from '@agm/core';
import { Store } from '@ngrx/store';


import { Place } from '../models/place.model';
import { City } from './../models/city.model';
import * as fromPlaceReducer from '../place/store/place.reducer';
import * as PlaceActions from '../place/store/place.action';



@Injectable()
export class GooglePlacesService {

  constructor(private googleApiLoader : MapsAPILoader,
                private ngZone:NgZone,
                private store:Store<fromPlaceReducer.FeatureState>){}  

  searchPlace(text) : Observable<City[]> {
    const observable = Observable.create(
            (observer:Observer<City[]>) =>{
                this.googleApiLoader.load().then(() =>{

                    let autocompleteService = new google.maps.places.AutocompleteService();
                    autocompleteService.getPlacePredictions({ input: text ,offset:2, types:['(cities)']},
                                    (predictions:Array<google.maps.places.AutocompletePrediction>,
                                                status) => {
                          console.log(predictions);                          
                          let cities:City[] = [];                          
                          for(let prediction of predictions){
                                cities.push(new City(prediction.place_id,prediction.description));
                          }
                          //console.log(cities);
                          observer.next(cities);
                   });
                })
                .catch((error) => {
                    observer.error(error);
                })
            }

    );

    return observable;

  }

  getDetails(placeid:string,map:HTMLDivElement):Observable<Place> {
       const observable = Observable.create(
             (observer : Observer<Place>) => {
                this.googleApiLoader.load().then(() => {
                    let detailService = new google.maps.places.PlacesService(map);
                    detailService.getDetails({placeId:placeid},(place:google.maps.places.PlaceResult ,
                                                    status:google.maps.places.PlacesServiceStatus) =>{
                                                         console.log(place);
                                                    } );
                }).catch(error => {
                    observer.error(error);
                })
             }
       );

      
       
       return observable;
  }

  addPlaceChangeListener(searchEleRef:ElementRef, boundary:google.maps.LatLngBounds ) {
      this.googleApiLoader.load().then(() => {
                
                let autocomplete = new google.maps.places.Autocomplete(searchEleRef.nativeElement,{types:['address'],strictBounds:true,bounds:boundary});
                
                autocomplete.addListener('place_changed',() => {

                    this.ngZone.run(() => {
                        let place = autocomplete.getPlace();
                        console.log(place);



                        if(place.geometry === null || place.geometry == undefined ){
                            return;
                        }

                        this.store.dispatch(new PlaceActions.SetCityLocation({lat:place.geometry.location.lat() , lng:place.geometry.location.lng() }))

                    }) ;  

                })
      }).catch((error)=>{
           
      })
  }

  getGeoCode(placeid:string):Observable<{lat:number ,lng:number}>{
      const  observable = Observable.create((observer:Observer<{lat:number ,lng:number}>) =>{
            this.googleApiLoader.load().then(() => {
                    
                let geoCoder = new google.maps.Geocoder;
                geoCoder.geocode({'placeId': placeid} ,(results:google.maps.GeocoderResult[] , status) => {
                            console.log(results,status);

                            console.log(results[0].geometry.location.toJSON());
                            const location = results[0].geometry.location.toJSON();
                            observer.next({lat:location.lat , lng:location.lng})
                            
                });
            }).catch(error => {
                observer.error(error);
            })
      });

      return observable;
   }

}