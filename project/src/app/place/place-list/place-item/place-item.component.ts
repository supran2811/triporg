import { Component, OnInit , Input , Output , EventEmitter} from '@angular/core';
import { Store } from '@ngrx/store';
import { ActivatedRoute,Router } from '@angular/router';

import { Place } from '../../../models/place.model';
import * as fromPlaceReduce from '../../store/place.reducer';
import * as PlaceActions from '../../store/place.action';
import { Marker } from '../../../models/marker.model';
import { WindowRefService } from '../../../shared/windowRef.service';

@Component({
  selector: 'app-place-item',
  templateUrl: './place-item.component.html',
  styleUrls: ['./place-item.component.css']
})
export class PlaceItemComponent implements OnInit {

  @Input() place:Place;
  @Input() shadow = false;;
  
  iconRemove = {id:"2",iconClass : ['fa','fa-minus-circle','fa-lg'].join(' ')};
  iconMap = {id:"3",iconClass : ['fa','fa-location-arrow','fa-lg'].join(' ')};
  iconProgress = {id:"4",iconClass : ['fa','fa-spinner','fa-pulse','fa-lg'].join(' ')};
  
  thumbnailActionConfig:{id:string,iconClass:string}[] = [this.iconRemove,this.iconMap];

  constructor(private store:Store<fromPlaceReduce.FeatureState>,
              private activatedRoute:ActivatedRoute,
              private router:Router
            ,private windowRef:WindowRefService) { }

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

  onRemove(){
    console.log("Inside onRemove!!!");
    this.store.dispatch(new PlaceActions.RemoveSelectedPlaceFromServer());
  }

  openInMap(){
       
    const urlToOpen = "https://www.google.com/maps/search/?api=1&query="+this.place.lat+","+this.place.lng+"&query_place_id="+this.place.placeId;
    
    this.windowRef.getNativeWindow().open(urlToOpen);
}

  onIconClicked($event){
    console.log("[PlaceItemComponent]","Clicked on "+$event);
    if($event === this.iconRemove.id){
        console.log("[PlaceItemComponent]","Handle onRemove clicked!!!");
        this.thumbnailActionConfig = [this.iconProgress,this.iconMap];
        this.onRemove();
    }
    else if($event === this.iconMap.id){
        console.log("[PlaceItemComponent]","Handle map clicked!!!");
        this.openInMap();
    }

  }
}
