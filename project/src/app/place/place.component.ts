
import { Observable } from 'rxjs';
import {Store} from '@ngrx/store';
import { ActivatedRoute, Params, Router , ActivatedRouteSnapshot } from '@angular/router';
import { Component, OnInit ,OnDestroy ,ChangeDetectorRef,NgZone } from '@angular/core';
import { NgProgress } from 'ngx-progressbar';

import { City } from '../models/city.model';
import * as fromPlaceReducer from './store/place.reducer'
import * as fromPinnedReducer from '../home/pinned-view/store/pinnedview.reducer';
import * as PlaceActions from './store/place.action';
import * as PinnedViewActions from '../home/pinned-view/store/pinnedview.action';
import { Subscription } from 'rxjs/Subscription';


@Component({
  selector: 'app-place',
  templateUrl: './place.component.html',
  styleUrls: ['./place.component.css']
})
export class PlaceComponent implements OnInit , OnDestroy {

  isLoading = false;
  subscription:Subscription;
  pinnedViewSubscription :Subscription;
  showMap = false;

  constructor(private activeRoute:ActivatedRoute,
                  private store:Store<fromPlaceReducer.FeatureState>,
                  private router:Router,
                  private ngProgress:NgProgress,
                  private changeDetector : ChangeDetectorRef,
                  private zone:NgZone) { 
                
    setTimeout( () => {
          this.zone.run(() => {
            this.changeDetector.detectChanges();
          })
            
    },0 )
  }

  ngOnInit() {
    
    this.isLoading = true;
    this.ngProgress.start();

     this.store.select('pinnedcities').take(1).subscribe((state:fromPinnedReducer.State)=>{
      if(state.selectedCity != null){
          this.store.dispatch(new PlaceActions.SetCity(state.selectedCity));
      }
    });
 
    this.subscription = this.store.select('place').subscribe((state:fromPlaceReducer.State) => {
      if(state.city != null && state.city.lat){
            this.ngProgress.done();
            this.isLoading = false;
          }
          else if(state.city != null){
            this.loadCity(state.city.id);
          }
          else{
            this.loadCity(null);
          }
    });
  }
  
  loadCity(cityId){
    let id = cityId || this.activeRoute.snapshot.params['id'];
    this.store.dispatch(new PlaceActions.GetCityLocation(id));
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
    this.store.dispatch(new PlaceActions.ResetState());
    this.store.dispatch(new PinnedViewActions.ResetSelectedPinnedCity());
  }

  addNewPlaceAction() {
    this.showMap = true;
    window.scrollTo(0,0);
  }

  closeMap() {
    this.showMap = false;
  }
}
