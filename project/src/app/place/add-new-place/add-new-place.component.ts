import { ActivatedRoute, Params } from '@angular/router';
import { Store } from '@ngrx/store';
import { Component, ElementRef, OnInit ,ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { NgProgress } from 'ngx-progressbar'
import { FormControl } from '@angular/forms';

import { Place } from '../../models/place.model';
import * as PlaceActions from '../store/place.action';
import * as fromPlaceReducer from '../store/place.reducer';
import * as fromAuth from '../../auth/store/auth.reducer';
import { WindowRefService } from '../../shared/windowRef.service';

@Component({
  selector: 'app-add-new-place',
  templateUrl: './add-new-place.component.html',
  styleUrls: ['./add-new-place.component.css']
})
export class AddNewPlaceComponent implements OnInit  {

  searchControl:FormControl;


  @ViewChild('search')
      searchElementRef:ElementRef;

  authorised:boolean;
  
  lat: number;
  lng: number;
  selectedPlace : Place;
  loaded = false;
  showMarker = false;
  showInfoWindow = false;
  zoom:number = 10;
  isNew:boolean = false;
  placeName:string = "";

  constructor(public ngProgress:NgProgress, 
                private store:Store<fromPlaceReducer.FeatureState>
              , private activeRoute:ActivatedRoute,
                private windowRef:WindowRefService) { }

  ngOnInit() {
    this.load();
  }

  load(){
    
    this.store.select('place').subscribe((state:fromPlaceReducer.State) =>{

        if(state.selectedPlace != null ){
          this.lat = state.selectedPlace.lat;
          this.lng = state.selectedPlace.lng;
          this.selectedPlace = state.selectedPlace;
          this.showMarker = true;
          this.showInfoWindow = true;
          this.placeName  = "";
          
          let index = state.city.savedPlaces.findIndex( (place:Place) => {
            return place.placeId == state.selectedPlace.placeId;
          } );

          this.isNew = index == -1;

          console.log("Selected item index "+ index);

        }
        else if(state.city != null && state.city.lat != 0){
          this.loaded = true;
          this.lat = state.city.lat;
          this.lng = state.city.lng;
          this.showMarker = false;
          this.showInfoWindow = false;
          this.placeName  = "";
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
    
    console.log(event);

    console.log(event.getNorthEast().lat());
    console.log(event.getNorthEast().lng());
    console.log(event.getSouthWest().lat());
    console.log(event.getSouthWest().lng());
  
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

  doAction(){
    if(!this.authorised){
      this.showErrorDialog();
    }
    else if(this.isNew === true){
      this.onSave();
    }
    else{
      this.onRemove();
    }
  }

  openInMap(){
       
      const urlToOpen = "https://www.google.com/maps/search/?api=1&query="+this.lat+","+this.lng+"&query_place_id="+this.selectedPlace.placeId;
      
      this.windowRef.getNativeWindow().open(urlToOpen);
  }

}
