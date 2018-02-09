import { Component, OnInit ,ChangeDetectorRef , OnDestroy} from '@angular/core';
import { Observable,Subscription } from 'rxjs/Rx';
import { Store } from '@ngrx/store';

import { Place } from '../../models/place.model';
import * as PlaceActions from '../store/place.action';
import * as fromPlaceReducer from '../store/place.reducer';



@Component({
  selector: 'app-place-list',
  templateUrl: './place-list.component.html',
  styleUrls: ['./place-list.component.css']
})
export class PlaceListComponent implements OnInit,OnDestroy {

  savedplaces : Place[] = [];
  subscription:Subscription;
  showEmptySection:boolean = true;
  constructor(private store:Store<fromPlaceReducer.FeatureState>,
                  private changeDetectRef:ChangeDetectorRef) { 

                    console.log("[PlaceListComponent]","Inside constructor");
                  }

  ngOnInit() {
    console.log("[PlaceListComponent]","Inside onInit");
    this.subscription =  this.store.select('place').subscribe((state:fromPlaceReducer.State) => {
        console.log("[PlaceListComponent]","Check for saved places in city ",state.city);
        if( state.city != null  && state.city.savedPlaces != null && state.city.savedPlaces.length == 0 ){
          this.showEmptySection = true;
          this.savedplaces = state.city.savedPlaces || [];
        }
        else if(state.city != null){
          this.savedplaces = state.city.savedPlaces;
          this.showEmptySection = false;
          console.log("[PlaceListComponent] Coming here to enable show empty section");
        }

        if(state.city != null && state.city.savedPlaces == null && state.loadingPins === false){
          this.store.dispatch(new PlaceActions.StartLoadingPins());
          console.log("[PlaceListComponent] Calling GetSavedPlacesFrmServerByCity");
          this.store.dispatch(new PlaceActions.GetSavedPlacesFrmServerByCity());

        }

    });

  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }


}
