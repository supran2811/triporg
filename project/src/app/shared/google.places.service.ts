import { Observable , Observer} from 'rxjs';
import { Injectable } from '@angular/core';
import {} from 'googlemaps';
import { MapsAPILoader } from '@agm/core';

import { Place } from '../models/place.model';
import { City } from './../models/city.model';


@Injectable()
export class GooglePlacesService {

  constructor(private googleApiLoader : MapsAPILoader){}  

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
                                                    } ) 
                })
             }
       );
       
       return observable;
  }

}