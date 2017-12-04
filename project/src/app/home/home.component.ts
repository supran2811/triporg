import { Observable } from 'rxjs/Rx';
import { Router } from '@angular/router';
import { Component, NgModule, OnInit } from '@angular/core';
import {Store} from '@ngrx/store';


import * as fromCity from './store/city.reducer';
import * as CityActions from './store/city.action';
import * as fromApp from '../store/app.reducer';
import * as fromPinned from '../home/pinned-view/store/pinnedview.reducer';
import * as PlaceActions from '../place/store/place.action';
import { City } from './../models/city.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {

  
  observableSource:any;
  
  citiesSource : Observable<City[]>;
  

  selectedCity:City;

  pinnedCities : City[];

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

    this.store.select('pinnedcities').subscribe((state:fromPinned.State) =>{
          this.pinnedCities = state.cities;
    })

  }

  selectPlace(){
    if(this.pinnedCities != null){
      let city = this.pinnedCities.find((city:City) => {
        return city.id === this.selectedCity.id
      })
      console.log("[HomeComponent]","Setting city ");
      this.store.dispatch(new PlaceActions.SetCity(city));
    }
    this.router.navigate(['place',this.selectedCity.id]);
  }

  formatList(city:City) : string {
    return city.name;
  }

 
}
