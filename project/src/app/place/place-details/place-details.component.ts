import { Component, OnInit,OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';
import { Subject , Observable } from 'rxjs/Rx';
import { ActivatedRoute,Params } from '@angular/router';
import { NgProgress } from 'ngx-progressbar';

import * as fromPlaceReducer from '../store/place.reducer';
import * as PlaceActions from '../store/place.action';
import { Place } from '../../models/place.model';
import { WindowRefService } from '../../shared/windowRef.service';



@Component({
  selector: 'app-place-details',
  templateUrl: './place-details.component.html',
  styleUrls: ['./place-details.component.css']
})
export class PlaceDetailsComponent implements OnInit , OnDestroy {

  place:Place = null;
  isPinned:boolean;
  zoom:number = 15;
  photos:string[] = [];
  mapPositonInInteger = 400;
  mapPostionInPixel = "400px";
  map = null;

  changeIndexAndRefresh = new Subject();
  scrollOrChangeImage$:Observable<any>;
  

  public config: SwiperConfigInterface = {
    scrollbar: null,
    direction: 'horizontal',
    slidesPerView: 1,
    scrollbarHide: false,
    keyboardControl: true,
    mousewheelControl: false,
    scrollbarDraggable: true,
    scrollbarSnapOnRelease: true,
    pagination: '.swiper-pagination',
    paginationClickable: true,
    nextButton: '.swiper-button-next',
    prevButton: '.swiper-button-prev'
  };


  constructor(private store:Store<fromPlaceReducer.FeatureState>,
            private window:WindowRefService,
            private route:ActivatedRoute,
            private ngProgress:NgProgress) { }
  
  ngOnInit() {
    this.load();
    this.scrollOrChangeImage$ = Observable.merge(
      Observable.fromEvent(window,'scroll'),
      this.changeIndexAndRefresh
    );
    window.scrollTo(0,0);
  }

  ngOnDestroy(){
    this.store.dispatch(new PlaceActions.ResetPlaceToNavigate());
  }

  load(){
    this.ngProgress.start();
    this.store.select('place').subscribe((state:fromPlaceReducer.State) => {
      console.log("[PlaceDetails]"  , state.detailsPlace);
           
           if(state.detailsPlace != null){

              const selectedPlaceIndexInPin = state.city.savedPlaces.findIndex( (place:Place) => {
                return place.placeId === state.detailsPlace.placeId
              }  );

              this.isPinned = selectedPlaceIndexInPin >= 0;

              this.place = state.detailsPlace;
              this.photos = (this.place.photos && this.place.photos.map(photo => photo.large )) || [];
              
              console.log("[PlaceDetails]",this.place);
              this.ngProgress.done();
           }
    });
  }

  onMapReady($event){
    this.map = $event;
    console.log("[onMapReady]",event,this.place);
    if(this.place){
      this.ngProgress.start();
     this.store.dispatch(new PlaceActions.GetPlaceDetails({id:this.place.placeId,map:$event}));
    }
  }

  onScroll(event){
    let position = this.mapPositonInInteger - this.window.getNativeWindow().pageYOffset;
    if(position < 100){
      position = 100;
    }
    this.mapPostionInPixel = position+"px";
  }

  openInMap(){
    const urlToOpen = "https://www.google.com/maps/search/?api=1&query="+this.place.lat+","+this.place.lng+"&query_place_id="+this.place.placeId;
    this.window.getNativeWindow().open(urlToOpen);
  }

  swiperIndexChange(event){
    console.log("[ThumbnailView]" , "Swiper index change" , event,this.photos,this.photos[event].small);
    this.changeIndexAndRefresh.next();
  }

}
