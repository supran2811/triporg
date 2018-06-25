import * as AuthActions from './auth.action';
import { User } from '../../models/user.model';

export interface State{
    user:User,
    token:string,
    uid:string,
    authorised:boolean,
    hasError:boolean,
    errorMessage:string,
    loading:boolean
}

const initialState : State = {
    user:null,
    token:"",
    uid:"",
    authorised:false,
    hasError:false,
    errorMessage:'',
    loading:false
}

export function AuthReducer(state=initialState , action:AuthActions.AuthActions){
    switch(action.type){
        case AuthActions.START_AUTH:{
            return {
                ...state,
                loading:true
            }
        }
        case AuthActions.LOGIN:
        case AuthActions.REGISTER:{
            return {
                 ...state
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
          
            return {
                ...state,
                user:action.payload,
                loading:false,
                authorised:true
            }
        }
        case AuthActions.SHOW_ERROR:{
          
            return {
                ...state,
                hasError:true,
                errorMessage:action.payload,
                loading:false
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
                return state;
        }
    }
}