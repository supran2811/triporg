
import { Observable , Subscription} from 'rxjs/Rx';
import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot,Router,NavigationEnd } from '@angular/router';
import { Location } from '@angular/common';

import { User } from '../models/user.model';
import * as fromApp from '../store/app.reducer';
import * as fromAuth from '../auth/store/auth.reducer';
import * as fromPinned from '../home/pinned-view/store/pinnedview.reducer';
import * as AuthActions from '../auth/store/auth.action';
import * as PinnedActions from '../home/pinned-view/store/pinnedview.action';
import * as AppActions from '../store/app.actions';
import { LoginComponent } from '../auth/login/login.component';
import { RegisterComponent } from '../auth/register/register.component';
import { City } from '../models/city.model';
import * as AppConstants from '../shared/constants';



@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  authState:Observable<fromAuth.State>;
  cityName:Observable<string>;

  HOME_URL = "/";
  appName     = AppConstants.APP_NAME;
  signInLabel = AppConstants.SIGN_IN;
  signUpLabel = AppConstants.SIGN_UP;
  logOutLabel = AppConstants.LOGOUT;

  subscription :Subscription;

  currentUrl:string = this.HOME_URL;


  constructor(private store:Store<fromApp.AppState>,
              private location:Location,
               private router:Router,
              private route:ActivatedRoute
            ) {
              
             }

  ngOnInit() {
    this.authState = this.store.select('auth');
    
    this.cityName = this.store.select('pinnedcities').map( (state:fromPinned.State) => {
           return state.selectedCity ? state.selectedCity.name : "";
    } )

    this.router.events.forEach((event) => {
      if(event instanceof NavigationEnd){
        console.log("[Header]",event.url);
        this.currentUrl = event.url;
      }
    });
  }

  logOut(){
    this.store.dispatch(new AuthActions.DoLogoutAction());
  }

  logIn(){
    this.store.dispatch(new AppActions.ShowModal(LoginComponent));
  }
  

 register(){
   this.store.dispatch(new AppActions.ShowModal(RegisterComponent));
  }

  goBack(){
   this.location.back();
  }



}
