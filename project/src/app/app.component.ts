import { Store } from '@ngrx/store';
import { Component, OnInit,Type } from '@angular/core';
// import * as firebase from 'firebase';

import { User } from './models/user.model';
import * as fromApp from './store/app.reducer';
import * as AuthActions from './auth/store/auth.action';
import * as AppActions from './store/app.actions';
import { FireBaseWraperService } from './shared/firebase.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'app';

  showModal : boolean = false;
  componentToRender:Type<any> = null;

  public constructor(private store:Store<fromApp.AppState> , private firebaseService:FireBaseWraperService){

  }

  ngOnInit(){
    
    this.firebaseService.initialiseFirebase();

    this.store.select('app').subscribe((state:fromApp.State ) => {
         this.showModal = state.showModal;
         this.componentToRender = state.componentToRender;
    })
   
  }

  hideModal(){
    this.store.dispatch(new AppActions.HideModal());
  }
}
