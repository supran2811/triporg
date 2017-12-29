import { ActivatedRoute, Params } from '@angular/router';
import { Store } from '@ngrx/store';
import { Component, ElementRef, OnInit ,ViewChild,AfterViewInit} from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { NgProgress } from 'ngx-progressbar'
import { FormControl } from '@angular/forms';

import { GoogleMapsAPIWrapper } from '@agm/core';

import { Place } from '../../models/place.model';
import * as PlaceActions from '../store/place.action';
import * as fromPlaceReducer from '../store/place.reducer';
import * as fromAuth from '../../auth/store/auth.reducer';
import { WindowRefService } from '../../shared/windowRef.service';
import { GooglePlacesService } from '../../shared/google.places.service';
import {Marker} from '../../models/marker.model';

@Component({
  selector: 'app-add-new-place',
  templateUrl: './add-new-place.component.html',
  styleUrls: ['./add-new-place.component.css']
})
export class AddNewPlaceComponent implements OnInit , AfterViewInit  {

  searchControl:FormControl;


  @ViewChild('search')
      searchElementRef:ElementRef;

  authorised:boolean;
  
  lat: number;
  lng: number;
  cityId:string;
  selectedPlace : Place;
  loaded = false;
  showMarker = false;
  
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
                private windowRef:WindowRefService,
               private googlePlace : GooglePlacesService) { }

  ngOnInit() {
    this.load();
  }

  ngAfterViewInit(){
   
  }

  onMapReady(event){
    console.log("[onMapReady]",event);
    this.store.dispatch(new PlaceActions.GetCityDetails({id:this.cityId,map:event}));
  }

  load(){
    
    this.store.select('place').subscribe((state:fromPlaceReducer.State) =>{

        if(state.selectedPlace != null ){
          let selectedPlaceIndex = -1;
          this.markers = this.markers.filter((marker:Marker , idX:number) =>{
                marker.showInfoWindow = false;

                if(!marker.isNew && marker.place.placeId === state.selectedPlace.placeId){
                  selectedPlaceIndex = idX;
                }

                return marker.isNew === false;
          } );
          
          if(selectedPlaceIndex >= 0){
             
              if(!state.isHover){
                 this.showDetailInfoWindow(this.markers[selectedPlaceIndex]);
              }
              else{
                this.hideDetailInfoWindow(this.markers[selectedPlaceIndex]);
                this.markers[selectedPlaceIndex].showInfoWindow = true;
              }
              
          }
          else{
            const newMarker = new Marker(state.selectedPlace,true,true);
            this.markers.push(newMarker);
            this.showDetailInfoWindow(newMarker);
          }

        }
        else if(state.city != null && state.city.lat != 0){
          this.loaded = true;
          this.lat = state.city.lat;
          this.lng = state.city.lng;
          this.cityId = state.city.id;
          this.placeName  = "";
          
          if(state.city.savedPlaces){
            this.markers = state.city.savedPlaces.map( (place:Place) => {
              return new Marker(place,false,false);
            } );
          }
          
          this.ngProgress.done();
        }
        else if(state.city != null){
          this.ngProgress.start();   
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
    const latLngBounds = new google.maps.LatLngBounds(new google.maps.LatLng(event.getSouthWest().lat(), event.getSouthWest().lng())
                             , new google.maps.LatLng(event.getNorthEast().lat(),event.getNorthEast().lng()));
    this.store.dispatch(new PlaceActions.AddPlaceChangeListener({input:this.searchElementRef,boundary:latLngBounds}));

  }


  onSave(){
    console.log("Inside onSave!!!");

    this.store.dispatch(new PlaceActions.SaveSelectedPlaceToServer());
  }

  onRemove(){
    console.log("Inside onRemove!!!");
    this.store.dispatch(new PlaceActions.RemoveSelectedPlaceFromServer());
  }

  showErrorDialog(){
    alert("Please resgister or login!!!");
  }

  doAction(marker:Marker){
    if(!this.authorised){
      this.showErrorDialog();
    }
    else if(marker.isNew === true){
      this.onSave();
    }
    else{
      this.onRemove();
    }
  }

  infoWindowClosed(marker:Marker){
    console.log("[AddNewPlace]","info window closed!!");
    this.hideDetailInfoWindow(marker);
  }

  placeSelected(marker:Marker){
    console.log("Selected",marker);
    this.showDetailInfoWindow(marker);
    this.store.dispatch(new PlaceActions.SetPlaceDetails({place:marker.place,isHover:false}));
  }

  showDetailInfoWindow(marker:Marker){
    this.showDetailWindow = true;
      this.thumbnailActionConfig =  [ marker.isNew?this.iconAdd:this.iconRemove,this.iconMap];
      marker.showInfoWindow = true;
  }

  hideDetailInfoWindow(marker:Marker){
    this.showDetailWindow = false;
    marker.showInfoWindow = false;
  }

  openInMap(marker:Marker){
       
      const urlToOpen = "https://www.google.com/maps/search/?api=1&query="+marker.place.lat+","+marker.place.lng+"&query_place_id="+marker.place.placeId;
      
      this.windowRef.getNativeWindow().open(urlToOpen);
  }

  onIconClicked($event , marker:Marker){
    console.log("[AddNewPlace]","Clicked on "+$event);
    if($event === this.iconAdd.id){
        console.log("[AddNewPlace]","Handle onAdd clicked!!!");
    }
    else if($event === this.iconRemove.id){
        console.log("[AddNewPlace]","Handle onRemove clicked!!!");
    }
    else if($event === this.iconMap.id){
        console.log("[AddNewPlace]","Handle map clicked!!!");
        this.openInMap(marker)
    }

  }

}
