import { Store } from '@ngrx/store';
import { Component, OnInit,Type, style ,state ,animate , trigger, transition } from '@angular/core';
// import * as firebase from 'firebase';

import { User } from './models/user.model';
import * as fromApp from './store/app.reducer';
import * as AppActions from './store/app.actions';
import { FireBaseWraperService } from './shared/firebase.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations:[
    trigger("slideInOut" , [
            state("in" , style({transform:'translateX(0)'})),
            state('out' , style({transform:'translateX(-100%)'})),
            transition("in => out" , animate('400ms ease-in-out')),
            transition("out => in" , animate('400ms ease-in-out'))
    ])
  ]
})
export class AppComponent implements OnInit{
  title = 'app';
  menuState:string = "out";
  showModal = false;
  componentToRender:Type<any> = null;
  showBackDrop = false;

  public constructor(private store:Store<fromApp.AppState> , 
                      private firebaseService:FireBaseWraperService) { }

  ngOnInit() {
    this.firebaseService.initialiseFirebase();
    this.store.select('app').subscribe((state:fromApp.State ) => {
         this.showModal = state.showModal;
         this.componentToRender = state.componentToRender;
    });
  }

  hideModal(){
    this.store.dispatch(new AppActions.HideModal());
  }

  toggleSideBar() {
    console.log("Coming in togglesidebar")
    this.menuState = this.menuState === "out" ? "in" : "out";
  }

  animationStart($event) {
    console.log("Inside animationStart",$event);
    if($event.toState === 'out') {
      this.showBackDrop = false;
    }
  }

  animationEnd($event) {
    console.log("Inside animationEnd",$event);
    if($event.toState === 'in') {
      this.showBackDrop = true;
    }
  }
}
