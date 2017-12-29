import { Component, OnInit , Input , Output , EventEmitter} from '@angular/core';
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
  @Input() shadow = false;;
  //@Output() hovered = new EventEmitter();

  constructor(private store:Store<fromPlaceReduce.FeatureState>,
              private activatedRoute:ActivatedRoute,
              private router:Router) { }

  ngOnInit() {
    console.log("[PlaceItemComponent]",this.place.photos , this.shadow);
  }

  onSelected(){
    // this.store.dispatch(new PlaceActions.SetPlaceDetails(this.place));
    // this.router.navigate(['new','place'],{relativeTo:this.activatedRoute});
  }

  onHover(){
    console.log("Inside onHover of "+this.place.displayName);
    this.store.dispatch(new PlaceActions.SetPlaceDetails({place:this.place,isHover:true}));
  }
}
