import { Observable } from 'rxjs/Rx';
import { Router } from '@angular/router';
import { Component, NgModule, OnInit } from '@angular/core';
import {Store} from '@ngrx/store';

import { GooglePlacesService } from './../shared/google.places.service';
import * as fromCity from './store/city.reducer';
import * as CityActions from './store/city.action';
import * as fromApp from '../store/app.reducer';
import { City } from './../models/city.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {

  
  observableSource:any;

  selectedPlace:City;

  constructor(private store:Store<fromApp.AppState> , private router:Router
     ,private googlePlace : GooglePlacesService) { }

  ngOnInit() {

    this.observableSource = (keyword: any): Observable<any[]> => {
      if (keyword) {
        return this.store.select('cities')
          .map((state:fromCity.State) => {
            return state.cities;
          })
      } else {
        return Observable.of([]);
      }
    }

  }

  selectPlace(){
    console.log(this.selectedPlace);
    this.router.navigate(['place',this.selectedPlace.getId()]);
  }

  formatList(city:City) : string {
    return city.getName();
  }

  onChange($event){
      if($event.length > 1){
        console.log("Request send");
        this.store.dispatch(new CityActions.SearchCityList($event));
         

      }
  }
}
