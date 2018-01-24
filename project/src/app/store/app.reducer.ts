import { Component,Type } from '@angular/core';
import {ActionReducerMap} from '@ngrx/store'

import * as fromAuth from '../auth/store/auth.reducer';
import * as fromPinnedView from '../home/pinned-view/store/pinnedview.reducer';

import * as AppActions from './app.actions';
import { LoginComponent } from '../auth/login/login.component';


export interface State{
    showModal:boolean,
    componentToRender:Type<any>
}

const initialState :State = {
    showModal:false,
    componentToRender:null
}


export function reducer(state=initialState , action:AppActions.AppActions){

    switch(action.type){
        case AppActions.SHOW_MODAL:{
             return {
                 ...state,
                 showModal:true,
                 componentToRender:action.payload
             }
        }
        case AppActions.HIDE_MODAL:{
            return {
                ...state,
                showModal:false,
                componentToRender:null
            }
        }
    }

    return state;
}


export interface AppState{
    auth:fromAuth.State,
    pinnedcities:fromPinnedView.State,
    app:State
}


export const globalReducer : ActionReducerMap<AppState> = {
    auth:fromAuth.AuthReducer,
    pinnedcities:fromPinnedView.pinnedViewReducer,
    app:reducer
}

