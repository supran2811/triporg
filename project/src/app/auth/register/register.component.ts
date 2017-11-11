import { Observable } from 'rxjs/Rx';
import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { User } from '../../models/user.model';
import * as fromApp from '../../store/app.reducer';
import * as AuthActions from '../store/auth.action';
import * as fromAuth from '../store/auth.reducer';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  error : Observable<{hasError:boolean , errorMessage:string}>;

  constructor(private store:Store<fromApp.AppState>) { }

  ngOnInit() {
    this.error = this.store.select('auth').map((state:fromAuth.State) => {
        return {hasError:state.hasError,errorMessage:state.errorMessage}
    })
  }

  register(form:NgForm){
    const user = new User(form.value.userdata.email , form.value.userdata.fullname);
    const password = form.value.password;
    this.store.dispatch(new AuthActions.DoRegisterAction({user:user ,password:password}));
  }

}
