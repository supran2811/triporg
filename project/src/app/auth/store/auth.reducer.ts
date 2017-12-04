import * as AuthActions from './auth.action';
import { User } from '../../models/user.model';
import * as firebase from 'firebase';

export interface State{
    user:User,
    token:string,
    uid:string,
    authorised:boolean,
    hasError:boolean,
    errorMessage:string
}

const initialState : State = {
    user:null,
    token:"",
    uid:"",
    authorised:false,
    hasError:false,
    errorMessage:''
}

export function AuthReducer(state=initialState , action:AuthActions.AuthActions){
    switch(action.type){
        case AuthActions.LOGIN:
        case AuthActions.REGISTER:{
            return {
                 ...state,
                 authorised:true
             }   
        }
        case AuthActions.SET_TOKEN:{
            return {
                ...state,
                token:action.payload.token,
                uid:action.payload.uid
            }
        }
        case AuthActions.SET_USER :{
            console.log("Inside Set User");
            console.log(action.payload);
            sessionStorage.setItem('fullname',action.payload.fullName);
            sessionStorage.setItem('email',action.payload.email);
            console.log(sessionStorage);
            return {
                ...state,
                user:action.payload
            }
        }
        case AuthActions.SHOW_ERROR:{
            console.log("Coming here to set error message");
            return {
                ...state,
                hasError:true,
                errorMessage:action.payload
            }
        }
        case AuthActions.RESET_ERROR:{
            return {
                ...state,
                hasError:false,
                errorMessage:''
            }
        }
        case AuthActions.LOGOUT:{
            sessionStorage.removeItem('token');
            sessionStorage.removeItem('fullname');
            sessionStorage.removeItem('email');
            sessionStorage.removeItem('uid');
            return {
                ...state,
                user:null,
                token:"",
                authorised:false,
                hasError:false,
                errorMessage:''
            }
        }
        default:{
            {
                return state;
            }
        }
    }
}