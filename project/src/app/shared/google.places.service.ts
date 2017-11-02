import { Observable , Observer} from 'rxjs';
import { Injectable } from '@angular/core';
import {} from 'googlemaps';
import { MapsAPILoader } from '@agm/core';

import { City } from './../models/city.model';

@Injectable()
export class GooglePlacesService{

  constructor(private googleApiLoader : MapsAPILoader){}  

  searchPlace(text){
    const observable = Observable.create(
            (observer:Observer<City[]>) =>{
                this.googleApiLoader.load().then(() =>{

                    let autocompleteService = new google.maps.places.AutocompleteService();
                    autocompleteService.getPlacePredictions({ input: text ,offset:2, types:['(cities)']},
                                    (predictions:Array<google.maps.places.AutocompletePrediction>,
                                                status) => {
                          let cities:City[] = [];                          
                          for(let prediction of predictions){
                                cities.push(new City(prediction.place_id,prediction.description));
                          }
                          console.log(cities);
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
}