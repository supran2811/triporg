
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

  pinnedViewState: Observable<fromPinnedView.State>
  
  numOfCities : number  = 0;

  @Output() selectPinnedCity = new EventEmitter<City>();

  constructor(private store:Store<fromApp.AppState>) { }

  ngOnInit() {
    
    this.store.dispatch(new PinnedViewActions.StartLoadingPins());
    this.store.dispatch(new PinnedViewActions.GetPinnedCitiesFromServer());

    this.pinnedViewState = this.store.select('pinnedcities');

    this.pinnedViewState.subscribe( (state:fromPinnedView.State) => {
         if(state.error != null){
            this.store.dispatch(new PinnedViewActions.GetPinnedCitiesFromServer());
         }
    } )
  }

  onSelect(city:City){
      this.selectPinnedCity.emit(city);
  }

}
