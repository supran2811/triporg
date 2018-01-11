import { Component, OnInit ,ChangeDetectorRef} from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Store } from '@ngrx/store';

import { Place } from '../../models/place.model';
import * as PlaceActions from '../store/place.action';
import * as fromPlaceReducer from '../store/place.reducer';

@Component({
  selector: 'app-place-list',
  templateUrl: './place-list.component.html',
  styleUrls: ['./place-list.component.css']
})
export class PlaceListComponent implements OnInit {

  savedplaces : Observable<Place[]>
  showEmptySection:boolean = true;
  constructor(private store:Store<fromPlaceReducer.FeatureState>,
                  private changeDetectRef:ChangeDetectorRef) { }

  ngOnInit() {

    this.savedplaces = this.store.select('place').map((state:fromPlaceReducer.State) => {
        console.log("[PlaceList]","Check for saved places in city ",state.city);
        if( !state.city || !state.city.savedPlaces  || state.city.savedPlaces.length == 0){
          this.showEmptySection = true;
        }
        else{
          this.showEmptySection = false;
        }
        return (state.city && state.city.savedPlaces) || null;
    });

    this.savedplaces.take(1).subscribe( (places:Place[]) => {
      console.log("[PlaceList]","Retunring placess as ",places);
      if(places == null){
        console.log("[PlaceList]","Sending request to server to get place list");
        this.store.dispatch(new PlaceActions.GetSavedPlacesFrmServerByCity());
      }
    } );

  }

}
