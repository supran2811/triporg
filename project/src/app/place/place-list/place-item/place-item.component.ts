import { Component, OnInit , Input} from '@angular/core';
import { Store } from '@ngrx/store';
import { ActivatedRoute,Router } from '@angular/router';

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

  constructor(private store:Store<fromPlaceReduce.FeatureState>,
              private activatedRoute:ActivatedRoute,
              private router:Router) { }

  ngOnInit() {
    console.log("[PlaceItemComponent]",this.place.photos);
  }

  onSelected(){
    this.store.dispatch(new PlaceActions.SetPlaceDetails(this.place));
    this.router.navigate(['new','place'],{relativeTo:this.activatedRoute});
  }

  onHover(){
    console.log("Inside onHover of "+this.place.displayName);
  }
}
