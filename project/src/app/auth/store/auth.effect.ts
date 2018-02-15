
import { HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import * as firebase from 'firebase';
import { fromPromise } from 'rxjs/observable/fromPromise';
import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';

import { HttpService } from '../../shared/http.service';
import { FireBaseWraperService } from '../../shared/firebase.service';

import * as AuthActions from './auth.action';
import * as fromPlaceReducer from '../../place/store/place.reducer';
import * as PlaceActions from '../../place/store/place.action';
import * as fromPinnedViewReducer from '../../home/pinned-view/store/pinnedview.reducer';
import * as PinnedViewActions from '../../home/pinned-view/store/pinnedview.action';
import * as AppActions from '../../store/app.actions';
import { User } from '../../models/user.model';
import { Location } from '@angular/common';

@Injectable()
export class AuthEffect {
    USER_URL = "/user";
  

    user:User;
    @Effect() register = this.$actions.ofType(AuthActions.DO_REGISTER)
                                .map((action:AuthActions.DoRegisterAction) => {
                                       return action.payload; 
                                } ).switchMap((payload : {user:User , password:string}) =>{
                                    let email = payload.user.email;
                                    let password = payload.password;
                                    this.user = payload.user;
                                    
                                    return fromPromise(firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)).switchMap(() =>{
                                         return fromPromise(firebase.auth().createUserWithEmailAndPassword(email,password))
                                         .catch(error => Observable.of({type:AuthActions.SHOW_ERROR , payload:error.message}) )
                                         
                                    }) 
                                    .switchMap((res) => {

                                        if(res && res.type == AuthActions.SHOW_ERROR){
                                            return Observable.of(res);
                                        }

                                        return fromPromise(firebase.auth().currentUser.updateProfile({displayName:this.user.fullName , photoURL:"http://samplephoto.com/"}))
                                            .catch(error => Observable.of({type:AuthActions.SHOW_ERROR , payload:error.message}))
                                    })
                                    .mergeMap((res) =>{
                                        if(res && res.type == AuthActions.SHOW_ERROR){
                                            return [res];
                                        }
                                      
                                   
                                        return [
                                            {
                                              type:AuthActions.SET_USER,
                                              payload:this.user
                                            },
                                            {
                                              type:AppActions.HIDE_MODAL
                                            }
                                        ]
                                    })
                                        
                                } );

    @Effect() login = this.$actions.ofType(AuthActions.DO_LOGIN)
                                    .map((action:AuthActions.DoLoginAction) => {
                                        return action.payload;
                                    } ).switchMap( (payload:{email:string,password:string,returnUrl:string}) =>{
                                           const email  = payload.email;
                                           const password = payload.password;
                                          
                                           return this.firebaseService.signIn(email,password)
                                           .map((res ) => {
                                            if(res && res.type == AuthActions.SHOW_ERROR){
                                                return res;
                                            }
                                          
                                            return( 
                                                {
                                                    type:AppActions.HIDE_MODAL
                                                });
                                            
                                        })
                                        .catch(error => {
                                             return Observable.of(error);
                                        });
                                    } );
                                    
    @Effect() logout = this.$actions.ofType(AuthActions.DO_LOGOUT)
                                        .switchMap(() => this.firebaseService.logOut())
                                        .mergeMap(() => {
                                            
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

     @Effect() getToken  = this.$actions.ofType(AuthActions.GET_TOKEN)
                                                    .switchMap(() => {
                                                      return this.firebaseService.getToken();              
                                                }).mergeMap(res => {
                                                      
                                                     const response = [
                                                        {
                                                            type:AuthActions.SET_TOKEN,
                                                            payload:{token:res,uid:firebase.auth().currentUser.uid}
                                                        },
                                                        {
                                                            type:AuthActions.LOGIN
                                                        }
                                                     ]
                                                     if(firebase.auth().currentUser.displayName != null){
                                                        const user = new User(firebase.auth().currentUser.email,firebase.auth().currentUser.displayName);
                                                        response.push({
                                                                type:AuthActions.SET_USER,
                                                                payload:user
                                                        });
                                                     }

                                                     return response;
                                                }).catch(error => {
                                                     return Observable.of({type : AuthActions.LOGOUT})
                                                })                                  
                                
    constructor(private $actions:Actions , private firebaseService:FireBaseWraperService){}
}