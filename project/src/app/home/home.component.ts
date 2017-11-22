import { Observable } from 'rxjs/Rx';
import { Router } from '@angular/router';
import { Component, NgModule, OnInit } from '@angular/core';
import {Store} from '@ngrx/store';


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
  
  citiesSource : Observable<City[]>;
  

  selectedPlace:City;

  constructor(private store:Store<fromApp.AppState> , private router:Router) { }

  ngOnInit() {

    this.citiesSource = this.store.select('cities')
    .map((state:fromCity.State) => state.cities);

    this.observableSource = (keyword: any): Observable<any[]> => {
      if (keyword && keyword.length > 2) {
        
        this.store.dispatch(new CityActions.SearchCityList(keyword));

      }

      return this.citiesSource;
    }

  }

  selectPlace(){
    this.router.navigate(['place',this.selectedPlace.getId()]);
  }

  formatList(city:City) : string {
    return city.getName();
  }

 
}
