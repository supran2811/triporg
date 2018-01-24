import { Observable } from 'rxjs/Rx';
import { Store } from '@ngrx/store';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { User } from '../../models/user.model';
import * as fromApp from '../../store/app.reducer';
import * as AuthActions from '../store/auth.action';
import * as fromAuth from '../store/auth.reducer';
import * as AppActions from '../../store/app.actions';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit  , OnDestroy {

  error : Observable<{hasError:boolean , errorMessage:string}>;
  showSpinner:boolean = true;
  constructor(private store:Store<fromApp.AppState>) { }

  ngOnInit() {
    this.error = this.store.select('auth').map((state:fromAuth.State) => {
        return {hasError:state.hasError,errorMessage:state.errorMessage}
    })

    this.error.subscribe(hasError => {
       this.showSpinner = !hasError;
    })
  }

  ngOnDestroy(){
    this.store.dispatch(new AuthActions.ResetErrorMessageAction());
  }

  register(form:NgForm){
    this.showSpinner = true;
    const user = new User(form.value.userdata.email , form.value.userdata.fullname);
    const password = form.value.password;
    this.store.dispatch(new AuthActions.DoRegisterAction({user:user ,password:password}));
  }

  goToLogin(){
    this.store.dispatch(new AppActions.ShowModal(LoginComponent));
  }

}
