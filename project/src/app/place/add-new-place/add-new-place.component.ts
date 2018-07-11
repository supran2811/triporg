import { ActivatedRoute, Params,Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Component, 
          ElementRef, 
          OnInit ,
          ViewChild,
          OnDestroy,
          Output,
          EventEmitter} from '@angular/core';
import { Observable,Subscription } from 'rxjs/Rx';
import { NgProgress } from 'ngx-progressbar'
import { FormControl } from '@angular/forms';

import { Place } from '../../models/place.model';
import * as PlaceActions from '../store/place.action';
import * as fromPlaceReducer from '../store/place.reducer';
import * as fromAuth from '../../auth/store/auth.reducer';
import { WindowRefService } from '../../shared/windowRef.service';
import {Marker} from '../../models/marker.model';
import * as AppActons from '../../store/app.actions';
import { RegisterComponent } from '../../auth/register/register.component';
import * as fromPinnedReducer from '../../home/pinned-view/store/pinnedview.reducer';


@Component({
  selector: 'app-add-new-place',
  templateUrl: './add-new-place.component.html',
  styleUrls: ['./add-new-place.component.css']
})

export class AddNewPlaceComponent implements OnInit , OnDestroy  {

  searchControl:FormControl;

  subscription:Subscription;

  @ViewChild('search')
      searchElementRef:ElementRef;

  @Output() closeMapView = new EventEmitter();    

  authorised:boolean;
  blockActions = false;
  lat: number;
  lng: number;
  cityId:string;
  selectedPlace : Place;
  loaded = true;
  showMarker = false;
  savedPlaces:Place[] = [];
  map = null;
  
  zoom:number = 10;
  isNew:boolean = false;
  placeName:string = "";

  markers:Marker[] = [];
  showDetailWindow = false;

  iconAdd = {id:"1",iconClass : ['fa','fa-plus-circle','fa-lg'].join(' ')};
  iconRemove = {id:"2",iconClass : ['fa','fa-minus-circle','fa-lg'].join(' ')};
  iconMap = {id:"3",iconClass : ['fa','fa-location-arrow','fa-lg'].join(' ')};
  iconProgress = {id:"4",iconClass : ['fa','fa-spinner','fa-pulse','fa-lg'].join(' ')};
   
  thumbnailActionConfig:{id:string,iconClass:string}[] = [];

  constructor(public ngProgress:NgProgress, 
                private store:Store<fromPlaceReducer.FeatureState>
              , private activeRoute:ActivatedRoute,
                private router:Router,
                private windowRef:WindowRefService) { }

