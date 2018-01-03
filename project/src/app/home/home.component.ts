import { Observable } from 'rxjs/Rx';
import { Router } from '@angular/router';
import { Component, NgModule, OnInit } from '@angular/core';
import {Store} from '@ngrx/store';


import * as fromApp from '../store/app.reducer';
import * as fromPinned from './pinned-view/store/pinnedview.reducer';
import * as PinnedActions from './pinned-view/store/pinnedview.action';
import * as fromPlaceReducer from '../place/store/place.reducer';
import * as PlaceActions from '../place/store/place.action';

import { City } from './../models/city.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {

  
  
  pinnedCities : City[];

  constructor(private store:Store<fromPlaceReducer.FeatureState> , private router:Router) { }

  ngOnInit() {
    
    this.store.select('pinnedcities').subscribe((state:fromPinned.State) =>{
          this.pinnedCities = state.cities;
    })

  }


  selectPinnedCity(selectedCity:City){
    if(this.pinnedCities != null){
      let city = this.pinnedCities.find((city:City) => {
        return city.id === selectedCity.id
      })
      
     // this.store.dispatch(new PlaceActions.SetCity(city));
     if(city != null && city != undefined){
      console.log("[HomeComponent]","Setting pinned city "+city);
      this.store.dispatch(new PinnedActions.SetSelectedPinnedCity(city));
     }
    }
    this.router.navigate(['city',selectedCity.id]);
  }

  selectCity(selectedItem:any){
    console.log("[HomeComponent] Inside selectCity ",selectedItem);

    const name = selectedItem.structured_formatting && 
                          selectedItem.structured_formatting.main_text?
                          selectedItem.structured_formatting.main_text:
                          selectedItem.description;

    const id = selectedItem.place_id;
    console.log("id",id);
    let selectedCity = new City(id,name);

    this.selectPinnedCity(selectedCity);
  }

  formatList(city:City) : string {
    return city.name;
  }

  autoCompleteCallback1(data){
    console.log("Result ",data);
  }
 
}
