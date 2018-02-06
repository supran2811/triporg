import { ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { Store } from '@ngrx/store';
import { NgForm } from '@angular/forms/src/directives';
import { Component, OnDestroy, OnInit } from '@angular/core';


import * as fromApp from '../../store/app.reducer';
import * as AuthActions from '../store/auth.action';
import * as fromAuth from '../store/auth.reducer';
import * as AppActions from '../../store/app.actions';
import { RegisterComponent } from '../register/register.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit , OnDestroy{

  showSpinner:boolean = false;

  authData : Observable<{hasError:boolean , errorMessage:string , loading:boolean}>;
  returnUrl:string;
  constructor(private store:Store<fromApp.AppState>,
              private activatedRoute:ActivatedRoute) {}

  ngOnInit() {
    this.authData = this.store.select('auth').map((state:fromAuth.State) => {
      return {hasError:state.hasError,errorMessage:state.errorMessage , loading:state.loading}
    });

    this.authData.subscribe(data => {
      this.showSpinner = data.loading;
    })
  }

  ngOnDestroy(){
    this.store.dispatch(new AuthActions.ResetErrorMessageAction());
   this.showSpinner = false;
  }
  
  login(form:NgForm){
    const email = form.value.email;
    const password = form.value.password;
    this.showSpinner = true;
    this.store.dispatch(new AuthActions.StartAuth());
    this.store.dispatch(new AuthActions.DoLoginAction({email:email , password:password , returnUrl:this.returnUrl}));
  }

  goToRegister(){
    this.store.dispatch(new AppActions.ShowModal(RegisterComponent));
  }

}
