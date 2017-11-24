import { ActivatedRoute, Params } from '@angular/router';
import { Store } from '@ngrx/store';
import { Component, ElementRef, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { NgProgress } from 'ngx-progressbar'
import { ViewChild } from '@angular/core';

import { Place } from '../../models/place.model';
import * as PlaceActions from '../store/place.action';
import * as fromPlaceReducer from '../store/place.reducer';
import { AfterViewInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { FormControl } from '@angular/forms';


@Component({
  selector: 'app-add-new-place',
  templateUrl: './add-new-place.component.html',
  styleUrls: ['./add-new-place.component.css']
})
export class AddNewPlaceComponent implements OnInit  {

  searchControl:FormControl;

  @ViewChild('search')
      searchElementRef:ElementRef;


  
  lat: number;
  lng: number;

  loaded = false;

  constructor(public ngProgress:NgProgress, 
                private store:Store<fromPlaceReducer.FeatureState>
              , private activeRoute:ActivatedRoute) { }

  ngOnInit() {
    this.load();
  }

  load(){
    
    this.store.select('place').subscribe((state:fromPlaceReducer.State) =>{

        console.log(state);
        if(state.lat != 0){
          this.loaded = true;
          this.lat = state.lat;
          this.lng = state.lng;
          this.ngProgress.done();
        }
        else{
          console.log("Coming here "+state.id);   
          this.ngProgress.start();   
          this.store.dispatch(new PlaceActions.GetCityLocation(state.id));
          this.loaded = false;
        }

        


    })

  }


  boundsChange(event){
    console.log("Bound change");
    console.log(event);

    console.log(event.getNorthEast().lat());
    console.log(event.getNorthEast().lng());
    console.log(event.getSouthWest().lat());
    console.log(event.getSouthWest().lng());
  
    const latLngBounds = new google.maps.LatLngBounds(new google.maps.LatLng(event.getSouthWest().lat(), event.getSouthWest().lng())
                             , new google.maps.LatLng(event.getNorthEast().lat(),event.getNorthEast().lng()));
    this.store.dispatch(new PlaceActions.AddPlaceChangeListener({input:this.searchElementRef,boundary:latLngBounds}));

  }
}
