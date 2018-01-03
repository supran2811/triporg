import { Component, OnInit,OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';

import * as fromPlaceReducer from '../store/place.reducer';
import * as PlaceActions from '../store/place.action';
import { Place } from '../../models/place.model';

@Component({
  selector: 'app-place-details',
  templateUrl: './place-details.component.html',
  styleUrls: ['./place-details.component.css']
})
export class PlaceDetailsComponent implements OnInit , OnDestroy {

  place:Place;
  isPinned:boolean;
  zoom:number = 15;
  photos:string[] = [];


  config: SwiperOptions = {
    pagination: '.swiper-pagination',
    paginationClickable: true,
    nextButton: '.swiper-button-next',
    prevButton: '.swiper-button-prev',
    spaceBetween: 0
  };

  constructor(private store:Store<fromPlaceReducer.FeatureState>) { }
  
  ngOnInit() {
    this.load();
  }

  ngOnDestroy(){
    this.store.dispatch(new PlaceActions.ResetPlaceToNavigate());
  }

  load(){
    this.store.select('place').subscribe((state:fromPlaceReducer.State) => {
      console.log("[PlaceDetauls]"  , state.detailsPlace);
           if(state.detailsPlace != null){

              const selectedPlaceIndexInPin = state.city.savedPlaces.findIndex( (place:Place) => {
                return place.placeId === state.detailsPlace.placeId
              }  );

              this.isPinned = selectedPlaceIndexInPin >= 0;

              this.place = state.detailsPlace;
              this.photos = this.place.photos.map(photo => photo.large );
              
              console.log("[PlaceDetails]",this.place);
           }
    });
  }

  onMapReady($event){
    console.log("[onMapReady]",event,this.place.placeId);
    
    this.store.dispatch(new PlaceActions.GetPlaceDetails({id:this.place.placeId,map:$event}));
  }
}
