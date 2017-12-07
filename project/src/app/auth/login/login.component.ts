import { ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { Store } from '@ngrx/store';
import { NgForm } from '@angular/forms/src/directives';
import { Component, OnDestroy, OnInit } from '@angular/core';

import * as fromApp from '../../store/app.reducer';
import * as AuthActions from '../store/auth.action';
import * as fromAuth from '../store/auth.reducer';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit , OnDestroy{

  error: Observable<{hasError:boolean , errorMessage:string}>;

  constructor(private store:Store<fromApp.AppState>,
              private activatedRoute:ActivatedRoute) {}

  ngOnInit() {
    this.error = this.store.select('auth').map((state:fromAuth.State) => {
      return {hasError:state.hasError,errorMessage:state.errorMessage}
    });

    this.activatedRoute.queryParams.subscribe((params:Params) =>{
       const returnUrl = params['returnUrl'];
       console.log("Return url",returnUrl);
    })
    
  }

  ngOnDestroy(){
    this.store.dispatch(new AuthActions.ResetErrorMessageAction());
  }
  
  login(form:NgForm){
    const email = form.value.email;
    const password = form.value.password;
    this.store.dispatch(new AuthActions.DoLoginAction({email:email , password:password}));
  }
}
