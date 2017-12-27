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
  showInfoWindow = false;
  zoom:number = 10;
  isNew:boolean = false;
  placeName:string = "";

  markers:Marker[] = [];


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
          let index = -1;
          this.markers = this.markers.map( (marker:Marker,idX) =>{
                 marker.showInfoWindow = false;
                 if(marker.place.placeId === state.selectedPlace.placeId){
                    index = idX;
                 }
                 return marker;
          } );

          
          if(index === -1){
            this.markers.push(new Marker(state.selectedPlace,
                                      true,true));
          }

          else{
              this.markers[index].showInfoWindow = true;
              if(state.city.savedPlaces){
                  let idX = state.city.savedPlaces.findIndex((place:Place)=>{
                       return this.markers[index].place.placeId === place.placeId
                  });
                  if(idX >= 0){
                    this.markers[index].isNew = false;
                  }
                  else{
                    this.markers[index].isNew = true;
                  }
              }
              else{
                this.markers[index].isNew = true;
              }
          }

          console.log("Selected item index "+ index);

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

  placeSelected(marker:Marker){
    console.log("Selected",marker);
    
    this.store.dispatch(new PlaceActions.SetPlaceDetails(marker.place));
  }

  openInMap(){
       
      const urlToOpen = "https://www.google.com/maps/search/?api=1&query="+this.lat+","+this.lng+"&query_place_id="+this.selectedPlace.placeId;
      
      this.windowRef.getNativeWindow().open(urlToOpen);
  }

}
