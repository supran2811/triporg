import { Observable } from 'rxjs/Rx';
import { Router } from '@angular/router';
import { Component ,OnInit } from '@angular/core';
import {Store} from '@ngrx/store';

import * as fromAuth from '../auth/store/auth.reducer';
import * as fromPinned from './pinned-view/store/pinnedview.reducer';
import * as PinnedActions from './pinned-view/store/pinnedview.action';
import * as fromApp from '../store/app.reducer';
import { City } from './../models/city.model';
import * as AppConstants from '../shared/constants';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {

  isAuth:Observable<boolean>; 
  appTitle = AppConstants.APP_TITLE;

  constructor(private store:Store<fromApp.AppState> , private router:Router) { }

  ngOnInit(){
    this.isAuth = this.store.select('auth').map( (state:fromAuth.State) => (state.authorised));
  }

  selectPinnedCity(selectedCity:City){
    this.store.select('pinnedcities').take(1).subscribe((state:fromPinned.State) =>{
      let city = state.cities.find((city:City) => (selectedCity.id === city.id))  || selectedCity ;
      this.store.dispatch(new PinnedActions.SetSelectedPinnedCity(city));
      this.router.navigate(['city',selectedCity.id]);     
    })
  }

  selectCity(selectedItem:any){
    console.log("[HomeComponent]","Select pinned city",selectedItem);
    const name = selectedItem.structured_formatting && 
                          selectedItem.structured_formatting.main_text?
                          selectedItem.structured_formatting.main_text:
                          selectedItem.description;

    const id = selectedItem.place_id;
    let selectedCity = new City(id,name);
    this.selectPinnedCity(selectedCity);
  }

}
