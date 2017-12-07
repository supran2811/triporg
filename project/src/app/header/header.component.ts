
import { Observable } from 'rxjs/Rx';
import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot,Router } from '@angular/router';
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



  constructor(private store:Store<fromApp.AppState>,
              private location:Location,
               private router:Router) { }

  ngOnInit() {
    this.authState = this.store.select('auth');

  }

  logOut(){
    console.log("Logging out");
    this.store.dispatch(new AuthActions.DoLogoutAction());
  }

  logIn(){
    const returnUrl = this.location.path();
    this.router.navigate(["/login"],{queryParams:{returnUrl:returnUrl}});
  }
  

  
}
