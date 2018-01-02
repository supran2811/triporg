
import { Observable } from 'rxjs/Rx';
import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot,Router,NavigationEnd } from '@angular/router';
import { Location } from '@angular/common';

import { User } from '../models/user.model';
import * as fromApp from '../store/app.reducer';
import * as fromAuth from '../auth/store/auth.reducer';
import * as AuthActions from '../auth/store/auth.action';



@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  authState:Observable<fromAuth.State>;
  HOME_URL = "/";

  currentUrl:string = this.HOME_URL;


  constructor(private store:Store<fromApp.AppState>,
              private location:Location,
               private router:Router,
              private route:ActivatedRoute,
            ) { }

  ngOnInit() {
    this.authState = this.store.select('auth');
    this.router.events.forEach((event) => {
      if(event instanceof NavigationEnd){
        console.log("[Header]",event.url);
        this.currentUrl = event.url;
      }
    });
  }

  logOut(){
    console.log("Logging out");
    this.store.dispatch(new AuthActions.DoLogoutAction());
  }

  logIn(){
    const returnUrl = this.location.path();
    this.router.navigate(["/login"],{queryParams:{returnUrl:returnUrl}});
  }
  

 register(){
    const returnUrl = this.location.path();
    this.router.navigate(["/register"],{queryParams:{returnUrl:returnUrl}});
  }

  goBack(){
   this.location.back();
  }
}
