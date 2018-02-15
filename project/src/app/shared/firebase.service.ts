import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import {Store} from '@ngrx/store';

import * as fromApp from '../store/app.reducer';
import * as AuthActions from '../auth/store/auth.action';
import { Observable,Observer } from 'rxjs/Rx';
import { User } from '../models/user.model';


@Injectable()
export class FireBaseWraperService {
    public constructor(private store:Store<fromApp.AppState>){
        console.log("[FirebaseWrapper]","Init firebase service");
        firebase.initializeApp({
            apiKey: "AIzaSyBJPM4QjLcMSGN_17eRHCcRhHrct08guhM",
            authDomain: "triporg-1508486982436.firebaseapp.com"
          });
         
          firebase.auth().onAuthStateChanged( (user) => {
            if(user != null){
                this.store.dispatch(new AuthActions.GetTokenAction());
            }
            else{
                this.store.dispatch(new AuthActions.LogoutAciton());
            }
        } )

    }

    signIn(email:string , password:string) : Observable<any>{
        const observable = Observable.create(
                            (observer:any) => {
                                firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION).then(() => {
                                    firebase.auth().signInWithEmailAndPassword(email,password).then(() => {
                                        observer.next(true);
                                    })
                                    .catch(error => {
                                        observer.error({type:AuthActions.SHOW_ERROR , payload:error.message});
                                    })
                                })
                                .catch(error => {
                                    observer.error({type:AuthActions.SHOW_ERROR , payload:error.message});
                                })

                            }
        );

        return observable;
    }

    logOut():Observable<any>{
        const observable = Observable.create(( (observer:Observer<any>) => {
               firebase.auth().signOut().then(() => {
                   observer.next(null);
               })
               .catch(error => {
                     observer.error(null);
               });
        } ));

        return observable;
    }

    getToken():Observable<{token:string,uid:string , user:User}> {
        const observable = Observable.create(( observer:Observer<{token:string,uid:string , user:User}> ) =>{
             firebase.auth().currentUser.getIdToken().then(token => {
                  const currentUser = firebase.auth().currentUser;
                  const user = currentUser.displayName !== null? new User(currentUser.email,currentUser.displayName):null;
                  observer.next({token:token , uid:firebase.auth().currentUser.uid , user:user});
             })
             .catch(error => {
                 observer.error(error);
             });
        } );

        return observable;
    }
}