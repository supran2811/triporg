
import { Observable } from 'rxjs/Rx';
import { Route, Router } from '@angular/router';
import * as firebase from 'firebase';
import { fromPromise } from 'rxjs/observable/fromPromise';
import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';

import { HttpService } from '../../shared/http.service';
import * as AuthActions from './auth.action';

import { User } from '../../models/user.model';

@Injectable()
export class AuthEffect {
    USER_URL = "https://triporg-1508486982436.firebaseio.com/user.json"
    user:User;
    @Effect() register = this.$actions.ofType(AuthActions.DO_REGISTER)
                                .map((action:AuthActions.DoRegisterAction) => {
                                       return action.payload; 
                                } ).switchMap((payload : {user:User , password:string}) =>{
                                    let email = payload.user.getEmail();
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
                                                                        
                                                this.http.put(this.USER_URL, {
                                                    [firebase.auth().currentUser.uid] : this.user
                                                }).subscribe(
                                                        response => {console.log(response);},
                                                        error => {console.log(error);}
                                                );
                                                this.router.navigate(['/']);
                                                return [
                                                    {
                                                        type:AuthActions.SET_TOKEN,
                                                        payload:token
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
                                    } ).switchMap( (payload:{email:string,password:string}) =>{
                                           const email  = payload.email;
                                           const password = payload.password;
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
                                            })
                                        })
                                    } )
                                    

    constructor(private $actions:Actions,
                private router:Router,
                private http:HttpService){}
}