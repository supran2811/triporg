import { Component, 
            OnInit , 
            OnDestroy , 
            Input} from '@angular/core';
import { Store } from '@ngrx/store';
import { ActivatedRoute,Router } from '@angular/router';

import { Place } from '../../../models/place.model';
import * as fromPlaceReducer from '../../store/place.reducer';
import * as PlaceActions from '../../store/place.action';
import { Marker } from '../../../models/marker.model';
import { WindowRefService } from '../../../shared/windowRef.service';
import { Subscription } from 'rxjs/Rx';




@Component({
  selector: 'app-place-item',
  templateUrl: './place-item.component.html',
  styleUrls: ['./place-item.component.css']
})
export class PlaceItemComponent implements OnInit,OnDestroy  {

  @Input() place:Place;
  @Input() shadow = false;;
  blockActions  = false;
  subscription:Subscription;

  iconRemove = {id:"2",iconClass : ['fa','fa-minus-circle','fa-lg'].join(' ')};
  iconMap = {id:"3",iconClass : ['fa','fa-location-arrow','fa-lg'].join(' ')};
  iconProgress = {id:"4",iconClass : ['fa','fa-spinner','fa-pulse','fa-lg'].join(' ')};
  
  thumbnailActionConfig:{id:string,iconClass:string}[] = [this.iconRemove,this.iconMap];

  constructor(private store:Store<fromPlaceReducer.FeatureState>,
              private activatedRoute:ActivatedRoute,
              private router:Router
            ,private windowRef:WindowRefService) { }

  ngOnInit() {
    console.log("[PlaceItemComponent]",this.place.photos , this.shadow);
     this.subscription = this.store.select('place').subscribe( (state:fromPlaceReducer.State) =>{
          this.blockActions = state.savingPins || state.removingPins;
     } )
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

  onHover(){
      if(this.blockActions) return;

      console.log("Inside onHover of "+this.place.displayName);
     this.store.dispatch(new PlaceActions.SetPlaceDetails({place:this.place,isHover:true}));
   }

  onMouseLeave(){
    if(this.blockActions) return;

    this.store.dispatch(new PlaceActions.ResetSelectedPlace());
  }

  onClicked(){
    console.log("[Placeitem] ",this.blockActions);
      if(this.blockActions) return;

      
       this.store.dispatch(new PlaceActions.SetPlaceToNavigate(this.place));
       
       this.router.navigate(["place",this.place.placeId],{relativeTo:this.activatedRoute});
       
  }

  onRemove(){
    if(this.blockActions) return;

    console.log("Inside onRemove!!!");
     this.store.dispatch(new PlaceActions.StartRemovingPlaceFromServer());
     this.store.dispatch(new PlaceActions.RemoveSelectedPlaceFromServer());
  }

  openInMap(){
       
    const urlToOpen = "https://www.google.com/maps/search/?api=1&query="+this.place.lat+","+this.place.lng+"&query_place_id="+this.place.placeId;
    
    this.windowRef.getNativeWindow().open(urlToOpen);
}

  onIconClicked($event){
    console.log("[PlaceItemComponent]","Clicked on "+$event);

    if(this.blockActions) return;

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