  ngOnInit() {
    this.load();
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

  onMapReady(event){
    this.map = event;
    if(this.cityId != undefined){
      this.store.dispatch(new PlaceActions.GetCityDetails({id:this.cityId,map:event}));
    }
  }

  load(){
    
    this.subscription = this.store.select('place').subscribe((state:fromPlaceReducer.State) =>{
      
        this.blockActions = state.removingPins || state.savingPins;
        
        if(state.savingPins && state.error != null){
          this.store.dispatch(new PlaceActions.SaveSelectedPlaceToServer());
         }

        if(this.blockActions) return;

        if(state.selectedPlace != null && this.lat ){
          this.placeName = "";
          let selectedPlaceIndexInPin = state.city.savedPlaces?(state.city.savedPlaces.findIndex( (place:Place) => {
            return place.placeId === state.selectedPlace.placeId
          }  )) : -1;
          
          let selectedPlaceIndexInMarker = -1;
          this.markers = this.markers.filter((marker:Marker , idX:number) =>{
                marker.showInfoWindow = false;
                
                if(!marker.isNew && marker.place.placeId === state.selectedPlace.placeId){
                  selectedPlaceIndexInMarker = idX;
                }

                return marker.isNew === false;
          } );
        
          if(selectedPlaceIndexInMarker >= 0 && selectedPlaceIndexInPin >= 0){
             
              if(!state.isHover){
                 this.showDetailInfoWindow(this.markers[selectedPlaceIndexInMarker]);
              }
              else{
                this.hideDetailInfoWindow(this.markers[selectedPlaceIndexInMarker]);
                this.markers[selectedPlaceIndexInMarker].showInfoWindow = true;
              }
          }
          else if(selectedPlaceIndexInPin >= 0){

            const newMarker = new Marker(state.selectedPlace,false,true);
            this.markers.push(newMarker);
            this.showDetailInfoWindow(newMarker);
          }
          else if(selectedPlaceIndexInMarker >= 0) {
              this.markers[selectedPlaceIndexInMarker].isNew = true;
              this.showDetailInfoWindow(this.markers[selectedPlaceIndexInMarker]);
          }
          else{
            const newMarker = new Marker(state.selectedPlace,true,true);
            this.markers.push(newMarker);
            this.showDetailInfoWindow(newMarker);
          }
         }
         else if(state.city != null && state.city.lat && state.city.lat != 0  ){
          this.loaded = true;
          this.lat = state.city.lat;
          this.lng = state.city.lng;
          this.cityId = state.city.id;
          this.placeName  = "";
          this.zoom = 10;
          if(state.city.savedPlaces && state.city.savedPlaces.length !== this.savedPlaces.length ){
            this.markers = state.city.savedPlaces.map( (place:Place) => {
              return new Marker(place,false,false);
            } );

            this.savedPlaces = state.city.savedPlaces;
          }
          else if(this.markers) {
             this.markers.forEach( (marker:Marker) => {
                marker.showInfoWindow = false;
                marker.isNew = false;
             } );
          }
          this.ngProgress.done();
        }
        else if(state.city != null && state.loadingCity === false && this.loaded){
          this.ngProgress.start();   
          this.store.dispatch(new PlaceActions.StartLoadingCity());
          this.store.dispatch(new PlaceActions.GetCityLocation(state.city.id));
          this.loaded = false;
       }
    });

    this.store.select('auth').map((state:fromAuth.State) =>{
      return state.authorised;
    }).subscribe( (authorised:boolean) => {
      this.authorised = authorised;
    } );

  }

  boundsChange(event){

    if(this.blockActions) return;

    const latLngBounds = new google.maps.LatLngBounds(new google.maps.LatLng(event.getSouthWest().lat(), event.getSouthWest().lng())
                             , new google.maps.LatLng(event.getNorthEast().lat(),event.getNorthEast().lng()));
    this.store.dispatch(new PlaceActions.AddPlaceChangeListener({input:this.searchElementRef,boundary:latLngBounds}));

  }

  onSave(){

    if(this.blockActions) return;

    this.store.dispatch(new PlaceActions.StartSavingPlaceToServer());
    this.store.dispatch(new PlaceActions.SaveSelectedPlaceToServer());
  }

  onRemove(){

    if(this.blockActions) return;

    this.store.dispatch(new PlaceActions.StartRemovingPlaceFromServer());
    this.store.dispatch(new PlaceActions.RemoveSelectedPlaceFromServer());
  }

  infoWindowClosed(marker:Marker){
    marker.showInfoWindow = false;
  }

  placeSelected(marker:Marker){

    if(this.blockActions) return;

    this.showDetailInfoWindow(marker);
    this.store.dispatch(new PlaceActions.SetPlaceDetails({place:marker.place,isHover:false}));
  }

  showDetailInfoWindow(marker:Marker){
    if(this.blockActions) return;

    this.showDetailWindow = true;
      this.thumbnailActionConfig =  [ marker.isNew?this.iconAdd:this.iconRemove,this.iconMap];
      marker.showInfoWindow = true;
  }

  hideDetailInfoWindow(marker:Marker){
 
    this.showDetailWindow = false;
 
    if(marker) marker.showInfoWindow = false;
  }

  openInMap(marker:Marker){
       
      const urlToOpen = "https://www.google.com/maps/search/?api=1&query="+marker.place.lat+","+marker.place.lng+"&query_place_id="+marker.place.placeId;
      
      this.windowRef.getNativeWindow().open(urlToOpen);
  }

  onIconClicked($event , marker:Marker){

    if(this.blockActions) return;
 
    if($event === this.iconAdd.id){

        if(!this.authorised){
          this.store.dispatch(new AppActons.ShowModal(RegisterComponent));
          return;
        }
 
        this.thumbnailActionConfig = [this.iconProgress,this.iconMap];
        this.onSave();
    }
    else if($event === this.iconRemove.id){
        this.thumbnailActionConfig = [this.iconProgress,this.iconMap];
        this.onRemove();
    }
    else if($event === this.iconMap.id){
        this.openInMap(marker)
    }

  }

  onClicked(place:Place){
    if(this.blockActions) return;
    
    this.store.dispatch(new PlaceActions.SetPlaceToNavigate(place));
    
    this.router.navigate(["place",place.placeId] , {relativeTo:this.activeRoute});
  }

  closeMap() {
    this.closeMapView.emit();
  }

}
