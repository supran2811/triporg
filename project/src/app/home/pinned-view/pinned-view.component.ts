
import { Observable } from 'rxjs/Rx';
import { Store } from '@ngrx/store';
import { Component, OnInit,Output ,EventEmitter } from '@angular/core';

import { City } from '../../models/city.model';
import * as fromApp from '../../store/app.reducer';
import * as fromPinnedView from './store/pinnedview.reducer';
import * as PinnedViewActions from './store/pinnedview.action';
import * as AppConstants from '../../shared/constants';

@Component({
  selector: 'app-pinned-view',
  templateUrl: './pinned-view.component.html',
  styleUrls: ['./pinned-view.component.css']
})
export class PinnedViewComponent implements OnInit {

  pinnedCities: Observable<City[]>
  
  numOfCities : number  = 0;

  title = AppConstants.PINNEDVIEW_TITLE;

  @Output() selectPinnedCity = new EventEmitter<City>();

  constructor(private store:Store<fromApp.AppState>) { }

  ngOnInit() {
    
    this.store.dispatch(new PinnedViewActions.GetPinnedCitiesFromServer());

    this.pinnedCities = this.store.select('pinnedcities').map((state:fromPinnedView.State) => {
      return state.cities;
    });

  }

  onSelect(city:City){
      this.selectPinnedCity.emit(city);
  }

}
