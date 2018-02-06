import { Store } from '@ngrx/store';
import { Component, OnInit,Type } from '@angular/core';
import * as firebase from 'firebase';

import { User } from './models/user.model';
import * as fromApp from './store/app.reducer';
import * as AuthActions from './auth/store/auth.action';
import * as AppActions from './store/app.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'app';

  showModal : boolean = false;
  componentToRender:Type<any> = null;

  public constructor(private store:Store<fromApp.AppState>){}

  ngOnInit(){
    firebase.initializeApp({
      apiKey: "AIzaSyBJPM4QjLcMSGN_17eRHCcRhHrct08guhM",
      authDomain: "triporg-1508486982436.firebaseapp.com"
    });


    this.store.select('app').subscribe((state:fromApp.State ) => {
      console.log("[AppComponent]",state);
         this.showModal = state.showModal;
         this.componentToRender = state.componentToRender;
    })
    firebase.auth().onAuthStateChanged( (user) => {
            console.log("OnAuthStateChanged",user);
            if(user != null){
                this.store.dispatch(new AuthActions.GetTokenAction());
            }
            else{
                this.store.dispatch(new AuthActions.LogoutAciton());
            }
    } )
  }

  hideModal(){
    this.store.dispatch(new AppActions.HideModal());
  }
}
