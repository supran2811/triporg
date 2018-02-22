
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

  city:Observable<City>;
  isLoading = false;
  subscription:Subscription;
  pinnedViewSubscription :Subscription;



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
      console.log("[PlaceComponent] selected pinned city",state.selectedCity);
      if(state.selectedCity != null){
          this.store.dispatch(new PlaceActions.SetCity(state.selectedCity));
      }
    });

    this.city = this.store.select('place').map((state:fromPlaceReducer.State) => {
           return state.city;
    });
    
    this.subscription = this.city.subscribe((city:City) => {
    
      if(city != null && city.lat){
            this.ngProgress.done();
            this.isLoading = false;
          }
          else if(city != null){
            this.loadCity(city.id);
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

  addNewPlace() {
    this.store.dispatch(new PlaceActions.ResetSelectedPlace());
    this.router.navigate(['new','place'],{relativeTo:this.activeRoute});
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
    this.store.dispatch(new PinnedViewActions.ResetSelectedPinnedCity());
    this.store.dispatch(new PlaceActions.ResetState());
  }
}
