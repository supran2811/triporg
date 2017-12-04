
import { Observable } from 'rxjs';
import {Store} from '@ngrx/store';
import { ActivatedRoute, Params, Router} from '@angular/router';
import { Component, OnInit ,OnDestroy } from '@angular/core';
import { NgProgress } from 'ngx-progressbar';

import { City } from '../models/city.model';
import * as fromPlaceReducer from './store/place.reducer'
import * as PlaceActions from './store/place.action';


@Component({
  selector: 'app-place',
  templateUrl: './place.component.html',
  styleUrls: ['./place.component.css']
})
export class PlaceComponent implements OnInit , OnDestroy {

  city:Observable<City>;
  isLoading = false;

  constructor(private activeRoute:ActivatedRoute,
                  private store:Store<fromPlaceReducer.FeatureState>,
                private router:Router,
              private ngProgress:NgProgress) { }

  ngOnInit() {


    this.isLoading = true;
    this.ngProgress.start();
    



    this.city = this.store.select('place').map((state:fromPlaceReducer.State) => {
           return state.city;
    });
    this.city.subscribe((city:City) => {
          console.log("[PlaceComponent]","Coming inside city observable",city);
          if(city != null){
            this.ngProgress.done();
            this.isLoading = false;
          }
          else{
            this.activeRoute.params.subscribe( (params:Params) => {
              let  id = params['id'];
              console.log("[PlaceComponent]",id);
              this.store.dispatch(new PlaceActions.GetCityLocation(id));
            } );
          }
    })
    
  }

  addNewPlace() {
    this.store.dispatch(new PlaceActions.ResetSelectedPlace());
    this.router.navigate(['new','place'],{relativeTo:this.activeRoute});
  }

  ngOnDestroy(){
    this.store.dispatch(new PlaceActions.ResetState());
  }
}
