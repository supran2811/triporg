import { Observable } from 'rxjs';
import {Store} from '@ngrx/store';
import { ActivatedRoute, Params } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { City } from '../models/city.model';
import * as fromApp from '../store/app.reducer';
import * as fromCity from '../home/store/city.reducer';

@Component({
  selector: 'app-place',
  templateUrl: './place.component.html',
  styleUrls: ['./place.component.css']
})
export class PlaceComponent implements OnInit {

  place:City;

  constructor(private activeRoute:ActivatedRoute,
                  private store:Store<fromApp.AppState>) { }

  ngOnInit() {
    console.log(Observable.range(1,5));
    this.activeRoute.params.subscribe( (params:Params) => {
          let  id = +params['id'];
          console.log(id);
          this.store.select('cities').take(1).subscribe((data:fromCity.State) => {
            this.place = data.cities.find( (city:City) => {
                return city.id === id;
            });
          })
    } )
  }

}
