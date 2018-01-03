import { Store } from '@ngrx/store';
import { HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Route, Router } from '@angular/router';
import * as firebase from 'firebase';
import { fromPromise } from 'rxjs/observable/fromPromise';
import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';

import { HttpService } from '../../shared/http.service';
import * as AuthActions from './auth.action';
import * as fromPlaceReducer from '../../place/store/place.reducer';
import * as PlaceActions from '../../place/store/place.action';
import * as fromPinnedViewReducer from '../../home/pinned-view/store/pinnedview.reducer';
import * as PinnedViewActions from '../../home/pinned-view/store/pinnedview.action';

import { User } from '../../models/user.model';
import { Location } from '@angular/common';

@Injectable()
export class AuthEffect {
    USER_URL = "https://triporg-1508486982436.firebaseio.com/user";
  

    user:User;
    @Effect() register = this.$actions.ofType(AuthActions.DO_REGISTER)
                                .map((action:AuthActions.DoRegisterAction) => {
                                       return action.payload; 
                                } ).switchMap((payload : {user:User , password:string}) =>{
                                    let email = payload.user.email;
                                    let password = payload.password;
                                    this.user = payload.user;
                                    return fromPromise(firebase.auth().createUserWithEmailAndPassword(email,password))
                                        .catch(error => Observable.of({type:AuthActions.SHOW_ERROR , payload:error.message}) )
                                        .switchMap((error) => {
                                            
                                            if(error && error.type == AuthActions.SHOW_ERROR){
                                                return Observable.of(error);
                                            }
                                            
                                            return fromPromise(firebase.auth().currentUser.getIdToken())
                                            .catch(error => Observable.of({type:AuthActions.SHOW_ERROR , payload:error.message}))
                                            .mergeMap((res) =>{
                                                if(res && res.type == AuthActions.SHOW_ERROR){
                                                    return [res];
                                                }
                                                const token = res;
                                                sessionStorage.setItem('token',token);
                                                sessionStorage.setItem('uid',firebase.auth().currentUser.uid);                         
                                                this.http.put(this.USER_URL+"/"+firebase.auth().currentUser.uid, this.user).subscribe(
                                                        response => {console.log(response);},
                                                        error => {console.log(error);}
                                                );
                                                this.router.navigate(['/']);
                                                
                                                return [
                                                    {
                                                        type:AuthActions.SET_TOKEN,
                                                        payload:{token:token,uid:firebase.auth().currentUser.uid}
                                                    },
                                                    {
                                                        type:AuthActions.SET_USER,
                                                        payload:this.user
                                                    },
                                                    {
                                                        type:AuthActions.REGISTER
                                                    }
                                                ]
                                            })
                                        })
                                        
                                } );

    @Effect() login = this.$actions.ofType(AuthActions.DO_LOGIN)
                                    .map((action:AuthActions.DoLoginAction) => {
                                        return action.payload;
                                    } ).switchMap( (payload:{email:string,password:string,returnUrl:string}) =>{
                                           const email  = payload.email;
                                           const password = payload.password;
                                           const returnUrl = payload.returnUrl;
                                           return fromPromise(firebase.auth().signInWithEmailAndPassword(email,password))
                                           .catch(error => Observable.of({type:AuthActions.SHOW_ERROR , payload:error.message}))
                                           .switchMap((error) => {
                                            if(error && error.type == AuthActions.SHOW_ERROR){
                                                return Observable.of(error);
                                            }

                                            return fromPromise(firebase.auth().currentUser.getIdToken())
                                            .catch(error => Observable.of({type:AuthActions.SHOW_ERROR , payload:error.message}))
                                            .switchMap((res) => {

                                                if(res && res.type == AuthActions.SHOW_ERROR){
                                                    return  Observable.of(res);
                                                }
                                                const token = res;
                                                sessionStorage.setItem('token',token);
                                                sessionStorage.setItem('uid',firebase.auth().currentUser.uid);    
                                                return this.http.get<User>(this.USER_URL+"/"+firebase.auth().currentUser.uid+"/",null)
                                                        .catch(error => Observable.of({type:AuthActions.SHOW_ERROR , payload:error.message}))
                                                        .mergeMap((res:(User|any)) => {
                                                            if(res && res.type == AuthActions.SHOW_ERROR){
                                                                return [res];
                                                            }
                                                            const user = new User(res.email,res.fullName);
                                                            const routeToNavigate = returnUrl === ""?"/":returnUrl;
                                                            console.log("Navigate to",routeToNavigate);
                                                            this.router.navigate([routeToNavigate]);
                                                            return [
                                                                {
                                                                    type:AuthActions.SET_TOKEN,
                                                                    payload:{token:token,uid:firebase.auth().currentUser.uid}
                                                                },
                                                                {
                                                                    type:AuthActions.SET_USER,
                                                                    payload:user
                                                                },
                                                                {
                                                                    type:AuthActions.LOGIN
                                                                }
                                                            ]
                                                        });
                                            })
                                        })
                                    } );
                                    
    @Effect() logout = this.$actions.ofType(AuthActions.DO_LOGOUT)
                                        .switchMap(() => firebase.auth().signOut())
                                        .mergeMap(() => {
                                            console.log("777");
                                            this.router.navigate(['/']);
                                            return [
                                                {
                                                    type : AuthActions.LOGOUT
                                                },
                                                {
                                                    type:PlaceActions.RESET_STATE
                                                },
                                                {
                                                    type:PinnedViewActions.RESET_PINNED_STATE
                                                }
                                            ]
                                        });
                                
    constructor(private $actions:Actions,
                private router:Router,
                private http:HttpService,
                private store:Store<fromPlaceReducer.FeatureState>,
                ){}
}