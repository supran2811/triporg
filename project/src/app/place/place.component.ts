import { SetPlaceId } from './store/place.action';
import { Observable } from 'rxjs';
import {Store} from '@ngrx/store';
import { ActivatedRoute, Params } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { City } from '../models/city.model';
import * as fromApp from '../store/app.reducer';
import * as fromCity from '../home/store/city.reducer';
import * as PlaceActions from './store/place.action';

@Component({
  selector: 'app-place',
  templateUrl: './place.component.html',
  styleUrls: ['./place.component.css']
})
export class PlaceComponent implements OnInit {

  city:Observable<City>;

  constructor(private activeRoute:ActivatedRoute,
                  private store:Store<fromApp.AppState>) { }

  ngOnInit() {
    
    this.activeRoute.params.subscribe( (params:Params) => {
          let  id = params['id'];
          console.log(id);
          this.city = this.store.select('cities').map((data:fromCity.State) => {
             return data.cities.find( (city:City) => {
                return city.getId() === id;
            });
          });

          this.store.dispatch(new SetPlaceId(id));
    } )
  }

}
