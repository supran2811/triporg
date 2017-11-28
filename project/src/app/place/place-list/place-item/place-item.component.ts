import { Component, OnInit , Input} from '@angular/core';
import { Store } from '@ngrx/store';

import { Place } from '../../../models/place.model';
import * as fromPlaceReduce from '../../store/place.reducer';
import * as PlaceActions from '../../store/place.action';

@Component({
  selector: 'app-place-item',
  templateUrl: './place-item.component.html',
  styleUrls: ['./place-item.component.css']
})
export class PlaceItemComponent implements OnInit {

  @Input() place:Place;

  constructor(private store:Store<fromPlaceReduce.FeatureState>) { }

  ngOnInit() {

  }

  onSelected(){
    this.store.dispatch(new PlaceActions.SetPlaceDetails(this.place));
  }

}
