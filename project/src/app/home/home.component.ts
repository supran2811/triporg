import { Observable } from 'rxjs/Rx';



import { Router } from '@angular/router';
import { Component, NgModule, OnInit } from '@angular/core';
import {Store} from '@ngrx/store';

import * as fromCity from './store/city.reducer';
import * as fromApp from '../store/app.reducer';
import { City } from './../models/city.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {

  citiesData : Observable<fromCity.State>;

  selectedPlace:City;

  constructor(private store:Store<fromApp.AppState> , private router:Router) { }

  ngOnInit() {
    this.citiesData = this.store.select('cities');
  }

  selectPlace(){
    console.log(this.selectedPlace);
    this.router.navigate(['place',this.selectedPlace.id]);
  }

  formatList(city:City) : string {
    return city.getName();
  }
}
