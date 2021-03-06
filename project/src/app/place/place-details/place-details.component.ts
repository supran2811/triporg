import { Component, OnInit,OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';
import { Subject , Observable ,Subscription } from 'rxjs/Rx';
import { ActivatedRoute,Params } from '@angular/router';
import { NgProgress } from 'ngx-progressbar';

import * as fromPlaceReducer from '../store/place.reducer';
import * as PlaceActions from '../store/place.action';
import { Place } from '../../models/place.model';
import { WindowRefService } from '../../shared/windowRef.service';
import { City } from '../../models/city.model';
import * as AppActions from '../../store/app.actions';
import * as fromAuth from '../../auth/store/auth.reducer';
import { RegisterComponent } from '../../auth/register/register.component';

@Component({
  selector: 'app-place-details',
  templateUrl: './place-details.component.html',
  styleUrls: ['./place-details.component.css']
})
export class PlaceDetailsComponent implements OnInit , OnDestroy {

  place:Place = null;
  city:City = null;
  isPinned:boolean;
  zoom:number = 15;
  photos:string[] = [];
  mapPositonInInteger = 10;
  mapPostionInPixel = "10px";
  map = null;
  authorised:boolean;
  lat:number = 28.6108127;
  lng:number = 77.2060241;

  changeIndexAndRefresh = new Subject();
  scrollOrChangeImage$:Observable<any>;
  subscription:Subscription;
  authSubscription:Subscription;

  errorImageUrl = "../../../assets/images/profilephoto.png";

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
            private ngProgress:NgProgress) { 
              
            }
  
  ngOnInit() {
    this.load();
    this.hidePagination();
    this.scrollOrChangeImage$ = Observable.merge(
      Observable.fromEvent(window,'scroll'),
      this.changeIndexAndRefresh
    );
    window.scrollTo(0,0);
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
    this.authSubscription.unsubscribe();
    this.store.dispatch(new PlaceActions.ResetPlaceToNavigate());
  }

  load(){
    this.ngProgress.start();

    this.authSubscription = this.store.select('auth').subscribe((state:fromAuth.State) => {
      this.authorised = state.authorised;
    });


    this.subscription = this.store.select('place').subscribe((state:fromPlaceReducer.State) => {
      
           
           if(state.detailsPlace != null){
              this.city = state.city;
              
              const selectedPlaceIndexInPin =  (state.city.savedPlaces ? state.city.savedPlaces.findIndex( (place:Place) => {
                return place.placeId === state.detailsPlace.placeId
              }  ): -1); 

              this.isPinned = selectedPlaceIndexInPin >= 0;
              
              this.place = state.detailsPlace;
              this.photos = (this.place.photos ? this.place.photos.map(photo => photo.large ) : [] );
              
              this.lat = this.place.lat;
              this.lng = this.place.lng;
              if(this.photos != null && this.photos.length > 1){
                this.enablePagination();
              }

              this.ngProgress.done();
           }
           else if(state.city != null && state.city.savedPlaces != null){
                /// Got city from pinned record
              this.route.params.take(1).subscribe((params:Params) => {
                  const id = params['id'];
                  this.store.dispatch(new PlaceActions.GetPlaceDetails({id:id,map:this.map}));
              });
           }
           else if(state.city != null){
              /// Got city from google geocode
               this.city = state.city;
               this.lat = this.city.lat;
               this.lng = this.city.lng;
               this.store.dispatch(new PlaceActions.GetCityDetails({id:this.city.id,map:this.map}));
           }
           else {
              this.route.parent.params.take(1).subscribe( (params:Params) => {
                    const cityId = params['id'];
                    this.store.dispatch(new PlaceActions.GetCityLocation(cityId));
              } )
           }
    });
  }

  onMapReady($event){
    this.map = $event;
    if(this.place){
        this.store.dispatch(new PlaceActions.GetPlaceDetails({id:this.place.placeId,map:$event}));
    }

  }

  openInMap(){
    const urlToOpen = "https://www.google.com/maps/search/?api=1&query="+this.place.lat+","+this.place.lng+"&query_place_id="+this.place.placeId;
    this.window.getNativeWindow().open(urlToOpen);
  }

  remove(){
    this.store.dispatch(new PlaceActions.StartRemovingPlaceFromServer());
    this.store.dispatch(new PlaceActions.RemoveSelectedPlaceFromServer());
  }

  save(){
    if(!this.authorised){
      this.store.dispatch(new AppActions.ShowModal(RegisterComponent));
      return;
    }
    this.store.dispatch(new PlaceActions.StartSavingPlaceToServer());
    this.store.dispatch(new PlaceActions.SaveSelectedPlaceToServer());
  }

  swiperIndexChange(event){
    this.changeIndexAndRefresh.next();
  }

  enablePagination(){
    this.config.pagination = '.swiper-pagination';
    this.config.nextButton = '.swiper-button-next';
    this.config.prevButton = '.swiper-button-prev';
  }

  hidePagination(){
    this.config.pagination = 'none';
    this.config.nextButton = 'none';
    this.config.prevButton = 'none';
  }

}
