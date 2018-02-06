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
  mapPositonInInteger = 400;
  mapPostionInPixel = "400px";
  map = null;
  authorised:boolean;
  lat:number = 28.6108127;
  lng:number = 77.2060241;

  changeIndexAndRefresh = new Subject();
  scrollOrChangeImage$:Observable<any>;
  subscription:Subscription;

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
    this.subscription.unsubscribe();
  }

  load(){
    this.ngProgress.start();

    this.store.select('auth').map((state:fromAuth.State) =>{
      return state.authorised;
    }).subscribe( (authorised:boolean) => {
      this.authorised = authorised;
    } );



    this.subscription = this.store.select('place').subscribe((state:fromPlaceReducer.State) => {
      
           
           if(state.detailsPlace != null){

              this.city = state.city;
              console.log("[PlaceDetails]"  , state.detailsPlace ,state.city.savedPlaces);
              const selectedPlaceIndexInPin =  (state.city.savedPlaces ? state.city.savedPlaces.findIndex( (place:Place) => {
                return place.placeId === state.detailsPlace.placeId
              }  ): -1); 

              this.isPinned = selectedPlaceIndexInPin >= 0;
              console.log("[PlaceDetails]","isPinned "+this.isPinned,selectedPlaceIndexInPin);
              this.place = state.detailsPlace;
              this.photos = (this.place.photos && this.place.photos.map(photo => photo.large )) || [];
              
              console.log("[PlaceDetails]",this.place);

              this.lat = this.place.lat;
              this.lng = this.place.lng;


              this.ngProgress.done();
           }
           else if(state.city != null && state.city.savedPlaces != null){
                /// Got city from pinned record
              console.log("PlaceDetails","Got city details",state.city);

              this.route.params.take(1).subscribe((params:Params) => {
                  const id = params['id'];
             
                  this.store.dispatch(new PlaceActions.GetPlaceDetails({id:id,map:this.map}));
                
              })
           }
           else if(state.city != null){
              /// Got city from google geocode
              console.log("[PlaceDetails]","Coming here 222",state.city);
               this.city = state.city;
               this.lat = this.city.lat;
               this.lng = this.city.lng;
               this.store.dispatch(new PlaceActions.GetCityDetails({id:this.city.id,map:this.map}));
           }
           else {
              console.log("[PlaceDetails]","Coming here 111");
              this.route.parent.params.take(1).subscribe( (params:Params) => {
                    const cityId = params['id'];
                    console.log("[PlaceDetails]","Loadin city id",cityId);
                    this.store.dispatch(new PlaceActions.GetCityLocation(cityId));
              } )
           }
    });
  }

  onMapReady($event){
    this.map = $event;
    console.log("[onMapReady]",$event,this.place,this.city);
    if(this.place){
     // this.ngProgress.start();
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
    console.log("[ThumbnailView]" , "Swiper index change" , event,this.photos,this.photos[event].small);
    this.changeIndexAndRefresh.next();
  }

}
