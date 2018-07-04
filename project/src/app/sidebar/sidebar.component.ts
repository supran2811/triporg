import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';

import * as fromAuth from '../auth/store/auth.reducer';
import * as AuthActions from  '../auth/store/auth.action';
import { AppState } from '../store/app.reducer';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit{
  
  @Output() closeDrawerClicked = new EventEmitter();
  currentUrl:string = "/";

  authState:Observable<fromAuth.State>;

  public constructor(private router:Router,
                      private store:Store<AppState>) {}
                        
  ngOnInit() {
    this.router.events.forEach((event) => {
      if(event instanceof NavigationEnd){
        this.currentUrl = event.url;
      }
    });
    this.authState = this.store.select('auth');
  }                      

  closeSideBar() {
    this.closeDrawerClicked.emit();
  }

  loginClicked() {
    this.closeDrawerClicked.emit();
    this.store.dispatch(new AuthActions.SetUrlToNavigate(this.currentUrl));    
    this.router.navigate(['login']);
  }

  registerClicked() {
    this.closeDrawerClicked.emit();
    this.store.dispatch(new AuthActions.SetUrlToNavigate(this.currentUrl));
    this.router.navigate(['register']);
  }

  navigateToHome() {
    this.closeDrawerClicked.emit();
    this.router.navigateByUrl('/');
  }

  logOut() {
    this.closeDrawerClicked.emit();
    this.store.dispatch(new AuthActions.DoLogoutAction());
  }
}
