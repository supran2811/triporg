import { Component, OnInit , OnDestroy} from '@angular/core';
import { Observable,Subscription } from 'rxjs/Rx';
import { Store } from '@ngrx/store';

import { Place } from '../../models/place.model';
import * as PlaceActions from '../store/place.action';
import * as fromPlaceReducer from '../store/place.reducer';
import * as AppConstants from '../../shared/constants';

@Component({
  selector: 'app-place-list',
  templateUrl: './place-list.component.html',
  styleUrls: ['./place-list.component.css']
})
export class PlaceListComponent implements OnInit,OnDestroy {

  savedplaces : Place[] = [];
  subscription:Subscription;
  showEmptySection:boolean = true;
  showLoading = false;
  emptyMessage = AppConstants.PLACE_NOT_PINNED;
  
  constructor(private store:Store<fromPlaceReducer.FeatureState>) {}

  ngOnInit() {
    this.subscription =  this.store.select('place').subscribe((state:fromPlaceReducer.State) => {
        if(state.loadingPins === true){
          this.showLoading = true;
          this.showEmptySection = false;
          if(state.error != null){
             this.store.dispatch(new PlaceActions.GetSavedPlacesFrmServerByCity());
          }
        }
        else if( state.city != null  && state.city.savedPlaces != null && state.city.savedPlaces.length == 0 ){
          this.showEmptySection = true;
          this.showLoading = false;
          this.savedplaces = state.city.savedPlaces || [];
        }
        else if(state.city != null){
          this.savedplaces = state.city.savedPlaces;
          this.showEmptySection = false;
          this.showLoading = false;
        }

        if(state.city != null && state.city.savedPlaces == null && state.loadingPins === false){
          this.store.dispatch(new PlaceActions.StartLoadingPins());
          this.store.dispatch(new PlaceActions.GetSavedPlacesFrmServerByCity());
        }
    });
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
}
