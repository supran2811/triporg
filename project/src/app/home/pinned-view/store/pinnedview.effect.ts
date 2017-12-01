import { City } from '../../../models/city.model';
import { Store } from '@ngrx/store';
import { Actions,Effect } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import * as firebase from 'firebase';

import { HttpService } from '../../../shared/http.service';
import * as PinnedViewActions from './pinnedview.action';
import * as fromApp from '../../../store/app.reducer';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class PinnedViewEffects{

    PINS_URL = "https://triporg-1508486982436.firebaseio.com/pins/";

    @Effect()
        getPinnedCities = this.actions$.ofType(PinnedViewActions.GET_PINNED_CITIES_FROM_SERVER)
                                    .withLatestFrom(this.store.select('auth'))
                                    .map( ([action,state]) =>{
                                            if( state.authorised){
                                                throw new Error("Not autorised!!");
                                            }
                                            else{
                                                return true;
                                            }
                                    } )
                                    .switchMap(() => {

                                        const url = this.PINS_URL+"/"+firebase.auth().currentUser.uid;

                                        return this.http.get(url,null)
                                                    .catch(err => {
                                                        throw new Error(err);
                                                    })
                                                    .map((response) =>{
                                                         let cities = Object.values(response).map(res =>{
                                                              return new City(res.id,res.name,res.lat,res.lng);
                                                         });

                                                         return {
                                                             type:PinnedViewActions.SET_PINNED_CITIES,
                                                             payload:cities
                                                         }
                                                    })
                                    }).catch(err =>{
                                        return Observable.empty();
                                  })
                                    




    constructor(private actions$:Actions,
                private http:HttpService,
                private store:Store<fromApp.AppState>){}
}