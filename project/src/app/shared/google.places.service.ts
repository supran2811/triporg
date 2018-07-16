/// <reference path="../../../node_modules/@types/googlemaps/index.d.ts" />
import { Observable, Observer } from "rxjs";
import { Injectable, ElementRef, NgZone } from "@angular/core";

import { MapsAPILoader } from "@agm/core";

import { City } from "./../models/city.model";
import { ErrorModel } from "../models/error.model";

@Injectable()
export class GooglePlacesService {
  constructor(private googleApiLoader: MapsAPILoader, private ngZone: NgZone) {}

  searchPlace(text): Observable<any[]> {
    const observable = Observable.create((observer: Observer<any[]>) => {
      this.googleApiLoader
        .load()
        .then(() => {
          let autocompleteService = new google.maps.places.AutocompleteService();
          autocompleteService.getPlacePredictions(
            { input: text, types: ["(regions)"] },
            (
              predictions: Array<google.maps.places.AutocompletePrediction>,
              status
            ) => {
              observer.next(predictions);
            }
          );
        })
        .catch(error => {
          observer.error(error);
        });
    });

    return observable;
  }

  getDetails(placeid: string, map): Observable<any> {
    const observable = Observable.create((observer: Observer<any>) => {
      this.googleApiLoader
        .load()
        .then(() => {
          let detailService = new google.maps.places.PlacesService(map);
          detailService.getDetails(
            { placeId: placeid },
            (
              place: google.maps.places.PlaceResult,
              status: google.maps.places.PlacesServiceStatus
            ) => {
              if (status == google.maps.places.PlacesServiceStatus.OK) {
                observer.next(place);
              } else {
                observer.error(new ErrorModel(-1, status.toLocaleString()));
              }
            }
          );
        })
        .catch(error => {
          observer.error(new ErrorModel(-1, status.toLocaleString()));
        });
    });
    return observable;
  }

  addPlaceChangeListener(
    searchEleRef: ElementRef,
    boundary: google.maps.LatLngBounds
  ): Observable<any> {
    const observable = Observable.create((observer: Observer<any>) => {
      this.googleApiLoader
        .load()
        .then(() => {
          let autocomplete = new google.maps.places.Autocomplete(
            searchEleRef.nativeElement,
            { strictBounds: true, bounds: boundary }
          );

          autocomplete.addListener("place_changed", () => {
            this.ngZone.run(() => {
              let place = autocomplete.getPlace();

              if (place == null || place == undefined) {
                observer.error(new ErrorModel(-1, "Place Not Available"));
              }

              observer.next(place);
            });
          });
        })
        .catch(error => {
          observer.error(new ErrorModel(-1, error));
        });
    });
    return observable;
  }

  getGeoCode(placeid: string): Observable<City> {
    const observable = Observable.create((observer: Observer<City>) => {
      this.googleApiLoader
        .load()
        .then(() => {
          let geoCoder = new google.maps.Geocoder();

          geoCoder.geocode(
            { placeId: placeid },
            (results: google.maps.GeocoderResult[], status) => {
              if (results != null && results[0].geometry != null) {
                const city = new City(
                  placeid,
                  results[0].address_components[0].short_name,
                  results[0].geometry.location.lat(),
                  results[0].geometry.location.lng()
                );
                observer.next(city);
              } else {
                observer.error(new ErrorModel(-1, "Unable to get geocode"));
              }
            }
          );
        })
        .catch(error => {
          observer.error(new ErrorModel(-1, "Unable to get geocode"));
        });
    });

    return observable;
  }
}
