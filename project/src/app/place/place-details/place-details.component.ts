import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import * as fromPlaceReducer from '../store/place.reducer';
import * as PlaceActions from '../store/place.action';
import { Place } from '../../models/place.model';

@Component({
  selector: 'app-place-details',
  templateUrl: './place-details.component.html',
  styleUrls: ['./place-details.component.css']
})
export class PlaceDetailsComponent implements OnInit {

  constructor(private store:Store<fromPlaceReducer.FeatureState>) { }
  
  place:Place;
  isPinned:boolean;
  zoom:number = 10;
  photos:string[] = [];

  config: SwiperOptions = {
    pagination: '.swiper-pagination',
    paginationClickable: true,
    nextButton: '.swiper-button-next',
    prevButton: '.swiper-button-prev',
    spaceBetween: 0
  };

  ngOnInit() {
    this.load();
  }

  load(){
    this.store.select('place').subscribe((state:fromPlaceReducer.State) => {
      console.log("[PlaceDetauls]"  , state.selectedPlace);
           if(state.selectedPlace != null){

              const selectedPlaceIndexInPin = state.city.savedPlaces.findIndex( (place:Place) => {
                return place.placeId === state.selectedPlace.placeId
              }  );

              this.isPinned = selectedPlaceIndexInPin >= 0;

              this.place = state.selectedPlace;
              this.photos = this.place.photos.map(photo => photo.large );
              
              console.log("[PlaceDetails]",this.place);
           }
    });
  }

}
