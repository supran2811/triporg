
import { Observable } from 'rxjs/Rx';
import { Store } from '@ngrx/store';
import { Component, OnInit,Output ,EventEmitter } from '@angular/core';

import { City } from '../../models/city.model';
import * as fromApp from '../../store/app.reducer';
import * as fromPinnedView from './store/pinnedview.reducer';
import * as PinnedViewActions from './store/pinnedview.action';

@Component({
  selector: 'app-pinned-view',
  templateUrl: './pinned-view.component.html',
  styleUrls: ['./pinned-view.component.css']
})
export class PinnedViewComponent implements OnInit {

  pinnedCities: Observable<City[]>
  numOfCities : number  = 0;

  @Output() selectPinnedCity = new EventEmitter<City>();

  constructor(private store:Store<fromApp.AppState>) { }

  ngOnInit() {
    console.log("Sending request to get pinned city");
    this.store.dispatch(new PinnedViewActions.GetPinnedCitiesFromServer());

    this.pinnedCities = this.store.select('pinnedcities').map((state:fromPinnedView.State) => {
      this.numOfCities = state.cities.length;
      return state.cities;
    });


    

  }

  onSelect(city:City){
      console.log("[PinnedViewComponent]",city);
      this.selectPinnedCity.emit(city);
  }

}
