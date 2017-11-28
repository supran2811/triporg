import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Store } from '@ngrx/store';

import { Place } from '../../models/place.model';
import * as fromPlaceReducer from '../store/place.reducer';

@Component({
  selector: 'app-place-list',
  templateUrl: './place-list.component.html',
  styleUrls: ['./place-list.component.css']
})
export class PlaceListComponent implements OnInit {

  savedplaces : Observable<Place[]>

  constructor(private store:Store<fromPlaceReducer.FeatureState>) { }

  ngOnInit() {

    this.savedplaces = this.store.select('place').map((state:fromPlaceReducer.State) => {
         return state.savedPlaces;
    })
  }

}
