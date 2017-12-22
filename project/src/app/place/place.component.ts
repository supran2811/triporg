
import { Observable } from 'rxjs';
import {Store} from '@ngrx/store';
import { ActivatedRoute, Params, Router} from '@angular/router';
import { Component, OnInit ,OnDestroy } from '@angular/core';
import { NgProgress } from 'ngx-progressbar';

import { City } from '../models/city.model';
import * as fromPlaceReducer from './store/place.reducer'
import * as fromPinnedReducer from '../home/pinned-view/store/pinnedview.reducer';
import * as PlaceActions from './store/place.action';
import { CacheStateService } from '../shared/cache.state.service';
import { Subscription } from 'rxjs/Subscription';


@Component({
  selector: 'app-place',
  templateUrl: './place.component.html',
  styleUrls: ['./place.component.css']
})
export class PlaceComponent implements OnInit , OnDestroy {

  city:Observable<City>;
  isLoading = false;
  cacheState:CacheStateService;
  subscription:Subscription;

  config: SwiperOptions = {
    pagination: '.swiper-pagination',
    paginationClickable: true,
    nextButton: '.swiper-button-next',
    prevButton: '.swiper-button-prev',
    spaceBetween: 0
  };


  constructor(private activeRoute:ActivatedRoute,
                  private store:Store<fromPlaceReducer.FeatureState>,
                private router:Router,
              private ngProgress:NgProgress) { }

  ngOnInit() {

    console.log("[PlaceComponent]","Loading111");
    this.isLoading = true;
    this.ngProgress.start();

    const myStore = this.store.select('place');

    this.cacheState = new CacheStateService(myStore,'place');
    this.cacheState.saveState();

     this.store.select('pinnedcities').take(1).subscribe((state:fromPinnedReducer.State)=>{
        console.log("[PlaceComponent] selected pinned city",state.selectedCity);
        if(state.selectedCity != null){
            this.store.dispatch(new PlaceActions.SetCity(state.selectedCity));
        }
     });

    this.city = myStore.map((state:fromPlaceReducer.State) => {
           return state.city;
    });
    console.log("[PlaceComponent]","adding subscription");
    (this.subscription = this.city.subscribe((city:City) => {
          console.log("[PlaceComponent]","Coming inside city observable",city);
          if(city != null && city.lat){
            this.ngProgress.done();
           
            this.isLoading = false;
          }
          else{
            this.loadCity();
          }
    }));
    
  }

  loadCity(){
    this.activeRoute.params.subscribe( (params:Params) => {
      let  id = params['id'];
      console.log("[PlaceComponent]",id);

      
      this.store.dispatch(new PlaceActions.GetCityLocation(id));
    } );
  }

  addNewPlace() {
    this.store.dispatch(new PlaceActions.ResetSelectedPlace());
    this.router.navigate(['new','place'],{relativeTo:this.activeRoute});
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
   
    this.store.dispatch(new PlaceActions.ResetState());
    this.cacheState.stop();
    
  }
}
