import { ActivatedRoute, Params } from '@angular/router';
import { Store } from '@ngrx/store';
import { Component, ElementRef, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { NgProgress } from 'ngx-progressbar'
import { ViewChild } from '@angular/core';

import { Place } from '../../models/place.model';
import * as PlaceActions from '../store/place.action';
import * as fromPlaceReducer from '../store/place.reducer';


@Component({
  selector: 'app-add-new-place',
  templateUrl: './add-new-place.component.html',
  styleUrls: ['./add-new-place.component.css']
})
export class AddNewPlaceComponent implements OnInit {

  place:Place;

  @ViewChild('map') map:ElementRef;


  lat: number = 51.678418;
  lng: number = 7.809007;

  loaded = false;

  constructor(public ngProgress:NgProgress, 
                private store:Store<fromPlaceReducer.FeatureState>
              , private activeRoute:ActivatedRoute) { }

  ngOnInit() {
    this.load();
  }

  load(){
    
    this.store.select('place').subscribe((state:fromPlaceReducer.State) =>{

        console.log(state.selectedPlace);
        if(state.selectedPlace != null){
          this.place = state.selectedPlace;
          this.loaded = true;
          this.ngProgress.done();
        }
        else{
          console.log("Coming here "+state.id);      
          this.store.dispatch(new PlaceActions.GetPlaceDetails({id:state.id,map:this.map.nativeElement}));
        }


    })

  }

}
